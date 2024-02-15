import {
  IotMapConfig,
  IotMapManager,
  IotMapUserMarkerManager,
} from "iotmapmanager/dist";
import "./stories.css";

const template = `<div id="iotMap" style="width: 1280px; height: 720px"></div>`;

let userMarker = 
  {
    location: [44.895, 4.87],
    direction: 0,
    accuracy: 150
  }


export default {
  title: "UserMarker",
  parameters: {
    layout: "fullscreen",
  },
};

function update() {
  let config = new IotMapConfig();
  let mapManager = new IotMapManager(config);
  let markerManager = new IotMapUserMarkerManager(mapManager, config);
  mapManager.init("iotMap");
  markerManager.addUserMarker(userMarker);
  removeEventListener("DOMContentLoaded", update);
}

export const UserMarker = {
  argTypes: {
    accuracy: {
      control: {
        step: 20,
        type: "number",
        value: userMarker.accuracy,
      },
      name: "accuracy",
    },
    direction: {
      control: {
        max: 360,
        min: 0,
        step: 10,
        type: "range",
        value: userMarker.direction,
      },
      name: "direction",
    },
    locationLatitude: {
      control: {
        step: 0.001,
        type: "number",
        value: userMarker.location[1],
      },
      name: "location.latitude",
    },
    locationLongitude: {
      control: {
        step: 0.001,
        type: "number",
        value: userMarker.location[0],
      },
      name: "location.longitude",
    },
  },
  render: (args) => {
    if (undefined !== args.accuracy) {
      userMarker.accuracy = args.accuracy;
    }
    if (undefined !== args.direction) {
      userMarker.direction = args.direction;
    }
    if (undefined !== args.locationLatitude) {
      userMarker.location[1] = args.locationLatitude;
    }
    if (undefined !== args.locationLongitude) {
      userMarker.location[0] = args.locationLongitude;
    }
    addEventListener("DOMContentLoaded", update);
    return template;
  },
};
