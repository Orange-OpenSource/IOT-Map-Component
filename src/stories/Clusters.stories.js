import { IotMapConfig, IotMapManager, IotMapMarkerManager } from 'iotmapmanager/dist';
import { MARKER_LIST } from './data.const';
import './stories.css';

const template = `<div id="iotMap" style="width: 1280px; height: 720px"></div>`;
let markersList = MARKER_LIST;

export default {
  title: 'Clusters',
  parameters: {
    layout: 'fullscreen',
  },
};

function update() {
  let config = new IotMapConfig();
  let mapManager = new IotMapManager(config);
  let markerManager = new IotMapMarkerManager(mapManager, config)
  mapManager.init('iotMap');
  markerManager.addMarkers(markersList);
  removeEventListener('DOMContentLoaded', update);
}

export const Clusters = {
  argTypes: {
    markersList: {
      control: {
        type: 'object',
        value: markersList
      },
    },
  },
  render: (args) => {
    console.log('render', args.markersList)
    if (args.markersList) {
      markersList = args.markersList;
    }
    addEventListener('DOMContentLoaded', update);
    return template
  }
};
