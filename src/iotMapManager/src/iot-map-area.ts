/*
* Software Name : Iot Map Component
* SPDX-FileCopyrightText: Copyright (c) Orange SA
* SPDX-License-Identifier: MIT
*
* This software is distributed under the MIT license,
* the text of which is available at https://opensource.org/license/MIT/
* or see the "LICENSE" file for more details.
*
* Software description: web library for interactive maps providing Orange branded reusable markers, tabs, clusters and paths
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
