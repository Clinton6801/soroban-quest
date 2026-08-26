import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, type Page } from '@playwright/test';

const fixtureDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'fixtures');

export async function clearLocalStorageBeforePageLoad(page: Page) {
  await page.goto('/');
  await page.waitForLoadState('load');
  await page.evaluate(() => {
    localStorage.clear();
    localStorage.setItem('sorobanQuest_onboarding_done', '1');
  });
}

export async function setAppTheme(page: Page, theme: 'dark' | 'light' = 'dark') {
  await page.evaluate((value) => {
    localStorage.setItem('soroban_quest_theme', value);
    document.documentElement.setAttribute('data-theme', value);
  }, theme);
}

export async function freezeVisualRegressionClock(page: Page, time = '2026-01-15T12:00:00.000Z') {
  await page.clock.install({ time: new Date(time) });
}

export async function seedVisualRegressionState(page: Page, fixtureName: string) {
  const fixturePath = path.join(fixtureDirectory, `${fixtureName}.json`);
  const data = JSON.parse(readFileSync(fixturePath, 'utf8'));

  await page.evaluate((payload) => {
    Object.entries(payload as Record<string, unknown>).forEach(([key, value]) => {
      if (value === undefined) return;
      const serialized = typeof value === 'string' ? value : JSON.stringify(value);
      localStorage.setItem(key, serialized);
    });
  }, data);
}

export async function maskDynamicElements(page: Page) {
  await page.addStyleTag({
    content: `
      .confetti-container, .confetti-piece {
        visibility: hidden !important;
      }
      .toast, [role="status"] {
        display: none !important;
      }
    `,
  });
}

export async function waitForMonaco(page: Page) {
  // Wait for Monaco editor container
  const editor = page.locator('.monaco-editor');
  await expect(editor.first()).toBeVisible({ timeout: 20000 });
  // Wait for the loading skeleton to disappear (MissionDetail has a 1.5s loading state)
  await page.locator('.mission-detail-skeleton, .loading').waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
  await page.waitForTimeout(500);
}

export async function fillMonacoEditor(page: Page, content: string) {
  await waitForMonaco(page);

  // Use page.evaluate to access the editor instance set on window
  const filled = await page.evaluate((text) => {
    const editor = (window as any).__MONACO_EDITOR__;
    if (editor && typeof editor.setValue === 'function') {
      editor.setValue(text);
      return true;
    }
    const monacoNs = (window as any).monaco;
    if (monacoNs?.editor?.getEditors) {
      const editors = monacoNs.editor.getEditors();
      if (editors && editors.length > 0) {
        editors[0].setValue(text);
        return true;
      }
    }
    if (monacoNs?.editor?.getModels) {
      const models = monacoNs.editor.getModels();
      if (models && models.length > 0) {
        models[0].setValue(text);
        return true;
      }
    }
    return false;
  }, content);

  if (!filled) {
    const editorHost = page.locator('.monaco-editor').first();
    await editorHost.click({ position: { x: 200, y: 100 }, force: true });
    await page.waitForTimeout(200);
    await page.keyboard.press('Control+A');
    await page.keyboard.type(content, { delay: 10 });
  }

  await page.waitForTimeout(500);
}

/**
 * Wait for test runner results to appear
 */
export async function waitForTestResults(page: Page) {
  const terminalTab = page.locator('.tab-btn').filter({ hasText: /Terminal|Pruebas|Tests/i });
  if (await terminalTab.isVisible().catch(() => false)) {
    await terminalTab.click().catch(() => {});
  }
  const testResultsContainer = page.locator('.terminal-body .terminal-line.pass, .terminal-body .terminal-line.fail');
  await expect(testResultsContainer.first()).toBeVisible({ timeout: 30000 });
}

/**
 * Check XP display value in the UI
 */
export async function checkXPDisplay(page: Page, expectedXP: number) {
  // Look for XP display in common locations (Navbar, stats, modal)
  const xpElements = page.locator('text=/XP|xp.*\\d+/, [class*="xp"], [class*="XP"], [data-testid*="xp"]');
  
  // Try to find exact XP value in the page text
  const xpText = page.locator(`text=/${expectedXP}/`);
  await expect(xpText).toBeVisible({ timeout: 5000 });
}

/**
 * Verify localStorage state via page.evaluate()
 */
export async function verifyLocalStorageState(page: Page, key: string, expectedValue: any) {
  const value = await page.evaluate((storageKey) => {
    const item = localStorage.getItem(storageKey);
    return item ? JSON.parse(item) : null;
  }, key);
  
  return expect(value).toEqual(expectedValue);
}

/**
 * Wait for confetti animation element to appear
 */
export async function waitForConfetti(page: Page) {
  const confetti = page.locator('[class*="confetti"], [class*="Confetti"]').first();
  await expect(confetti).toBeVisible({ timeout: 10000 });
}

/**
 * Get mission data from localStorage
 */
export async function getMissionProgressFromStorage(page: Page) {
  const progress = await page.evaluate(() => {
    try {
      const profiles = JSON.parse(localStorage.getItem('soroban_quest_profiles') || '[]');
      const activeId = localStorage.getItem('soroban_quest_active_profile') || 'player-1';
      const active = profiles.find(p => p.id === activeId) || profiles[0];
      return active?.progress || null;
    } catch {
      const progressData = localStorage.getItem('soroban_quest_progress');
      return progressData ? JSON.parse(progressData) : null;
    }
  });
  return progress;
}

/**
 * Check if mission is marked as completed in localStorage
 */
export async function isMissionCompleted(page: Page, missionId: string) {
  const progress = await getMissionProgressFromStorage(page);
  return progress && progress.completedMissions.includes(missionId);
}
