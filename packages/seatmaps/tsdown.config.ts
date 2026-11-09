import babel from '@rolldown/plugin-babel';
import { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig } from 'tsdown';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    sourcemap: true,
    deps: {
        neverBundle: ['react', 'react-dom', 'react/jsx-runtime', '@emotion/react', '@emotion/styled'],
    },
    plugins: [babel({ presets: [reactCompilerPreset()] })],
});
