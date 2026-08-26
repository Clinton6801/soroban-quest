/* ==========================================
   Compiler Worker — runs Soroban analysis/compilation off the UI thread.

   Message protocol (main → worker):
     { type: 'compile', id, code, mission, wasmUrl }

   Message protocol (worker → main):
     { type: 'ready' }                              on startup
     { type: 'result', id, result }                 on success
     { type: 'error',  id, message }                on failure

   The worker first tries to load a real WASM compiler module when a
   `wasmUrl` is provided (future Soroban toolchain — Option A/B in the
   issue). When none is available it falls back to the shared local
   analyzer so the feature degrades gracefully instead of blocking.
   ========================================== */

import { analyze } from "./sorobanAnalyzer";

// Cache of a loaded real-WASM compiler, if one ever gets wired in.
let wasmModule: any = null;
let wasmTried = false;

async function loadWasm(wasmUrl: string | null): Promise<any> {
  if (!wasmUrl || wasmTried) return wasmModule;
  wasmTried = true;
  try {
    // A real toolchain module is expected to export `compileAndRun(code)`.
    // This is intentionally dynamic so the bundle stays small until a real
    // compiler artifact exists.
    const mod = await import(/* @vite-ignore */ wasmUrl);
    if (mod && typeof mod.compileAndRun === "function") {
      wasmModule = mod;
    }
  } catch {
    wasmModule = null; // fall back to the local analyzer
  }
  return wasmModule;
}

async function compile({
  code,
  mission,
  wasmUrl,
}: {
  code: string;
  mission: any;
  wasmUrl: string | null;
}): Promise<any> {
  const wasm = await loadWasm(wasmUrl);
  if (wasm) {
    // Real compiler path (when available). Normalize its output to our shape.
    const raw = await wasm.compileAndRun(code);
    return {
      ok: !!raw.ok,
      engine: "wasm",
      diagnostics: raw.diagnostics || [],
      stdout: raw.stdout || "",
      stderr: raw.stderr || "",
      returnValue: raw.returnValue ?? null,
      checkResults: [],
      summary: raw.ok
        ? "✓ Compiled successfully (WASM)"
        : "✗ Compilation failed (WASM)",
      errorCount: (raw.diagnostics || []).filter(
        (d: any) => d.severity === "error"
      ).length,
      warningCount: (raw.diagnostics || []).filter(
        (d: any) => d.severity === "warning"
      ).length,
    };
  }
  // Graceful fallback: local static analysis.
  return analyze(code, mission);
}

const ctx = self as any;

ctx.onmessage = async (event: MessageEvent) => {
  const data = event.data || {};
  if (data.type !== "compile") return;
  const { id } = data;
  try {
    const result = await compile(data);
    ctx.postMessage({ type: "result", id, result });
  } catch (err) {
    ctx.postMessage({
      type: "error",
      id,
      message: (err as any)?.message
        ? (err as any).message
        : String(err),
    });
  }
};

// Signal readiness so the host can resolve init().
ctx.postMessage({ type: "ready" });
