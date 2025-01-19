import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import eslintReact from "eslint-plugin-react";
import prettierPlugin from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";
import reactCompiler from "eslint-plugin-react-compiler";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2020,
      },
      parserOptions: {
        project: ["tsconfig.json", "tsconfig.node.json", "tsconfig.app.json"],
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "@typescript-eslint": tseslint.plugin,
      "react-compiler": reactCompiler,
      react: eslintReact,
      prettier: prettierPlugin,
    },
    ignores: [
      "dist",
      "node_modules",
      "coverage",
      "eslint.config.js",
      "src/components/ui",
    ],
    rules: {
      // React Rules
      "react/jsx-curly-brace-presence": [
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
      "react/self-closing-comp": ["error", { component: true, html: true }],
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",

      // TypeScript Rules
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/naming-convention": [
        "error",
        { selector: "class", format: ["PascalCase"] },
        { selector: "typeAlias", format: ["PascalCase"] },
        { selector: "interface", format: ["PascalCase"] },
        {
          selector: "variable",
          format: ["camelCase", "UPPER_CASE"],
          leadingUnderscore: "allow",
          trailingUnderscore: "allow",
        },
        { selector: "function", format: ["camelCase", "PascalCase"] },
        { selector: "enum", format: ["PascalCase"] },
        { selector: "typeLike", format: ["PascalCase"] },
      ],
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/promise-function-async": "error",

      // General Rules
      "no-control-regex": "off",
      "prefer-const": "error",
      "arrow-body-style": ["error", "as-needed"],
      "max-params": ["error", 2],
      "max-lines": ["warn", { max: 250 }],
      "no-debugger": "warn",
      ...prettierPlugin.configs.recommended.rules,
      ...eslintConfigPrettier.rules,

      // Formatting and Styling
      "capitalized-comments": [
        "warn",
        "always",
        { ignoreConsecutiveComments: true },
      ],
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "return" },
        { blankLine: "always", prev: "*", next: "block" },
        { blankLine: "always", prev: "for", next: "*" },
        { blankLine: "always", prev: "*", next: "for" },
        { blankLine: "always", prev: "if", next: "*" },
        { blankLine: "always", prev: "*", next: "if" },
        { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
        {
          blankLine: "any",
          prev: ["const", "let", "var"],
          next: ["const", "let", "var"],
        },
        { blankLine: "always", prev: "import", next: "*" },
        { blankLine: "never", prev: "import", next: "import" },
        { blankLine: "always", prev: "export", next: "*" },
        { blankLine: "never", prev: "export", next: "export" },
        { blankLine: "always", prev: "function", next: "*" },
        { blankLine: "always", prev: "*", next: "function" },
        { blankLine: "always", prev: "*", next: "export" },
      ],
      "lines-between-class-members": ["error", "always"],
      "lines-around-comment": [
        "error",
        {
          beforeBlockComment: true,
          beforeLineComment: true,
          allowBlockStart: true,
          allowBlockEnd: true,
          allowObjectStart: true,
          allowObjectEnd: true,
          allowArrayStart: true,
          allowArrayEnd: true,
        },
      ],
    },
  },
);
