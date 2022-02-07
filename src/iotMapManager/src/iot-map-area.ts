/*
* Software Name : IotMapManager
* Version: 2.6.8
* SPDX-FileCopyrightText: Copyright (c) 2020 - 2022 Orange
* SPDX-License-Identifier: MIT
*
* This software is distributed under the MIT License,
* the text of which is available at https://github.com/Orange-OpenSource/IOT-Map-Component/blob/master/LICENSE
* or see the "license.txt" file for more details.
*
* Author: S. Gateau
* Software description: provide markers, tabs, clusters and areas dedicated to iot projects using mapping
*/

import { IotMapConfig } from './iot-map-config'
import { IotArea } from './iot-map-types'
import { IotMapManager } from './iot-map-manager'
import { Polygon } from 'leaflet'

/**
 * Class IotMapArea displaying a Area
 */
export class IotMapArea extends Polygon {
  private data: IotArea
  private config: IotMapConfig
  private map: IotMapManager

  /**
   * Creates an area
   * @param area - an IotArea containing information to display a area
   * @param map - the map the area will be displayed on
   * @param config - the config to use to display the area
   */
  constructor (area: IotArea, map: IotMapManager, config: IotMapConfig) {
    super(area.points,
      {
        color: area.color ?? config.area.color,
        fillColor: area.fillColor ?? config.area.fillColor,
        fillOpacity: area.fillOpacity ?? config.area.fillOpacity,
        weight: 3,
        smoothFactor: 1,
        interactive: false
      })

    this.data = area
    this.config = config
    this.map = map
  }
}
