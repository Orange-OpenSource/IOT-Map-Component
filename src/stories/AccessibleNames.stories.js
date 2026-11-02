import {
  IotMapConfig,
  IotMapManager,
  IotMapMarkerManager,
  IotMapUserMarkerManager,
  IotMapPathManager,
  IotMapAreaManager,
} from "iotmapmanager/index.ts";
import "./stories.css";

const template = `
  <p>Use Tab to reach Sensor 1, then Enter or Space to open its popup.
  Tab reaches the link; Escape closes the popup. Cluster popups open on focus or hover.</p>
  <div id="iotMap" style="width: 1280px; height: 720px"></div>
  <section id="sensor-details" tabindex="-1">
    <h2>Sensor 1 details</h2>
    <p>Temperature: 32 degrees Celsius. Alert threshold: 30 degrees Celsius.</p>
  </section>`;

const markers = [
  {
    id: "alone",
    location: { lat: 44.895, lng: 4.87 },
    ariaLabel: "Sensor 1, temperature alert",
    popup: {
      title: "Sensor 1",
      body: 'Temperature alert: 32 degrees Celsius.<br><a href="#sensor-details">View sensor details</a>',
    },
  },
  // close markers are grouped in an automatic cluster at the default zoom level
  { id: "c1", location: { lat: 44.885, lng: 4.89 }, status: "alert" },
  { id: "c2", location: { lat: 44.8852, lng: 4.8903 }, status: "alert" },
  { id: "c3", location: { lat: 44.8854, lng: 4.8906 }, status: "alert" },
];

const userMarker = {
  location: { lat: 44.89, lng: 4.88 },
  direction: 45,
  accuracy: 100,
  ariaLabel: "Your position",
};

const path = {
  id: "path",
  points: [
    { lat: 44.88, lng: 4.87 },
    { lat: 44.882, lng: 4.875 },
    { lat: 44.881, lng: 4.88 },
  ],
  positions: [{ lat: 44.882, lng: 4.875 }],
  ariaLabel: "Delivery route",
  iconsAriaLabel: {
    start: "Route start",
    end: "Route end",
    position: "Intermediate stop",
  },
};

const area = {
  id: "area",
  points: [
    { lat: 44.9, lng: 4.895 },
    { lat: 44.9, lng: 4.9 },
    { lat: 44.896, lng: 4.9 },
  ],
  ariaLabel: "Restricted area",
};

export default {
  title: "AccessibleNames",
  parameters: {
    layout: "fullscreen",
  },
};

function update() {
  const config = new IotMapConfig();
  config.setConfig({
    markerStatus: {
      alert: {
        ...config.markerStatus.alert,
        url: "#sensor-details",
      },
    },
    accessibility: {
      clusterAriaLabel: (cluster) => `Group of ${cluster.childCount} elements`,
    },
  });
  const mapManager = new IotMapManager(config);
  mapManager.init("iotMap");
  new IotMapMarkerManager(mapManager, config).addMarkers(markers);
  new IotMapUserMarkerManager(mapManager, config).addUserMarker(userMarker);
  new IotMapPathManager(mapManager, config).addPath(path);
  new IotMapAreaManager(mapManager, config).addArea(area);
  removeEventListener("DOMContentLoaded", update);
}

export const AccessibleNames = {
  render: () => {
    addEventListener("DOMContentLoaded", update);
    return template;
  },
};
