import {
  IotMapConfig,
  IotMapManager,
  IotMapMarkerManager,
} from "iotmapmanager/dist";
import "./stories.css";

const template = `<div id="iotMap" style="width: 1280px; height: 720px"></div>`;

let markersList = [];

export default {
  title: "UserMarker",
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

export const UserMarker = {
  render: (args) => {
    addEventListener("DOMContentLoaded", update);
    return template;
  },
};
