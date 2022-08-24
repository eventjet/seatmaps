import typescript from "@rollup/plugin-typescript";

export default {
    input: __dirname + "/../src/index.ts",
    output: [
        {
            file: __dirname + "/../lib/index.umd.js",
            name: 'EventjetReactSeatmaps',
            format: "umd",
            sourcemap: false,
            globals: {
                '@emotion/css': 'emotionCss',
                '@emotion/react': 'emotionReact',
                '@emotion/styled': 'styled',
                'react/jsx-runtime': 'jsxRuntime',
                'react': 'React',
            }
        },
    ],
    plugins: [
        typescript({
            tsconfig: __dirname + "/tsconfig.esm.json",
            sourceMap: false,
        }),
    ],
    external: [
        'react',
        'react/jsx-runtime',
        '@emotion/css',
        '@emotion/react',
        '@emotion/styled',
    ]
};
