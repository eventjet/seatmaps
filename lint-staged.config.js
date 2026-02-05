export default {
    'packages/seatmaps/src/**/*.{ts,tsx}': ['pnpm --filter @eventjet/react-seatmaps lint --fix'],
    '**/package.json': ['sort-package-json'],
    '**/*.{ts,tsx,json,md,yml,yaml}': ['prettier --write'],
};
