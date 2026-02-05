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

Git tags, GitHub releases, and npm releases are **independent** and must be managed separately.

| System              | What it tracks             | How it's created                 |
| ------------------- | -------------------------- | -------------------------------- |
| **npm**             | Published package versions | `npm publish`                    |
| **Git tags**        | Version snapshots in repo  | `git tag` + `git push --tags`    |
| **GitHub releases** | Release notes & artifacts  | GitHub UI or `gh release create` |

### Release workflow

From `packages/seatmaps`:

**1. Bump version in package.json**

```bash
npm version patch
```

Or use `npm version minor` / `npm version major`. This updates `package.json` and creates a git commit + tag.

**2. Push commit and tag**

```bash
git push && git push --tags
```

**3. Verify npm login**

```bash
npm whoami
```

**4. Check tarball contents**

```bash
npm publish --dry-run
```

**5. Publish to npm**

```bash
npm publish
```

**6. (Optional) Create GitHub release**

```bash
gh release create v1.0.5 --generate-notes
```

Or create via GitHub UI at Releases > "Draft a new release" > select the tag.

### Syncing after manual version edits

If you edited `package.json` version manually (without `npm version`), create the tag separately:

```bash
git tag v1.0.5
```

```bash
git push --tags
```

### Checking current state

Compare versions across systems:

```bash
npm view @eventjet/react-seatmaps version
```

```bash
git tag -l | sort -V | tail -1
```

```bash
gh release list --limit 1
```

## License

MIT
