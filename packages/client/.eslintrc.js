module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@next/next/recommended',
    'next/core-web-vitals',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
      typescript: {
        alwaysTryTypes: true,
        config: 'tsconfig.json',
      },
    },
    react: {
      version: 'detect', // React version. "detect" automatically picks the version you have installed.
    },
  },
  rules: {
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          fixWith: 'object',
          message: 'Use object instead',
        },
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 'error',
    'import/order': [
      'error',
      {
        alphabetize: { caseInsensitive: true, order: 'asc' },
        groups: ['builtin', 'external', 'type', 'index', 'sibling', 'parent'],
        'newlines-between': 'always',
        pathGroups: [
          {
            group: 'index',
            pattern: 'src/components/**',
            position: 'before',
          },
          {
            group: 'index',
            pattern: 'src/constants',
            position: 'before',
          },
          {
            group: 'index',
            pattern: 'src/hooks/**',
            position: 'before',
          },
          {
            group: 'index',
            pattern: 'src/lib/**',
            position: 'before',
          },
          {
            group: 'index',
            pattern: 'src/stores/**',
            position: 'before',
          },
          {
            group: 'index',
            pattern: 'src/styles/**',
            position: 'before',
          },
          {
            group: 'index',
            pattern: 'src/pages/**',
            position: 'before',
          },
          {
            group: 'index',
            pattern: 'src/utils/**',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['src/components/**', 'src/styles/**'],
      },
    ],
  },
};
