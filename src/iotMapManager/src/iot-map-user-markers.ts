/*
* Software Name : IotMapManager
* Version: 1.0.5
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
import * as commonSvg from './iot-map-common-svg'

/* eslint-disable quotes */
const config: IotMapManagerConfig = IotMapManagerConfig.getConfig()

/**
 * Returns a DivIcon compatible with leaflet, representing all user marker information
 *
 * @param userMarker - an IotUserMarker structure containing all visual information
 * @returns a DivIcon containing design
 */
export function getUserMarkerIcon (userMarker: IotUserMarker): L.DivIcon {
  const userSvg = commonSvg.user
  const userMarkerSize = config.userMarker.size
  const arrowConfig = config.userMarker.arrow

  // shadow file
  const imgShadow = `<img class='usermarkershadow' src='./assets/img/${userSvg.shadow}'/>`

  let html = `<div class='usermarkericon'>`
  if (userMarker.direction !== undefined) {
    html += `<svg xmlns='http://www.w3.org/2000/svg'
                  width='${userMarkerSize}'
                  height='${userMarkerSize}'
                  viewBox='0 0 ${userMarkerSize} ${userMarkerSize}'>${userSvg.border}</svg>
             <svg xmlns='http://www.w3.org/2000/svg'
                  width='${userMarkerSize}'
                  height='${userMarkerSize}'
                  viewBox='-3 -3 38 38'>
              <path ${userSvg.arrow} transform='rotate(${(userMarker.direction + arrowConfig.startAngle)}
                                                       ${arrowConfig.size / 2}
                                                       ${arrowConfig.size / 2})'/>
              </svg>`
  } else {
    html += `<svg xmlns='http://www.w3.org/2000/svg'
                  width='${userMarkerSize}'
                  height='${userMarkerSize}'
                  viewBox='0 0 ${userMarkerSize} ${userMarkerSize}'> ${userSvg.border} ${userSvg.inner}</svg>`
  }
  html += imgShadow

  // creating icon
  return new L.DivIcon({
    className: 'my-custom-pin',
    iconSize: L.point(userMarkerSize, userMarkerSize), // size of the icon
    iconAnchor: L.point(userMarkerSize / 2, userMarkerSize / 2), // point of the icon which will correspond to marker's location
    html: html
  })
}
/* eslint-ensable quotes */
