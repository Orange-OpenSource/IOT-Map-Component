/*
* Software Name : IotMapManager
* Version: 0.1.1
* SPDX-FileCopyrightText: Copyright (c) 2020 Orange Business Services
* SPDX-License-Identifier: MIT
*
* This software is distributed under the MIT License,
* the text of which is available at <license-url>
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
  iotMapMarkers : IotMapMarkers;

  baseLayers: { Satellite: any; Standard: any };
  markersObject : any = {};

  constructor() {
    this.iotMapMarkers = new IotMapMarkers();
  }

  init(selector) {
    this.map = L.map(selector).setView(config.map.DEFAULT_COORDINATES, config.map.DEFAULT_ZOOM_LEVEL);

    const defaultLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    const geoportailLayer = L.tileLayer('https://wxs.ign.fr/{apikey}/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}', {
      attribution: '<a target="_blank" href="https://www.geoportail.gouv.fr/">Geoportail France</a>',
      apikey: 'choisirgeoportail',
      format: 'image/jpeg',
      style: 'normal'
    });//.addTo(this.map);

    this.baseLayers = {
      Standard: defaultLayer,
      Satellite: geoportailLayer
    }
  };

  getMarker(markerId: string) {
    return this.markersObject[markerId];
  }


  addMarker(marker: any) {
    let newMarker = L.marker(marker.position, {icon: this.iotMapMarkers.getMarker(marker)});
    newMarker.addTo(this.map);
    this.markersObject[marker.id] = newMarker;
  }

  addMarkers(markerList: any) {
    markerList.forEach(marker => {
       this.addMarker(marker);
    });
  }

  removeMarker (markerId: string){
    if (this.markersObject[markerId])
      this.markersObject[markerId].remove();
  }

  removeMarkers(markersId: string[]) {
    markersId.forEach(id => {
      this.removeMarker(id);
    })
  }

  updateMarker(marker: any) {
    if(this.markersObject[marker.id]) {
      this.removeMarker(marker.id);
      this.addMarker(marker);
    }
  }
}
