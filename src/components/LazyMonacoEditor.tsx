import React, { Suspense, lazy, useRef, ReactElement } from "react";
import EditorPlaceholder from "./EditorPlaceholder";
import { measureEditorLoad } from "../systems/performanceMonitor";

const MonacoEditor = lazy(() => import("@monaco-editor/react"));

/**
 * LazyMonacoEditor component props
 * Accepts all props that @monaco-editor/react accepts
 */
interface LazyMonacoEditorProps {
  /** Callback when editor is mounted */
  onMount?: (editor: any, monaco: any) => void;
  [key: string]: any;
}

/**
 * LazyMonacoEditor component
 * Wraps Monaco Editor with lazy loading and performance monitoring
 *
 * @param {LazyMonacoEditorProps} props - Component props passed to MonacoEditor
 * @returns {ReactElement} Monaco editor with fallback skeleton
 */
export default function LazyMonacoEditor(props: LazyMonacoEditorProps): ReactElement {
  const stopEditorLoad = useRef<(() => void) | null>(null);

  if (!stopEditorLoad.current) {
    stopEditorLoad.current = measureEditorLoad();
  }

  const handleMount = (editor: any, monaco: any): void => {
    stopEditorLoad.current?.();
    stopEditorLoad.current = null;
    props.onMount?.(editor, monaco);
  };

  return (
    <Suspense fallback={<EditorPlaceholder />}>
      <MonacoEditor {...props} onMount={handleMount} />
    </Suspense>
  );
}

/**
 * Preload Monaco Editor bundle
 * @returns Promise that resolves when Monaco Editor is loaded
 */
export function preloadMonacoEditor(): Promise<any> {
  return import("@monaco-editor/react");
}
