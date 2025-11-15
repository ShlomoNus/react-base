import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";
import importPlugin from "eslint-plugin-import-x";
import globals from "globals";
import reactPlugin from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import reactCompiler from "eslint-plugin-react-compiler";

export default defineConfig([
  // --- ignores ---
  {
    ignores: [  "dist",
    "node_modules",
    "coverage",
    "eslint.config.js",
    "eslint.config.ts",
    "tailwind.config.js",         
    "postcss.config.js"]
  },

  // --- base config (applies to all files unless overridden) ---
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        projectService: true,
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.es2025
      }
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      "@stylistic": stylistic,
      import: importPlugin as any,
      react: reactPlugin,
      "react-refresh": reactRefresh,
      "react-compiler": reactCompiler
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json"
        }
      },
      react: {
        version: "detect"
      }
    }
  },

  // --- rules for your source files ---
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      // --- stylistic rules ---
      "@stylistic/semi": ["error", "always"],
      "@stylistic/quotes": ["error", "double"],
      "@stylistic/arrow-parens": ["error", "as-needed"],
      "@stylistic/comma-dangle": ["error", "never"],
      "@stylistic/indent": ["error", 4],
      "@stylistic/object-curly-spacing": ["error", "always"],
      "@stylistic/space-before-function-paren": ["error", "never"],
      "@stylistic/padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "return" },
        { blankLine: "always", prev: "*", next: "block" },
        { blankLine: "always", prev: "for", next: "*" },
        { blankLine: "always", prev: "*", next: "for" },
        { blankLine: "always", prev: "if", next: "*" },
        { blankLine: "always", prev: "*", next: "if" },
        { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
        { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"] },
        { blankLine: "always", prev: "export", next: "*" },
        { blankLine: "never", prev: "export", next: "export" },
        { blankLine: "always", prev: "function", next: "*" },
        { blankLine: "always", prev: "*", next: "function" },
        { blankLine: "always", prev: "*", next: "export" }
      ],
      "@stylistic/padded-blocks": ["error", "never"],
      "@stylistic/lines-between-class-members": [
        "error",
        {
          enforce: [
            { blankLine: "always", prev: "method", next: "field" },
            { blankLine: "always", prev: "field", next: "method" },
            { blankLine: "always", prev: "method", next: "method" },
            { blankLine: "never", prev: "field", next: "field" }
          ]
        }
      ],

      // --- general best practices ---
      "no-duplicate-imports": ["error", { includeExports: true }],
      "no-console": ["error", { allow: ["warn", "error", "info", "time", "timeEnd"] }],
      "@stylistic/curly-newline": ["error", { minElements: 1 }],
      "prefer-const": "error",
      "no-debugger": "warn",
      "no-var": "error",
      "no-control-regex": "off",
      "max-lines": ["warn", { max: 500 }],
      "max-params": ["error", 2],

      // --- TypeScript rules ---
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: false }],
      "@typescript-eslint/promise-function-async": "error",

      // --- naming conventions ---
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "objectLiteralProperty",
          format: null,
          filter: { regex: "^_", match: true }
        },
        {
          selector: "objectLiteralProperty",
          format: null,
          filter: { regex: "\\.", match: true }
        },
        {
          selector: "objectLiteralProperty",
          format: null,
          filter: { regex: "^[A-Z0-9_]+$", match: true }
        },
        {
          selector: "variable",
          types: ["boolean"],
          format: ["PascalCase"],
          prefix: ["is", "has", "should", "can", "did", "will"]
        },
        {
          selector: "parameter",
          types: ["boolean"],
          format: ["PascalCase"],
          prefix: ["is", "has", "should", "can", "did", "will"]
        },
        {
          selector: "variable",
          format: ["camelCase", "UPPER_CASE"],
          filter: { regex: "^(AWS_|MONGO_|S3_|COGNITO_|NODE_)", match: true }
        },
        {
          selector: "variable",
          modifiers: ["const"],
          format: ["camelCase", "PascalCase", "UPPER_CASE"],
          filter: {
            regex:
              "(Schema|Model|Doc|Entity|Service|Repository|Controller|Router|Middleware|Hook|Provider|Component)$",
            match: true
          }
        },
        { selector: "variable", format: ["camelCase", "UPPER_CASE"] },
        { selector: "function", format: ["camelCase","PascalCase"] }, // allow PascalCase for React components
        { selector: "method", format: ["camelCase"] },
        { selector: "memberLike", format: ["camelCase"] },
        {
          selector: "memberLike",
          modifiers: ["private"],
          format: ["camelCase"],
          leadingUnderscore: "require"
        },
        { selector: "typeLike", format: ["PascalCase"] },
        { selector: "typeAlias", format: ["PascalCase"] },
        { selector: "interface", format: ["PascalCase"], custom: { regex: "^I[A-Z]", match: false } },
        { selector: "class", format: ["PascalCase"] },
        { selector: "enum", format: ["PascalCase"] },
        { selector: "enumMember", format: ["PascalCase", "UPPER_CASE"] },
        { selector: "typeParameter", format: ["PascalCase"], prefix: ["T"] },
        { selector: "parameter", format: ["camelCase"], leadingUnderscore: "allow" },
        { selector: "default", format: ["camelCase"] }
      ],

      // --- misc ---
      "capitalized-comments": ["warn", "always", { ignoreConsecutiveComments: true }],

      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true }
        }
      ],

      // ---- react-ish rules ----
      "@stylistic/jsx-curly-brace-presence": [
        "warn",
        { props: "never", children: "never" }
      ],
      "react/function-component-definition": [
        2,
        {
          namedComponents: "function-declaration",
          unnamedComponents: "function-expression"
        }
      ],

      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true }
      ],
      "@stylistic/jsx-pascal-case": "error",
      "react-compiler/react-compiler": "error"
    }
  },
  reactHooks.configs.flat.recommended,
]);
