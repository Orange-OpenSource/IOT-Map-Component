/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  stories: [
    "../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: ["@storybook/addon-a11y", "@storybook/addon-docs"],
  framework: {
    name: "@storybook/html-vite",
    options: {
      builder: {},
    },
  },
  docs: {}
};
export default config;
