import { IotMapManager } from '../iotMapManager/iotMapManager';
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
let iotMapTemplate: string = `<div id="iotMap" style="width: 1280px; height: 720px"></div>`;

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

const shapeParams = (id) => ({
  shape: select(
    'Shape type',
    ['square', 'circle', 'poi'],
    'circle',
    'item ' + id
  ),
  color: color('Shape color', '#FFCC00', 'item ' + id),
  anchored: boolean('With anchor', false, 'item ' + id),
});

const innerParams = (id) => ({
  color: color('Inner color', 'green', 'item ' + id),
  label: text('Inner letter', 'J', 'item ' + id),
});

const gaugeParams = (id) => ({
  color: color('color', 'red', 'item ' + id),
  percent: number(
    'Gauge value',
    15,
    {
      range: true,
      min: 0,
      max: 100,
      step: 1,
    },
    'item ' + id
  ),
});

const locationParams = (id) => [
  number('longitude', 44.895, {}, 'item ' + id),
  number('latitude', 4.87, {}, 'item ' + id),
];

const innerStoryParams = (id) => ({
  id: 's1',
  location: locationParams(id),
  shape: shapeParams(id),
  inner: innerParams(id),
});

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
      shape: shapeParams(0),
      gauge: gaugeParams(0),
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
      shape: shapeParams(0),
      gauge: gaugeParams(0),
      inner: innerParams(0),
    },
  ]
  addEventListener('DOMContentLoaded', init);
  return iotMapTemplate;
};

function init() {
  var t = new IotMapManager();
  t.init('iotMap');
  t.addMarkers(markersList);
  removeEventListener('DOMContentLoaded', init);
}
