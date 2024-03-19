import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

/** @type { import('@storybook/html').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: { viewports: INITIAL_VIEWPORTS },
  },
};

export default preview;
