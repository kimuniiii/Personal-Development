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
  plugins: ['@typescript-eslint', 'react', 'jest', 'import', 'unused-imports'],
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
        groups: ['builtin', 'external', 'internal', 'index', 'type', 'sibling', 'parent'],
        pathGroupsExcludedImportTypes: ['builtin'],
        pathGroups: [
          {
            group: 'internal',
            pattern: 'src/components/**',
            position: 'before',
          },
          {
            group: 'internal',
            pattern: 'src/constants',
            position: 'before',
          },
          {
            group: 'internal',
            pattern: 'src/hooks/**',
            position: 'before',
          },
          {
            group: 'internal',
            pattern: 'src/lib/**',
            position: 'before',
          },
          {
            group: 'internal',
            pattern: 'src/stores/**',
            position: 'before',
          },
          {
            group: 'internal',
            pattern: 'src/styles/**',
            position: 'before',
          },
          {
            group: 'internal',
            pattern: 'src/utils/**',
            position: 'before',
          },
        ],
      },
    ],
    'newline-before-return': 'error',
    'import/no-default-export': 'error',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'error',
      { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
    ],
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
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
  overrides: [
    {
      files: ['*.stories.tsx', 'src/pages/**/*'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
};
