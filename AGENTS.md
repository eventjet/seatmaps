# AGENTS.md

This file provides guidance to AI coding assistants when working with code in this repository.

## Project Overview

**@eventjet/react-seatmaps** is a React component library for rendering interactive SVG-based seatmaps in ticketing systems. It provides visualization of seats, volumes (large seating areas), rows, and blocks with support for user interactions and styling.

**Structure:** Monorepo (Lerna + Nx) with single package at `packages/seatmaps/`

## Common Commands

All commands run from `packages/seatmaps/`:

```bash
yarn build              # Full build (clean + CJS + ESM + UMD)
yarn build:cjs          # Build CommonJS only
yarn build:esm          # Build ES modules + UMD via Rollup
yarn watch              # Watch mode with tsc-watch
yarn storybook          # Start Storybook dev server on port 6006
yarn build-storybook    # Build static Storybook
yarn clean              # Remove lib/ directory
```

Root level:
```bash
yarn build              # Build all packages via Lerna
yarn clean              # Full clean including node_modules
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

Uses Emotion (`@emotion/styled`, `@emotion/css`) for dynamic SVG styling. Emotion packages are peer dependencies.

## TypeScript Configuration

- Base config: `config/tsconfig.base.json` (ES2018, strict mode, JSX react-jsx)
- CJS output: `config/tsconfig.cjs.json` → `lib/`
- ESM output: `config/tsconfig.esm.json` (used by Rollup)
- Stories excluded from compilation

## Code Style

- Prettier configured: 4-space tabs, single quotes, trailing commas, 120 char line width
- All SVG coordinates go through `length()` function for scaling
