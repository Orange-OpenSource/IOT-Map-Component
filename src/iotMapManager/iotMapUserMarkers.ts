/*
* Software Name : IotMapManager
* Version: 0.3.1
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
  config: IotMapManagerConfig = IotMapManagerConfig.getConfig();

  getMarker(userMarker: IotUserMarker): L.divIcon {
    const userSvg = IotMapCommonSvg.user;
    let svgInner: string;

    // todo: inner arrow
    if (userMarker.direction !== undefined) {
      svgInner = userSvg.arrow;
    } else {
      svgInner = userSvg.inner;
    }

    //const imgIcon = `<img class='arrow' src='/assets/icons/geolocation.svg' />`;

    // todo: shadow file
    // const shadowFile = '/assets/img/';
    // const imgShadow = `<img class='shadowSelected' src='` + shadowFile + `'/>`;

    const html = `<div class='container'>`
        // + imgShadow
        + `<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'>`
        + userSvg.border + svgInner
        + `</svg>`

        /*+ `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="-10 -10 42 42">`
        + svgInnerArrow
        + `</svg>`*/
      //+ imgIcon
      + `</div>`;

    const size = this.config.userMarker.size;

    // creating icon
    return L.divIcon({
      className: 'my-custom-pin',
      iconSize:     L.point(size.fullSvgWidth, size.fullSvgHeight), // size of the icon
      iconAnchor:   L.point(size.fullSvgWidth / 2, size.fullSvgHeight / 2), // point of the icon which will correspond to marker's location
      html: html
    });
  }
}
