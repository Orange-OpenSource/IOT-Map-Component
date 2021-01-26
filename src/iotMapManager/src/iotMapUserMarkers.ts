/*
* Software Name : IotMapManager
* Version: 0.5.6
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
import {IotMapManagerConfig} from './iotMapManagerConfig';
import {IotUserMarker} from './iotMapManagerTypes';
import {IotMapCommonSvg} from './iotMapCommonSvg';


export class IotMapUserMarker {
  private config: IotMapManagerConfig = IotMapManagerConfig.getConfig();

  public getUserMarkerIcon(userMarker: IotUserMarker): L.DivIcon {
    const userSvg = IotMapCommonSvg.user;

    // todo: shadow file
    // const shadowFile = './assets/img/';
    // const imgShadow = `<img class='shadowSelected' src='` + shadowFile + `'/>`;

    let html = `<div class='markericon usermarkericon'>`;
    if (userMarker.direction !== undefined) {
      html = html
        + `<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'>`
        + userSvg.border
        + `</svg>`
        + `<svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                              width="80"
                              height="80"
                              viewBox="-10 -10 42 42">`
        + userSvg.arrow + `transform='rotate(` + (userMarker.direction - 45) + ` 16 16)'/>`
        + `</svg>`;
    } else {
      html = html
        + `<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'>`
        + userSvg.border + userSvg.inner
        + `</svg>`;
    }
    const size = this.config.userMarker.size;

    // creating icon
    return new L.DivIcon({
      className: 'my-custom-pin',
      iconSize:     L.point(size.fullSvgWidth, size.fullSvgHeight), // size of the icon
      iconAnchor:   L.point(size.fullSvgWidth / 2, size.fullSvgHeight / 2), // point of the icon which will correspond to marker's location
      html: html
    });
  }
}
