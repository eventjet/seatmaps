# AGENTS.md

This file provides guidance to AI coding assistants when working with code in this repository.

## Project Overview

**@eventjet/react-seatmaps** is a React component library for rendering interactive SVG-based seatmaps in ticketing systems. It provides visualization of seats, volumes (large seating areas), rows, and blocks with support for user interactions and styling.

**Structure:** Monorepo (pnpm workspaces) with single package at `packages/seatmaps/`

## Common Commands

All commands run from `packages/seatmaps/`:

```bash
pnpm build              # Build CJS + ESM via tsup
pnpm dev                # Watch mode with tsup
pnpm test               # Run tests with Vitest
pnpm test:watch         # Watch mode for tests
pnpm lint               # ESLint
pnpm typecheck          # TypeScript type checking
pnpm storybook          # Start Storybook dev server on port 6006
pnpm build-storybook    # Build static Storybook
pnpm clean              # Remove dist/ directory
pnpm api                # Update API report (api-extractor)
pnpm api:check          # Check for API changes (CI)
```

Root level:

```bash
pnpm build              # Build all packages
pnpm test               # Run all tests
pnpm lint               # Lint all packages
pnpm clean              # Clean all packages
```

## Architecture

### Core Components (src/)

- **Seatmap** - Root SVG wrapper that auto-calculates viewBox via MutationObserver, wraps children in TextSizeController for responsive text
- **Volume** - General admission areas where guests can use any seat within the area (rectangle or ellipse shape) with labels, click handlers, disabled/active states
- **Seat** - Individual seats (square or circular) with dynamic text sizing based on name length
- **Row** - Groups seats horizontally with optional left/right labels
- **Block** - Generic group wrapper with transform support (translate + rotate)
- **Badge** - Circular badge for displaying counts
- **SeatCountBadge** / **SeatCountBadgeOnEllipse** - Badge variants positioned on volumes

### Key Utilities

- **length.ts** - Coordinate scaling (divides by 10)
- **useTransform.ts** - Memoized SVG transform strings
- **textSize.tsx** - Context-based responsive font sizing via TextSizeController
- **calculations.ts** - Math for badge positioning on ellipses

### Styling

Uses Emotion (`@emotion/react`, `@emotion/styled`) for dynamic SVG styling. Emotion packages are peer dependencies.

## TypeScript Configuration

- Single `tsconfig.json` (ES2020, strict mode, JSX react-jsx, bundler module resolution)
- tsup handles CJS/ESM bundling → `dist/`
- Tests and stories excluded from compilation

## Testing

- Vitest with jsdom environment
- React Testing Library for component tests
- Test files: `*.test.tsx` alongside source files

## API Tracking

Uses `@microsoft/api-extractor` to detect breaking changes:

- Public API tracked in `api/react-seatmaps.api.md`
- Run `pnpm api` to update the report after intentional API changes
- CI runs `pnpm api:check` and fails if API changed without updating the report

## Code Style

- ESLint with flat config (eslint.config.js), includes React and React Hooks plugins
- Prettier configured: 4-space tabs, single quotes, trailing commas, 120 char line width
- Pre-commit hooks via husky + lint-staged run lint and format checks
- All SVG coordinates go through `l()` function for scaling (`length.ts`)

## Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/) format — release-please uses these to determine version bumps and generate the changelog automatically:

- `fix: <description>` — patch release (bug fix)
- `feat: <description>` — minor release (new feature)
- `feat!: <description>` or `BREAKING CHANGE:` in footer — major release
- `chore:`, `docs:`, `test:`, `refactor:` — no release triggered

## Releasing

Releases are fully automated. After merging to `master`, release-please opens a Release PR that bumps `package.json` and updates `CHANGELOG.md`. Merging the Release PR creates the GitHub Release, which triggers CI to publish to npm.

**Never manually create GitHub Releases or edit `package.json` version** — let release-please manage both. The current published version is always visible in `.release-please-manifest.json`.
