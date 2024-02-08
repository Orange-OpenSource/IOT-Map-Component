import { IotMapConfig, IotMapManager, IotMapMarkerManager } from 'iotmapmanager/dist';
import { MARKER_LIST } from './data.const';
import './stories.css';

const template = `<div id="iotMap" style="width: 1280px; height: 720px"></div>`;

const locationParams = (id) => [
  number('longitude', 44.895, {step: 0.001}, 'item ' + id),
  number('latitude', 4.87, {step: 0.001}, 'item ' + id),
];

const shapeParams = (id) => ({
  type: select(
    'Shape type',
    [ShapeType.circle, ShapeType.square],
    0,
    'item ' + id
  ),
  color: color('Shape color', '#FFCC00', 'item ' + id),
  anchored: boolean('With anchor', false, 'item ' + id),
  plain: boolean('Plain shape', false, 'item ' + id),
  accuracy: accuracyParams(id),
  direction: directionParams(id)
});

const innerParams = (id) => ({
  color: color('Inner color', 'green', 'item ' + id),
  label: text('Inner letter', 'J', 'item ' + id),
  icon: text('Inner icon', 'iotmap-icons-temperature', 'item ' + id),
});

const innerStoryParams = (id) => ({
  id: 's1',
  location: locationParams(id),
  shape: shapeParams(id),
  inner: innerParams(id),
});

// let markersList = [innerStoryParams[0]];

let shapeColor = '#FFCC00';

let markersList = [
  {
    id: 's1',
    location: {
      lat: 44.895,
      lng: 4.870
    },
    template: 'square',
    // status: 'warning',
    tab: {
      content: 'H',
      type: 0, // TabType.normal,
    },
    shape: {
      type: 0,
      color: shapeColor,
      anchored: false,
      plain: false,
      accuracy: 12,
      direction: 'd'
    }
  },
];

console.log([innerStoryParams[0]])

export default {
  title: 'Inner',
  parameters: {
    layout: 'fullscreen',
  },
};

function update() {
  let config = new IotMapConfig();
  let mapManager = new IotMapManager(config);
  let markerManager = new IotMapMarkerManager(mapManager, config)
  mapManager.init('iotMap');

  console.log(markersList)

  markerManager.addMarkers(markersList);
  removeEventListener('DOMContentLoaded', update);
}

export const Inner = {
  argTypes: {
    shapeColor: {
      control: {
        type: 'color',
        // color: shapeColor,
        value: shapeColor
      }
    },
    markersList: {
      control: {
        type: 'object',
        value: markersList
      },
    },
  },
  render: (args) => {
    console.log('render', args.markersList)
    if (args.shapeColor) {
      shapeColor = args.shapeColor; 
    }
    if (args.markersList) {
      markersList = args.markersList;
    }
    addEventListener('DOMContentLoaded', update);
    return template
  }
};
