/*
* Software Name : IotMapManager
* Version: 1.0.0
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

import * as L from 'leaflet'
import { IotMapManagerConfig } from './iot-map-manager-config'
import { IotUserMarker } from './iot-map-manager-types'
import { IotMapCommonSvg } from './iot-map-common-svg'

/* eslint-disable quotes */
export class IotMapUserMarker {
  private config: IotMapManagerConfig = IotMapManagerConfig.getConfig()

  public getUserMarkerIcon (userMarker: IotUserMarker): L.DivIcon {
    const userSvg = IotMapCommonSvg.user

    // shadow file
    const shadowFile = './assets/img/' + userSvg.shadow
    const imgShadow = `<img class='usermarkershadow' src='${shadowFile}'/>`

    let html = `<div class='usermarkericon'>`
    if (userMarker.direction !== undefined) {
      html += `<svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 22 22'>${userSvg.border}</svg>
               <svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='-3 -3 38 38'>
                <path ${userSvg.arrow} transform='rotate(` + (userMarker.direction - 45) + ` 16 16)'/>
                </svg>`
    } else {
      html += `<svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 22 22'> ${userSvg.border} ${userSvg.inner}</svg>`
    }
    html += imgShadow

    // creating icon
    return new L.DivIcon({
      className: 'my-custom-pin',
      iconSize: L.point(22, 22), // size of the icon
      iconAnchor: L.point(11, 11), // point of the icon which will correspond to marker's location
      html: html
    })
  }
}
/* eslint-ensable quotes */
