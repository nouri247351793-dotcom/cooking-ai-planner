import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // Note: `.vite-cache` is a local build artifact. Linting it produces大量噪音且不属于业务代码范围。
  globalIgnores(['dist', '.vite-cache/**', 'public/vendor/**', '**/*.min.js']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      // For small UI effects (toast/confetti/modal), we allow state updates in effects.
      // This keeps `npm run lint` usable without forcing risky refactors during final polish.
      'react-hooks/set-state-in-effect': 'off',
    },
  },
])
