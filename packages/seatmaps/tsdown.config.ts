import { transformAsync } from '@babel/core';
import { defineConfig } from 'tsdown';
import type { Plugin } from 'rolldown';

const reactCompilerPlugin: Plugin = {
    name: 'react-compiler',
    transform: {
        filter: {
            id: /\.[jt]sx?$/,
        },
        async handler(code, id) {
            if (id.includes('node_modules')) return undefined;
            const result = await transformAsync(code, {
                filename: id,
                plugins: [['babel-plugin-react-compiler']],
                presets: [['@babel/preset-typescript', { isTSX: true, allExtensions: true }]],
            });
            if (!result?.code) return undefined;
            return { code: result.code, map: result.map ?? undefined };
        },
    },
};

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    sourcemap: true,
    deps: {
        neverBundle: ['react', 'react-dom', 'react/jsx-runtime', '@emotion/react', '@emotion/styled'],
    },
    plugins: [reactCompilerPlugin],
});
