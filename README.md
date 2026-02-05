# eventjet-seatmaps

Monorepo for Eventjet seatmap components.

## Packages

- **[@eventjet/react-seatmaps](packages/seatmaps)** - React components for rendering interactive SVG-based seatmaps

## Development

Install dependencies:

```bash
pnpm install
```

Start Storybook:

```bash
cd packages/seatmaps
pnpm storybook
```

Build:

```bash
pnpm build
```

Run tests:

```bash
pnpm test
```

Type check:

```bash
pnpm typecheck
```

Lint:

```bash
pnpm lint
```

Format:

```bash
pnpm format
```

## Testing in another project

To test changes live in a project that depends on this package:

```bash
# In your other project
pnpm add /path/to/eventjet-seatmaps-js/packages/seatmaps

# In packages/seatmaps
pnpm dev
```

This links the local package and rebuilds on every change. When done, switch back to npm:

```bash
pnpm add @eventjet/react-seatmaps
```

## API Compatibility

The public API is tracked in `packages/seatmaps/api/react-seatmaps.api.md`. CI fails if the API changes without updating this file.

**If you intentionally changed the API** (added/removed exports, changed prop types):

```bash
cd packages/seatmaps
pnpm build
pnpm api
```

Review the diff in `api/react-seatmaps.api.md` and commit it with your changes.

**If CI fails unexpectedly**, you may have accidentally changed the public API. Check the diff to understand what changed.

## Releasing

Go to [Releases](../../releases) → **Draft a new release** → enter tag (e.g. `v1.0.5`) → **Publish**

That's it. CI publishes to npm automatically.

### Setup

The `NPM_TOKEN` secret must be configured in repository settings.

## License

MIT
