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
import { IotSquareMarker } from './iotSquareMarker';
import { IotCircleMarker } from './iotCircleMarker';
import * as config from '../iotMapManager.json';

export class IotMapMarkers {
  iotSquareMarker : IotSquareMarker;
  iotCircleMarker : IotCircleMarker;

  constructor() {
    this.iotSquareMarker = new IotSquareMarker();
    this.iotCircleMarker = new IotCircleMarker();
  }

  getMarker(marker, selected = false){
    let html = '';

    // shape
    if (!marker.shape) {
      marker.shape = config.markers.default;
    }
    if (marker.shape.shape == 'circle') {
      html = this.iotCircleMarker.getSvg(marker, selected)
    } else if (marker.shape.shape == 'poi' || marker.shape.shape == 'square') {
      html = this.iotSquareMarker.getSvg(marker, selected)
    }

    // sizing
    const selectedMarkerSize = config.markers.size.selected;
    const unselectedMarkerSize = config.markers.size.unselected;

    const iconSize = (selected) ? [selectedMarkerSize.width, selectedMarkerSize.height] : [unselectedMarkerSize.width, unselectedMarkerSize.height];
    const iconAnchor : [number, number] = (selected)
      ? ((marker.shape.anchored) ? [selectedMarkerSize.width/2, selectedMarkerSize.height] : [selectedMarkerSize.width/2, selectedMarkerSize.height/2])
      : ((marker.shape.anchored) ? [unselectedMarkerSize.width/2, unselectedMarkerSize.height] : [unselectedMarkerSize.width/2, unselectedMarkerSize.height/2]);

    // creating icon
    return L.divIcon({
        className: "my-custom-pin",
        iconSize:     iconSize, // size of the icon
        iconAnchor:   iconAnchor, // point of the icon which will correspond to marker's location
        html: html
      });
  }
}
