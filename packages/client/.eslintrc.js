module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jest/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  // plugins に import を 加えないと`Error`になる | 2021年10月15日時点
  plugins: ['@typescript-eslint', 'react', 'jest', 'import'],
  settings: {
    // TypeScript の import を eslint-import-resolver-typescript で解決するために必要
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
    'import/order': [
      'error',
      {
        // 'newlines-between': 'always-and-inside-groups' でないと設定と保存時の挙動が一致しない | 2021年10月15日時点
        'newlines-between': 'always-and-inside-groups',
        alphabetize: { caseInsensitive: true, order: 'asc' },
        groups: ['builtin', 'external', 'index', 'type', 'sibling', 'parent'],
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
            pattern: 'src/utils/**',
            position: 'before',
          },
        ],
      },
    ],
    'newline-before-return': 'error',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          fixWith: 'object',
          message: 'Use object instead',
        },
      },
    ],
  },
};
