import { readFile } from 'node:fs/promises';
import { transformAsync } from '@babel/core';
import { defineConfig } from 'tsup';
import type { Plugin } from 'esbuild';

const reactCompilerPlugin: Plugin = {
    name: 'react-compiler',
    setup(build) {
        build.onLoad({ filter: /\.[jt]sx?$/ }, async (args) => {
            const code = await readFile(args.path, 'utf8');
            const result = await transformAsync(code, {
                filename: args.path,
                plugins: [['babel-plugin-react-compiler']],
                presets: [['@babel/preset-typescript', { isTSX: true, allExtensions: true }]],
            });
            if (!result?.code) return undefined;
            return { contents: result.code, loader: 'tsx' };
        });
    },
};

/**
 * esbuild's CJS output wraps default imports of external ESM-flagged packages with
 * `__toESM(require("pkg"), 1)`. The `isNodeMode=1` argument makes `__toESM` set
 * `target.default = mod` (the whole exports object), ignoring `mod.__esModule`.
 * For packages like @emotion/styled that use `{ __esModule: true, default: fn }`,
 * this means `import_styled.default` is the exports object instead of the function,
 * causing runtime errors. Removing `isNodeMode` from the condition lets __copyProps
 * correctly pick up `mod.default` when `mod.__esModule` is true.
 */
const fixCjsDefaultInteropPlugin: Plugin = {
    name: 'fix-cjs-default-interop',
    setup(build) {
        if (build.initialOptions.format !== 'cjs') return;
        build.onEnd((result) => {
            if (!result.outputFiles) return;
            for (const file of result.outputFiles) {
                if (!file.path.endsWith('.cjs')) continue;
                const fixed = file.text.replace('isNodeMode || !mod || !mod.__esModule', '!mod || !mod.__esModule');
                file.contents = Buffer.from(fixed, 'utf8');
            }
        });
    },
};

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    sourcemap: true,
    clean: true,
    external: ['react', 'react-dom', 'react/jsx-runtime', '@emotion/react', '@emotion/styled'],
    esbuildPlugins: [reactCompilerPlugin, fixCjsDefaultInteropPlugin],
});
