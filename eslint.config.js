const js = require('@eslint/js');
const tseslint = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const globals = require('globals');
const svelte = require('eslint-plugin-svelte');

module.exports = [
  {
    ignores: [
      '**/dist/**',
      '**/.svelte-kit/**',
      '**/node_modules/**',
      '**/*.svelte.ts',
      '**/*.svelte.js',
    ],
  },
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.ts', '**/*.mjs', '**/*.cjs'],
    ignores: ['**/*.svelte.js', '**/*.svelte.ts'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsParser,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },
  ...svelte.configs['flat/recommended'],
  {
    files: ['**/*.svelte'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.svelte'],
      },
    },
  },
];
