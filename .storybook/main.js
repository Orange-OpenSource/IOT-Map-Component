const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  stories: [
    "../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-essentials",
    "@storybook/addon-webpack5-compiler-swc"
  ],
  framework: {
    name: "@storybook/html-webpack5",
    options: {
      builder: {},
    },
  },
  docs: {},
  webpackFinal: async (config, {configType}) => {
    config.resolve.plugins = [
      new TsconfigPathsPlugin({
          configFile: path.resolve(__dirname, './tsconfig.json')
      }),
    ];
    return config;
  }
};
export default config;
