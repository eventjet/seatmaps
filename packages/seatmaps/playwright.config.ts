import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './src',
    testMatch: '**/*.pw.tsx',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    use: {
        baseURL: 'http://localhost:6006',
    },
    webServer: {
        command: 'pnpm storybook --ci',
        url: 'http://localhost:6006',
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
    },
    projects: [
        {
            name: 'chromium',
            use: { browserName: 'chromium' },
        },
    ],
});
