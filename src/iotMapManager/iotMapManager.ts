/*
* Software Name : IotMapManager
* Version: 0.1.2
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
import { IotMapMarkers } from './iotMapMarkers/iotMapMarkers';
import * as config from './iotMapManager.json';

export class IotMapManager {
  map: any;
  iotMapMarkers: IotMapMarkers;
  markersObjects: any = {};

  baseLayers: { Satellite: any; Standard: any };
  markersLayer: any = {};

  selectedMarkerId: string = '';


  constructor() {
    this.iotMapMarkers = new IotMapMarkers();
    this.markersLayer = new L.FeatureGroup();
  }

  init(selector) {
    // init map
    this.map = L.map(selector).setView(config.map.DEFAULT_COORDINATES, config.map.DEFAULT_ZOOM_LEVEL);

    // init base layers
    const defaultLayer = L.tileLayer(config.map.openStreetMapLayer, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    const geoportailLayer = L.tileLayer(config.map.geoportailLayer, {
      attribution: '<a target="_blank" href="https://www.geoportail.gouv.fr/">Geoportail France</a>',
      apikey: 'choisirgeoportail',
      format: 'image/jpeg',
      style: 'normal'
    }); // .addTo(this.map);

    this.baseLayers = {
      Standard: defaultLayer,
      Satellite: geoportailLayer
    };

    // init markers layer
    this.markersLayer.addTo(this.map);
    const instance = this;

    // manage events on markers
    this.markersLayer.on('click', function(event) {
      const markerObject = instance.markersObjects[event.layer.markerInfo.id];

      // select / unselect marker
      let html = '';
      // already selected => unselect it
      if (instance.selectedMarkerId == markerObject.markerInfo.id) {
        // update selected id
        instance.selectedMarkerId = '';

        // get new html and update marker (=> unselect marker)
        html = instance.iotMapMarkers.getMarker(markerObject.markerInfo, false);
        markerObject.setIcon(html);
      } else {  // new marker selected
        // --- unselect last selected marker ---
        if (instance.selectedMarkerId != '') {  // a marker was already selected
          const lastSelectedMarker = instance.markersObjects[instance.selectedMarkerId];

          // get new html and update marker (=> unselect marker)
          html = instance.iotMapMarkers.getMarker(lastSelectedMarker.markerInfo, false);
          lastSelectedMarker.setIcon(html);
        }

        // --- select new marker ---
        // update selected id
        instance.selectedMarkerId = markerObject.markerInfo.id;

        // get new html and update marker (=> select marker)
        html = instance.iotMapMarkers.getMarker(markerObject.markerInfo, true);
        markerObject.setIcon(html);
      }
    });
  }

  addMarker(marker: any) {
    if (marker.id && marker.location) {
      const newMarker = L.marker(marker.location, {icon: this.iotMapMarkers.getMarker(marker)});
      newMarker.markerInfo = marker;
      newMarker.addTo(this.markersLayer);

      this.markersObjects[marker.id] = newMarker;
    }
  }

  addMarkers(markerList: any) {
    markerList.forEach(marker => {
       this.addMarker(marker);
    });
  }

  removeMarker(markerId: string) {
    if (this.markersObjects[markerId]) {
      this.markersObjects[markerId].remove();
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
    const currentMarkerIsSelected = (this.selectedMarkerId == currentMarkerInfos.id);

    let htmlModificationNeeded = false;

    if (currentMarkerObject) {
      // location modified
      if (params.location) {
        currentMarkerInfos.location = params.location;

        const newLatLng = new L.LatLng(params.location[0], params.location[1]);
        currentMarkerObject.setLatLng(newLatLng);
      }

      // shape modified
      if (params.shape) {
        if (params.shape.shape != null) {
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
        if (params.inner.color){
          currentMarkerInfos.inner.color = params.inner.color;
        }
        if (params.inner.icon){
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
    }
  }
}
