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
      type: 0,
      color: "#FFCC00",
      anchored: false,
      plain: false,
      accuracy: 150,
      direction: 0,
    },
  }
];

export default {
  title: "Shapes",
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

export const Shapes = {
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
    shapeAccuracy: {
      control: {
        step: 20,
        type: "number",
        value: markersList[0].shape.accuracy,
      },
      name: "shape.accuracy",
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
    shapeDirection: {
      control: {
        max: 360,
        min: 0,
        step: 10,
        type: "range",
        value: markersList[0].shape.direction,
      },
      name: "shape.direction",
    },
    shapePlain: {
      control: "boolean",
      name: "shape.plain",
      value: markersList[0].shape.plain,
    },
    shapeType: {
      control: "radio",
      name: "shape.type",
      options: ["Circle", "Square"],
      value: markersList[0].shape.type === 0 ? "Circle" : "Square",
    },
  },
  render: (args) => {
    if (undefined !== args.locationLatitude) {
      markersList[0].location[1] = args.locationLatitude;
    }
    if (undefined !== args.locationLongitude) {
      markersList[0].location[0] = args.locationLongitude;
    }
    if (undefined !== args.shapeAccuracy) {
      markersList[0].shape.accuracy = args.shapeAccuracy;
    }
    if (undefined !== args.shapeAnchored) {
      markersList[0].shape.anchored = args.shapeAnchored;
    }
    if (undefined !== args.shapeColor) {
      markersList[0].shape.color = args.shapeColor;
    }
    if (undefined !== args.shapeDirection) {
      markersList[0].shape.direction = args.shapeDirection;
    }
    if (undefined !== args.shapePlain) {
      markersList[0].shape.plain = args.shapePlain;
    }
    if (undefined !== args.shapeType) {
      markersList[0].shape.type = args.shapeType === "Circle" ? 0 : 1;
    }
    addEventListener("DOMContentLoaded", update);
    return template;
  },
};
