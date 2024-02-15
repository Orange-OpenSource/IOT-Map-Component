const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/html-webpack5",
    options: {
      builder: {
        useSWC: true,
      },
    },
  },
  docs: {
    autodocs: "tag",
  },
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
