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

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    sourcemap: true,
    clean: true,
    external: ['react', 'react-dom', 'react/jsx-runtime', '@emotion/react', '@emotion/styled'],
    esbuildPlugins: [reactCompilerPlugin],
});
