import {
  IotMapConfig,
  IotMapManager,
  IotMapMarkerManager,
  IotMapUserMarkerManager,
  ShapeType
} from '../iotMapManager/index';

import './Test.stories.css';
import {
  withKnobs,
  object,
  select,
  number,
  boolean,
  color,
  text
} from '@storybook/addon-knobs';
import { MARKER_LIST } from './Test.stories.const';

export default {
  title: 'Iot Map Manager',
  decorators: [
    withKnobs
  ]
};

let markersList: any;
let userMarker: any;
let clusterList: any;
let iotMapTemplate: string = `<div id="iotMap" style="width: 1280px; height: 720px"></div>`;


const locationParams = (id) => [
  number('longitude', 44.895, {step: 0.001}, 'item ' + id),
  number('latitude', 4.87, {step: 0.001}, 'item ' + id),
];

/*const layerParams ?
  const popupParams ?
  const statusParams ?*/


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
});

const innerParams = (id) => ({
  color: color('Inner color', 'green', 'item ' + id),
  label: text('Inner letter', 'J', 'item ' + id),
  icon: text('Inner icon', 'iotmap-icons-temperature', 'item ' + id),
});

const gaugeParams = (id) => ({
  type: select(
    'Shape type',
    [ShapeType.circle],
    0,
    'item ' + id
  ),
  color: color('Shape color', 'red', 'item ' + id),
  anchored: boolean('With anchor', false, 'item ' + id),
  percent: percentParams(id),
});



const percentParams = (id) => [
  number(
    'Gauge value',
    15,
    {
      range: true,
      min: 0,
      max: 100,
      step: 1,
    },
    'item ' + id
  )
];

const accuracyParams = (id) => [
  number('accuracy', 150, {step: 20}, 'item ' + id),
];

const directionParams = (id) =>
  number('direction',
    0,
    {
    range: true,
    min: 0,
    max: 360,
    step: 10,
  }, 'item ' + id)
;

const innerStoryParams = (id) => ({
  id: 's1',
  location: locationParams(id),
  shape: shapeParams(id),
  inner: innerParams(id),
});



///////////////////////////////////////////////////////////////
// CLUSTERS
///////////////////////////////////////////////////////////////

export const Clusters  = () => {
  markersList = object('markersList', MARKER_LIST);
  addEventListener('DOMContentLoaded', init);
  return iotMapTemplate;
};

///////////////////////////////////////////////////////////////
// INNER
///////////////////////////////////////////////////////////////

export const Inner = () => {
  markersList = [innerStoryParams(0)];
  addEventListener('DOMContentLoaded', init);
  return iotMapTemplate;
};
///////////////////////////////////////////////////////////////
// SHAPES
///////////////////////////////////////////////////////////////

export const Shapes = () => {
  markersList = [
    {
      id: 's1',
      location: locationParams(0),
      shape: shapeParams(0),
    },
  ]
  addEventListener('DOMContentLoaded', init);
  return iotMapTemplate;
};

///////////////////////////////////////////////////////////////
// GAUGE
///////////////////////////////////////////////////////////////

export const Gauge = () => {
  markersList = [
    {
      id: 's1',
      location: locationParams(0),
      shape: gaugeParams(0),
    },
  ];
  addEventListener('DOMContentLoaded', init);
  return iotMapTemplate;
};

///////////////////////////////////////////////////////////////
// GAUGE WITH INNER
///////////////////////////////////////////////////////////////

export const GaugeWithInner = () => {
  markersList = [
    {
      id: 's1',
      location: locationParams(0),
      shape: gaugeParams(0),
      inner: innerParams(0),
    },
  ]
  addEventListener('DOMContentLoaded', init);
  return iotMapTemplate;
};

function init() {
  let config = new IotMapConfig()
  let mapManager = new IotMapManager(config);
  let markerManager = new IotMapMarkerManager(mapManager, config)
  mapManager.init('iotMap');
  markerManager.addMarkers(markersList);
  removeEventListener('DOMContentLoaded', init);
}



///////////////////////////////////////////////////////////////
// USER MARKER
///////////////////////////////////////////////////////////////

const userMarkerParams = () => ({
  location: locationParams(0),
  direction: directionParams(0),
  accuracy: accuracyParams(0)

})

export const UserMarker = () => {
  userMarker = userMarkerParams();
  addEventListener('DOMContentLoaded', initUserMarker);
  return iotMapTemplate;
};

function initUserMarker() {
  let config = new IotMapConfig()
  let mapManager = new IotMapManager(config);
  let userMarkerManager = new IotMapUserMarkerManager(mapManager, config)
  mapManager.init('iotMap');
  userMarkerManager.addUserMarker(userMarker);
  removeEventListener('DOMContentLoaded', initUserMarker);
}

