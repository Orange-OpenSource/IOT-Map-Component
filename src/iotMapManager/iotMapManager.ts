/*
* Software Name : IotMapManager
* Version: 0.2.3
* SPDX-FileCopyrightText: Copyright (c) 2020 Orange
* SPDX-License-Identifier: MIT
*
* This software is distributed under the MIT License,
* the text of which is available at https://github.com/Orange-OpenSource/IOT-Map-Component/blob/master/LICENSE
* or see the "license.txt" file for more details.
*
* Author: S. Gateau
* Software description: provide markers, tabs, clusters and paths dedicated to iot projects using mapping
*/

import * as L from 'leaflet';
import 'leaflet.markercluster';
import { IotMapMarkers } from './iotMapMarkers/iotMapMarkers';
import * as config from './iotMapManager.json';
import * as commonSvg from './iotMapMarkers/iotMapCommonSvg';

export class IotMapManager {
  map: any;
  iotMapMarkers: IotMapMarkers;
  markersObjects: any = {};

  baseLayers: { Satellite: any; Standard: any };

  squareMarkersLayer: any = {};
  circleMarkersLayer: any = {};
  poiMarkersLayer: any = {};

  selectedMarkerId = '';


  constructor() {
    this.iotMapMarkers = new IotMapMarkers();
  }
  // ------------------------------------------------------------------------------------------------------------------
  // ---------- INIT --------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------------
  init(selector) {
    // init map
    this.map = L.map(selector).setView(L.latLng(config.map.DEFAULT_LAT, config.map.DEFAULT_LON), config.map.DEFAULT_ZOOM_LEVEL);

    // init base layers
    const defaultLayer = L.tileLayer(config.map.openStreetMapLayer, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    const geoportailLayer = L.tileLayer.wms(config.map.geoportailLayer, {
      attribution: '<a target="_blank" href="https://www.geoportail.gouv.fr/">Geoportail France</a>',
      format: 'image/jpeg',
      styles: 'normal'
    }); // .addTo(this.map);

    this.baseLayers = {
      Standard: defaultLayer,
      Satellite: geoportailLayer
    };

    // init markers layers
    this.squareMarkersLayer = this.initMarkersLayer('square');
    this.circleMarkersLayer = this.initMarkersLayer('circle');
    this.poiMarkersLayer = this.initMarkersLayer('poi');
  }

  initMarkersLayer(clusterType) {
    // create layer
    const layer = L.markerClusterGroup({
      maxClusterRadius: 150,
      // clusterType: clusterType,
      showCoverageOnHover: false,
      iconCreateFunction: this.defineClusterIcon
    });
    this.map.addLayer(layer);

    // manage events on markers
    layer.on('click', this.onMarkerClick.bind(this));
    const instance = this;
    layer.on('clustermouseover', this.onClusterMouseOver.bind(this)
    ).on('clustermouseout', c => instance.map.closePopup()
    ).on('clusterclick', c => instance.map.closePopup()
    );

    return layer;
  }

  getMarkerLayer(shape) {
    switch (shape) {
      case 'circle': {
        return this.circleMarkersLayer;
        break;
      }
      case 'square': {
        return this.squareMarkersLayer;
        break;
      }
      case 'poi': {
        return this.poiMarkersLayer;
        break;
      }
    }
  }

  // ------------------------------------------------------------------------------------------------------------------
  // ---------- EVENTS ------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------------
  onMarkerClick(event) {
    // todo add popup management here
    const markerObject = this.markersObjects[event.layer.markerInfo.id];

    // select / unselect marker
    let html: L.DivIcon;
    // already selected => unselect it
    if (this.selectedMarkerId === markerObject.markerInfo.id) {
      // update selected id
      this.selectedMarkerId = '';

      // get new html and update marker (=> unselect marker)
      html = this.iotMapMarkers.getMarker(markerObject.markerInfo, false);
      markerObject.setIcon(html);
      this.map.closePopup();
    } else {  // new marker selected
      // --- unselect last selected marker ---
      if (this.selectedMarkerId !== '') {  // a marker was already selected
        const lastSelectedMarker = this.markersObjects[this.selectedMarkerId];

        // get new html and update marker (=> unselect marker)
        html = this.iotMapMarkers.getMarker(lastSelectedMarker.markerInfo, false);
        lastSelectedMarker.setIcon(html);
      }

      // --- select new marker ---
      // update selected id
      this.selectedMarkerId = markerObject.markerInfo.id;

      // get new html and update marker (=> select marker)
      html = this.iotMapMarkers.getMarker(markerObject.markerInfo, true);
      markerObject.setIcon(html).bindPopup(markerObject.markerInfo.popup);
    }
  }

  onClusterMouseOver(cluster) {
    // create popup content
    let content = cluster.layer._childCount + ' ' + cluster.target.options.clusterType + '(s) : <br>';
    const tabDistribution: any = {};
    const allChildMarkers = cluster.layer.getAllChildMarkers();
    allChildMarkers.forEach(marker => {
      const markerColor = marker.markerInfo.shape.color;
      if (tabDistribution[markerColor]) {
        tabDistribution[markerColor] += 1;
      } else {
        tabDistribution[markerColor] = 1;
      }
    });

    for (const color in tabDistribution) {
      if (tabDistribution[color]) {
        content += '<span style="color:' + color + '; font-size: 30px">&#x25CF;   </span>' +
          '<span style="color: black">' + tabDistribution[color] + ' marker(s) </span><br>';
      }
    }

    // create popup
    L.popup({closeButton: false})
      .setLatLng(cluster.layer.getLatLng())
      .setContent(content)
      .openOn(this.map);
  }
  // ------------------------------------------------------------------------------------------------------------------
  // ---------- MARKERS -----------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------------
  addMarker(marker: any) {
    if (marker.id && marker.location) {
      // popup
      let popupText = marker.popup;
      if (!popupText) {
        popupText = marker.id;
        marker.popup = popupText;
      }
      const newMarker: any = L.marker(marker.location, {icon: this.iotMapMarkers.getMarker(marker)}).bindPopup(popupText);
      newMarker.markerInfo = marker;


      this.getMarkerLayer(marker.shape.shape).addLayer(newMarker);
      this.markersObjects[marker.id] = newMarker;
    }
  }

  addMarkers(markerList: any) {
    markerList.forEach(marker => {
       this.addMarker(marker);
    });
  }

  removeMarker(markerId: string) {
    const markerToRemove = this.markersObjects[markerId];
    if (markerToRemove) {
      this.getMarkerLayer(markerToRemove.markerInfo.shape.shape).removeLayer(markerToRemove);
      this.markersObjects[markerId] = null;
    }
  }

  removeMarkers(markersId: string[]) {
    markersId.forEach(id => {
      this.removeMarker(id);
    });
  }

  updateMarker(markerId: string, params: any) {
    const currentMarkerObject = this.markersObjects[markerId];
    const currentMarkerInfos = currentMarkerObject.markerInfo;
    const currentMarkerIsSelected = (this.selectedMarkerId === currentMarkerInfos.id);

    let htmlModificationNeeded = false;
    let oldMarkershape = null;

    if (currentMarkerObject) {
      // location modified
      if (params.location) {
        currentMarkerInfos.location = params.location;

        const newLatLng = new L.LatLng(params.location[0], params.location[1]);
        currentMarkerObject.setLatLng(newLatLng);
      }

      // popup modified
      if (params.popup) {
        currentMarkerInfos.popup = params.popup;
        currentMarkerObject.bindPopup(currentMarkerInfos.popup);
      }

      // shape modified
      if (params.shape) {
        if (params.shape.shape != null) {
          oldMarkershape = currentMarkerInfos.shape.shape;
          currentMarkerInfos.shape.shape = params.shape.shape;
        }
        if (params.shape.color != null) {
          currentMarkerInfos.shape.color = params.shape.color;
        }
        if (params.shape.anchored != null) {
          currentMarkerInfos.shape.anchored = params.shape.anchored;
        }
        if (params.shape.plain != null) {
          currentMarkerInfos.shape.plain = params.shape.plain;
        }

        htmlModificationNeeded = true;
      }

      // inner modified
      if (params.inner) {
        if (!currentMarkerInfos.inner) {
          currentMarkerInfos.inner = {};
        }
        if (params.inner.color) {
          currentMarkerInfos.inner.color = params.inner.color;
        }
        if (params.inner.icon) {
          currentMarkerInfos.inner.icon = params.inner.icon;
          currentMarkerInfos.inner.label = '';
        } else if (params.inner.label) {
          currentMarkerInfos.inner.label = params.inner.label;
          currentMarkerInfos.inner.icon = '';
        }
        htmlModificationNeeded = true;
      }

      // gauge modified
      if (params.gauge) {
        if (!currentMarkerInfos.gauge) {
          currentMarkerInfos.gauge = {};
        }
        if (params.gauge.color) {
          currentMarkerInfos.gauge.color = params.gauge.color;
        }
        if (params.gauge.percent) {
          currentMarkerInfos.gauge.percent = params.gauge.percent;
        }
        htmlModificationNeeded = true;
      }

      // update marker icon
      if (htmlModificationNeeded) {
        const html = this.iotMapMarkers.getMarker(currentMarkerInfos, currentMarkerIsSelected);
        currentMarkerObject.setIcon(html);
      }

      if (oldMarkershape) {
        // remove  marker from previous layer
        this.getMarkerLayer(oldMarkershape).removeLayer(currentMarkerObject);
        // add marker to new layer
        this.getMarkerLayer(currentMarkerInfos.shape.shape).addLayer(currentMarkerObject);
      }
    }
  }

  // ------------------------------------------------------------------------------------------------------------------
  // ---------- CLUSTERS ----------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------------
  defineClusterIcon(cluster) {
    const childCount = cluster.getChildCount();
    const size = config.cluster.iconSize;


    // marker Distribution
    const tabDistribution: any = {};
    const allChildMarkers = cluster.getAllChildMarkers();
    allChildMarkers.forEach(marker => {
      const markerColor = marker.markerInfo.shape.color;
      if (tabDistribution[markerColor]) {
        tabDistribution[markerColor] += 1;
      } else {
        tabDistribution[markerColor] = 1;
      }
    });


    // Gauge design
    let svgGauge = ``;
    let angle = -90.0;
    let arc = 0.0;
    for (const color in tabDistribution) {
      if (tabDistribution[color]) {
        const n = tabDistribution[color];
        arc = n * 1193 / childCount - (60 / childCount);  // todo I DON'T KNOW WHY !!!
        svgGauge += commonSvg.circleGauge + `stroke='` + color
          + `' stroke-dasharray='` + arc + `, 1193' transform='rotate(` + angle + ` 225 225)'/>`;
        angle += n * 360 / childCount;
      }
    }

  // tslint:disable:max-line-length
    return new L.DivIcon({
      html: `<svg xmlns='http://www.w3.org/2000/svg' width='` + size + `' height='` + size + `' viewBox='0 0 450 545'>`
        + `<path fill='white' d='M197 2.21h46c20.84-.18 51.79 8.71 71 16.94 25.45 10.9 49.03 26.7 69 45.89 12.7 12.21 25.89 29.81 35 44.96 46.3 77.02 41.96 173.09-8.34 247-16.66 24.48-38.69 45.13-63.66 60.95-27.28 17.28-70.4 34-103 34.05h-40c-16.83-.2-44.1-7.57-60-13.58C78.05 413.9 27.77 360.57 7.72 294 4.12 282.06.02 265.38 0 253v-52c.03-16.82 7.04-40.18 12.95-56C33.42 90.25 76.01 45.64 129 21.31c23.6-10.84 42.64-15.06 68-19.1zm17 30.07c-19.58 2.82-31.62 3.77-51 10.23-47.98 16-90.54 52.95-112.74 98.49C39.28 163.52 30.3 195.88 30 221c-1.01 86.54 53.52 165.06 137 190.72 15.49 4.76 35.8 9.09 52 9.28 31.6.37 58.09-5.85 87-18.42 18.54-8.07 40.75-24.35 55-38.58 51.31-51.25 70.58-124.64 49.02-194-3.21-10.35-8.2-23.51-13.33-33-13.66-25.27-31.11-46.02-53.69-63.79-18.95-14.92-39.04-25.1-62-32.23-19.38-6.03-46.79-10.58-67-8.7z'/>`
        + `<path fill='white' d='M200 77.15h41c23.72-.11 54 13.64 73 27.28 70.98 50.95 81.12 153.07 26.39 219.57-13.14 15.96-29.98 28.55-48.39 37.75-16.3 8.16-39.71 15.22-58 15.25h-21c-7.19-.09-18.88-2.39-26-4.13C135.54 360.31 94.8 320.6 79.72 270c-6.46-21.69-4.75-37.81-4.72-60 .02-15.57 6.83-36.12 13.75-50 22.96-46.01 61.12-73.33 111.25-82.85z'/>`
        + `<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="160" font-family='helvetica neue'>` + childCount + `</text>`
        + svgGauge
        + `</svg>`,
      className: 'my-cluster-class',
      iconSize: [size, size],
      popupAnchor: [0, 0]
    });
  }
  // tslint:enable:max-line-length
}
