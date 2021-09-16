/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.test.json',
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  testMatch: ['**/?(*.)+(test).+(ts|tsx|js)'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  transform: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/fileTransformer.js',
  },
};
