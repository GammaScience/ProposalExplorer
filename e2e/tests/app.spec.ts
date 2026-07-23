import { test, expect } from '@playwright/test';

test.describe('Proposal Explorer App', () => {
  test('should display title', async ({ page }) => {
    await page.goto('/');
    const title = page.locator('app-root h1');
    await expect(title).toContainText('Proposal visualization');
  });

  test('should have no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(errors).toHaveLength(0);
  });
});
