/**
 * Emotion v11で設定が若干複雑。この設定をしないと動かない。
 * https://stackoverflow.com/questions/65894711/module-not-found-error-cant-resolve-emotion-styled-base-when-running-story
 */

const path = require('path');
const fs = require('fs');
const { merge } = require('webpack-merge');

function getPackageDir(filepath) {
  let currDir = path.dirname(require.resolve(filepath));
  while (true) {
    if (fs.existsSync(path.join(currDir, 'package.json'))) {
      return currDir;
    }
    const { dir, root } = path.parse(currDir);
    if (dir === root) {
      throw new Error(
        `Could not find package.json in the parent directories starting from ${filepath}.`,
      );
    }
    currDir = dir;
  }
}

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-viewport',
    '@storybook/addon-actions',
  ],
  /* TS4.3のバグ対応: https://github.com/styleguidist/react-docgen-typescript/issues/356 */
  typescript: {
    reactDocgen: 'none',
  },
  webpackFinal: async (config) => {
    config.resolve.alias['src'] = path.resolve(__dirname, '../src');
    return merge(config, {
      resolve: {
        alias: {
          '@emotion/core': getPackageDir('@emotion/react'),
          '@emotion/styled': getPackageDir('@emotion/styled'),
          'emotion-theming': getPackageDir('@emotion/react'),
        },
      },
    });
  },
};
