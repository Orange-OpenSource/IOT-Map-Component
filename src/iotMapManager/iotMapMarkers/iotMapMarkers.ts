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
import { IotSquareMarker } from './iotSquareMarker';
import { IotCircleMarker } from './iotCircleMarker';
import * as config from '../iotMapManager.json';

export class IotMapMarkers {
  iotSquareMarker: IotSquareMarker;
  iotCircleMarker: IotCircleMarker;

  constructor() {
    this.iotSquareMarker = new IotSquareMarker();
    this.iotCircleMarker = new IotCircleMarker();
  }

  getMarker(marker, selected = false) {
    let html = '';

    // default values
    if (!marker.shape) {
      marker.shape = config.markers.default;
    }

    // only anchored markers can be selected
    if (!marker.shape.anchored) {
      selected = false;
    }

    if (marker.shape.shape === 'circle') {
      html = this.iotCircleMarker.getSvg(marker, selected);
    } else if (marker.shape.shape === 'poi' || marker.shape.shape === 'square') {
      html = this.iotSquareMarker.getSvg(marker, selected);
    }

    // sizing
    const size = config.markers.size;
    const iconSize: L.Point = L.point(size.fullSvgWidth, size.fullSvgHeight);

    let iconAnchor: L.Point = L.point(size.fullSvgWidth / 2, size.fullSvgHeight / 2); // by default = center
    if (marker.shape.anchored) {
      const height = (size.fullSvgHeight + ((selected) ? size.selectedSvgHeight : size.unselectedSvgHeight)) / 2 + size.anchorHeight;
      iconAnchor = L.point(size.fullSvgWidth / 2, height);
    }

    const popupAnchor: L.Point = (selected)
            ? L.point(0, - (size.selectedSvgHeight + size.anchorHeight))    // from anchor point
            : L.point(0, - (size.unselectedSvgHeight / 2));   // from center point

    // creating icon
    return L.divIcon({
        className: 'my-custom-pin',
        iconSize:     iconSize, // size of the icon
        iconAnchor:   iconAnchor, // point of the icon which will correspond to marker's location
        popupAnchor:  popupAnchor,
        html: html
      });
  }
}
