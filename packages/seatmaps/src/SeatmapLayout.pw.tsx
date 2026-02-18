import { test, expect, type Page } from '@playwright/test';

const storyUrl = '/iframe.html?id=seatmaplayout--default&viewMode=story';

const seatmap = (page: Page) => page.getByRole('group', { name: 'Seat map' });
const seat = (page: Page, name: string) => seatmap(page).getByRole('button', { name, exact: true });
const volume = (page: Page, name: string) => seatmap(page).getByRole('button', { name });

test.beforeEach(async ({ page }) => {
    await page.goto(storyUrl);
    await seatmap(page).waitFor();
});

test('renders seats from data', async ({ page }) => {
    await expect(seat(page, '1').first()).toBeVisible();
    await expect(seat(page, '5').first()).toBeVisible();
});

test('clicking a seat toggles its active state', async ({ page }) => {
    const firstSeat = seat(page, '1').first();

    await expect(firstSeat).toHaveAttribute('aria-pressed', 'false');
    await firstSeat.click();
    await expect(firstSeat).toHaveAttribute('aria-pressed', 'true');
    await firstSeat.click();
    await expect(firstSeat).toHaveAttribute('aria-pressed', 'false');
});

test('clicking a volume toggles its active state', async ({ page }) => {
    const table = volume(page, 'Table 1');

    await expect(table).toHaveAttribute('aria-pressed', 'false');
    await table.click();
    await expect(table).toHaveAttribute('aria-pressed', 'true');
    await table.click();
    await expect(table).toHaveAttribute('aria-pressed', 'false');
});

test('clicking a disabled seat does not toggle it', async ({ page }) => {
    const disabledSeat = seat(page, '4').nth(1); // seat "4" in row B

    await expect(disabledSeat).toBeDisabled();
    await disabledSeat.click({ force: true });
    await expect(disabledSeat).toHaveAttribute('aria-pressed', 'false');
});

test('clicking a disabled volume does not toggle it', async ({ page }) => {
    const disabledVolume = volume(page, 'Sold Out');

    await expect(disabledVolume).toBeDisabled();
    await disabledVolume.click({ force: true });
    await expect(disabledVolume).toHaveAttribute('aria-pressed', 'false');
});

test('rectangle volume shows a seat count badge', async ({ page }) => {
    const table = volume(page, 'Table 1');
    await expect(table.getByText('15')).toBeVisible();
});

test('small ellipse volume shows a seat count badge', async ({ page }) => {
    const table = volume(page, 'Table 2');
    await expect(table.getByText('8')).toBeVisible();
});

test('big ellipse volume shows count in the label', async ({ page }) => {
    await expect(volume(page, 'Standing Area (250)')).toBeVisible();
});

test('middle seats have their names hidden', async ({ page }) => {
    // 2 rows of 5 seats each → 3 middle seats per row = 6 hidden names
    await expect(seatmap(page).locator('g.nameHidden')).toHaveCount(6);
});

test('decorations are rendered', async ({ page }) => {
    await expect(seatmap(page).getByText('Stage')).toBeVisible();
});

test('seatmap has the default aria label', async ({ page }) => {
    await expect(seatmap(page)).toHaveAttribute('aria-label', 'Seat map');
});
