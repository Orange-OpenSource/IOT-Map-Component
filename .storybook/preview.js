import { INITIAL_VIEWPORTS } from 'storybook/viewport';

/** @type { import('@storybook/html-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: { options: INITIAL_VIEWPORTS },
  },
};

export default preview;
