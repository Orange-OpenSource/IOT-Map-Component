import { IotMapConfig, IotMapManager, IotMapMarkerManager } from 'iotmapmanager/dist';
import './stories.css';

const template = `<div id="iotMap" style="width: 1280px; height: 720px"></div>`;

let markersList = [{
  id: 's1',
  location: [
    44.895,
    4.87
  ],
  shape: {
    type: 0, // select('Shape type',[ShapeType.circle, ShapeType.square],0,'item ' + id),
    color: '#FFCC00',
    anchored: false, // boolean('With anchor', false, 'item ' + id),
    plain: false, // boolean('Plain shape', false, 'item ' + id),
    accuracy: 150, // [number('accuracy', 150, {step: 20}, 'item 0'),],
    direction: 0, // number('direction',0,{range: true,min: 0,max: 360,step: 10,}, 'item ' + id)
  },
  inner: {
    color: 'green', // color('Inner color', 'green', 'item ' + id),
    label: 'J', // text('Inner letter', 'J', 'item ' + id),
    icon: 'iotmap-icons-temperature', //text('Inner icon', 'iotmap-icons-temperature', 'item ' + id),
  },
}];

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
  markerManager.addMarkers(markersList);
  removeEventListener('DOMContentLoaded', update);
}

export const Inner = {
  argTypes: {
    longitude: {
      control: {
        type: 'number',
        step: 0.001,
        value: markersList[0].location[0]
      }
    },
    latitude: {
      control: {
        type: 'number',
        step: 0.001,
        value: markersList[0].location[1]
      }
    },
    shapeType: {
      control: 'radio', options: ['Circle', 'Square'], value: markersList[0].shape.type === 0 ? 'Circle' : 'Square'
    },
    shapeColor: {
      control: {
        type: 'color',
        value: markersList[0].shape.color
      }
    },
  },
  render: (args) => {
    if (undefined !== args.longitude) {
      markersList[0].location[0] = args.longitude;
    }
    if (undefined !== args.latitude) {
      markersList[0].location[1] = args.latitude;
    }
    if (undefined !== args.shapeType) {
      markersList[0].shape.type = args.shapeType === 'Circle' ? 0 : 1;
    }
    if (undefined !== args.shapeColor) {
      markersList[0].shape.color = args.shapeColor;
    }
    addEventListener('DOMContentLoaded', update);
    return template
  }
};
