import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

export default tseslint.config(
  { ignores: ['dist', 'vite.config.ts'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'simple-import-sort': simpleImportSort
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // React core
            ['^react$'],
            // React ecosystem (react-router, react-hook-form, etc.)
            ['^react-'],
            // Other third-party libraries
            ['^axios', '^@heroui', '^@heroicons', '^@?\\w'],
            // Internal/relative imports
            ['^\\.', '^\\.\\.', '^/']
          ]
        }
      ],
      'simple-import-sort/exports': 'error'
    }
  }
)
