import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default tseslint.config(
    js.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    reactHooks.configs.flat['recommended-latest'],
    {
        files: ['src/**/*.{ts,tsx}'],
        languageOptions: {
            parserOptions: {
                project: './tsconfig.eslint.json',
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: { react },
        rules: {
            'react/react-in-jsx-scope': 'off',
        },
        settings: { react: { version: 'detect' } },
    },
    { ignores: ['dist/', 'lib/', '*.config.*'] },
);
