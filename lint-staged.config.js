export default {
    'packages/seatmaps/src/**/*.{ts,tsx}': ['pnpm --filter @eventjet/react-seatmaps lint --fix'],
    '*.{ts,tsx,json,md,yml,yaml}': ['prettier --write'],
};
