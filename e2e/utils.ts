import { expect, type Page } from '@playwright/test';

export async function clearLocalStorageBeforePageLoad(page: Page) {
  await page.goto('/');
  await page.evaluate(() => {
    localStorage.clear();
    localStorage.setItem('sorobanQuest_onboarding_done', '1');
  });
}

export async function waitForMonaco(page: Page) {
  const editor = page.locator('.monaco-editor textarea, .monaco-editor');
  await expect(editor.first()).toBeVisible({ timeout: 20000 });
}

export async function fillMonacoEditor(page: Page, content: string) {
  // Wait for Monaco editor to load
  await waitForMonaco(page);

  // Try to focus the editor by clicking on it directly
  const editorHost = page.locator('.monaco-editor').first();
  await editorHost.click({ position: { x: 200, y: 100 }, force: true });
  
  // Wait a moment for focus
  await page.waitForTimeout(500);
  
  // Select all and type new content
  await page.keyboard.press('Control+A');
  await page.keyboard.type(content, { delay: 10 });
}

/**
 * Wait for test runner results to appear
 */
export async function waitForTestResults(page: Page) {
  const testResultsContainer = page.locator('[class*="test-results"], [class*="TestResults"], .results, [data-testid="test-results"]');
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
    const progressData = localStorage.getItem('soroban_quest_progress');
    return progressData ? JSON.parse(progressData) : null;
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
