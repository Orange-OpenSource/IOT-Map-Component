import {
  IotMapConfig,
  IotMapManager,
  IotMapMarkerManager,
} from "iotmapmanager/dist";
import "./stories.css";

const template = `<div id="iotMap" style="width: 1280px; height: 720px"></div>`;

let markersList = [
  {
    id: 's1',
    location: [44.895, 4.87],
    shape: {
      anchored: false,
      color: 'red',
      percent: 15
    }
  },
];

export default {
  title: "Gauge",
  parameters: {
    layout: "fullscreen",
  },
};

function update() {
  let config = new IotMapConfig();
  let mapManager = new IotMapManager(config);
  let markerManager = new IotMapMarkerManager(mapManager, config);
  mapManager.init("iotMap");
  markerManager.addMarkers(markersList);
  removeEventListener("DOMContentLoaded", update);
}

export const Gauge = {
  argTypes: {
    locationLatitude: {
      control: {
        step: 0.001,
        type: "number",
        value: markersList[0].location[1],
      },
      name: "location.latitude",
    },
    locationLongitude: {
      control: {
        step: 0.001,
        type: "number",
        value: markersList[0].location[0],
      },
      name: "location.longitude",
    },
    shapeAnchored: {
      control: "boolean",
      name: "shape.anchored",
      value: markersList[0].shape.anchored,
    },
    shapeColor: {
      control: {
        type: "color",
        value: markersList[0].shape.color,
      },
      name: "shape.color",
    },
    shapePercent: {
      control: {
        max: 100,
        min: 0,
        step: 1,
        type: "range",
        value: markersList[0].shape.percent,
      },
      name: "shape.percent",
    },
  },
  render: (args) => {
    if (undefined !== args.locationLatitude) {
      markersList[0].location[1] = args.locationLatitude;
    }
    if (undefined !== args.locationLongitude) {
      markersList[0].location[0] = args.locationLongitude;
    }
    if (undefined !== args.shapeAnchored) {
      markersList[0].shape.anchored = args.shapeAnchored;
    }
    if (undefined !== args.shapeColor) {
      markersList[0].shape.color = args.shapeColor;
    }
    if (undefined !== args.shapePercent) {
      markersList[0].shape.percent = args.shapePercent;
    }
    addEventListener("DOMContentLoaded", update);
    return template;
  },
};
