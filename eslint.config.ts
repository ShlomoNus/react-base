import globals from 'globals';
import stylistic from '@stylistic/eslint-plugin';
import importPlugin from 'eslint-plugin-import-x';
import tseslint from 'typescript-eslint';
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import reactCompiler from "eslint-plugin-react-compiler";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default tseslint.config(
    {
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            '@stylistic': stylistic,
            import: importPlugin,
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
            "react-compiler": reactCompiler,
        },
    },
    {
        ignores: ["dist",
            "node_modules",
            "coverage",
            "eslint.config.ts",
            "src/components/_ui",],
    },
    {
        languageOptions: {
            parser: tseslint.parser,
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.es2025,
            },
            parserOptions: {
                project: ["tsconfig.json", "tsconfig.node.json", "tsconfig.app.json"],
                tsconfigRootDir: process.cwd(),
            },
        },
        settings: {
            'import/resolver': {
                typescript: {
                    project: './tsconfig.json',
                },
                react: {
                    version: "detect",
                },
            },
        },
    },
    {
        files: ['src/**/*.ts'],
        rules: {
            // ---- stylistic rules ----
            '@stylistic/semi': ['error', 'always'],
            '@stylistic/quotes': ['error', 'single'],
            '@stylistic/arrow-parens': ['error', 'as-needed'],
            '@stylistic/comma-dangle': ['error', 'always-multiline'],
            '@stylistic/indent': ['error', 4],
            '@stylistic/object-curly-spacing': ['error', 'always'],
            '@stylistic/space-before-function-paren': ['error', 'never'],
            '@stylistic/padding-line-between-statements': [
                'error',
                { blankLine: 'always', prev: '*', next: 'return' },
                { blankLine: 'always', prev: '*', next: 'block' },
                { blankLine: 'always', prev: 'for', next: '*' },
                { blankLine: 'always', prev: '*', next: 'for' },
                { blankLine: 'always', prev: 'if', next: '*' },
                { blankLine: 'always', prev: '*', next: 'if' },
                { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
                { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },

                { blankLine: 'always', prev: 'export', next: '*' },
                { blankLine: 'never', prev: 'export', next: 'export' },
                { blankLine: 'always', prev: 'function', next: '*' },
                { blankLine: 'always', prev: '*', next: 'function' },
                { blankLine: 'always', prev: '*', next: 'export' },
                { blankLine: 'always', prev: '*', next: 'function' },
                { blankLine: 'always', prev: 'function', next: '*' },
            ],
            '@stylistic/padded-blocks': ['error', 'always'],
            '@stylistic/lines-between-class-members': ['error', 'always'],
            'no-duplicate-imports': ["error", { "includeExports": true }],
            // ---- custom rules ----
            'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
            'prefer-const': 'error',
            'no-debugger': 'warn',
            'no-var': 'error',
            'no-control-regex': 'off',
            'max-lines': ['warn', { max: 300 }],
            'max-params': ["error", 2],
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/naming-convention': [
                'error',
                { selector: 'class', format: ['PascalCase'] },
                { selector: 'typeAlias', format: ['PascalCase'] },
                { selector: 'interface', format: ['PascalCase'] },
                {
                    selector: 'variable',
                    format: ['camelCase', 'UPPER_CASE'],
                    leadingUnderscore: 'allow',
                    trailingUnderscore: 'allow',
                },
                { selector: 'function', format: ['camelCase'] },
                { selector: 'enum', format: ['PascalCase'] },
            ],
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
            '@typescript-eslint/promise-function-async': 'error',
            'capitalized-comments': ['warn', 'always', { ignoreConsecutiveComments: true }],
            'import/order': [
                'error',
                {
                    groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                    'newlines-between': 'always',
                    alphabetize: { order: 'asc', caseInsensitive: true },
                },
            ],

            // ---- react rules ----
            "jsx-curly-brace-presence": [
                "warn",
                { props: "never", children: "never" },
            ],
            "react-refresh/only-export-components": [
                "warn",
                { allowConstantExport: true },
            ],
            "react/function-component-definition": [
                2,
                {
                    namedComponents: "function-declaration",
                    unnamedComponents: "function-expression",
                },
            ],
            "react-compiler/react-compiler": "error",
        },
    }
);
