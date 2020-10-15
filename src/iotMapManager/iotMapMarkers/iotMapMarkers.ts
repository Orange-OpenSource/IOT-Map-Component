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
import { iotSquareMarker } from './iotSquareMarker';
import { iotCircleMarker } from './iotCircleMarker';

export class IotMapMarkers {
  iotSquareMarker : iotSquareMarker;
  iotCircleMarker : iotCircleMarker;

  constructor() {
    this.iotSquareMarker = new iotSquareMarker();
    this.iotCircleMarker = new iotCircleMarker();
  }

  getMarker(marker){
    let html;
    if (marker.shape == 'circle') {
      html = this.iotCircleMarker.getSvg(marker)
    } else if (marker.shape == 'poi' || marker.shape == 'square') {
      html = this.iotSquareMarker.getSvg(marker)
    }

    if (marker.selected) {
      return L.divIcon({
        className: "my-custom-pin",
        iconSize:     [100, 100], // size of the icon
        iconAnchor:   [50, 100], // point of the icon which will correspond to marker's location
        html: html
      });
    } else {
      return L.divIcon({
        className: "my-custom-pin",
        iconSize:     [40, 40], // size of the icon
        iconAnchor:   [20, 40], // point of the icon which will correspond to marker's location
        html: html
      });
    }
  }
}
