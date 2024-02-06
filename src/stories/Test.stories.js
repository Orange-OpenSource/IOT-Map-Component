import { IotMapConfig, IotMapManager, IotMapMarkerManager } from 'iotmapmanager/dist';

export default {
  title: 'Example/Test',
  render: () => `<div id="iotMap" style="width: 1280px; height: 720px"></div>`,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
};

export const Test1 = {
  play: async ({ canvasElement }) => {
    let config = new IotMapConfig()
    let mapManager = new IotMapManager(config);
    let markerManager = new IotMapMarkerManager(mapManager, config)
    mapManager.init('iotMap');
  }
};
