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
* Software description: provide markers, tabs, clusters and paths dedicated to iot projects using mapping
*/

import { IotMapManager } from './iot-map-manager'
import { IotMapConfig } from './iot-map-config'
import { IotArea } from './iot-map-types'
import { IotMapArea } from './iot-map-area'

/**
 * Class IotMapPathManager manage iot paths
 */
export class IotMapAreaManager {
  map: IotMapManager
  config: IotMapConfig
  areaObjects: IotMapArea[] = []

  /**
   * Create a area manager
   * @param map - the map the area will be displayed on
   * @param config - the config to use to display area
   */
  constructor (map: IotMapManager, config: IotMapConfig) {
    this.map = map
    this.config = config
  }

  /**
   * Display a area according to 'area' information
   * @param area - Iotarea containing points and others information to display
   */
  public addArea (area: IotArea): void {
    const newArea: IotMapArea = new IotMapArea(area, this.map, this.config)
    this.map.getLayer(this.config.area.layerName).addLayer(newArea)
    this.areaObjects[area.id] = newArea
  }

  /**
   * Display a list of areas
   * @param areas - areas to display
   */
  public addAreas (areas: IotArea[]): void {
    areas.forEach(area => {
      this.addArea(area)
    })
  }

  /**
   * Remove a area from the map
   * @param id - id of the area to remove
   */
  public removeArea (id: string): void {
    const areaToRemove: IotMapArea = this.areaObjects[id]
    if (areaToRemove) {
      areaToRemove.remove()
    }
  }

  /**
   * Removes areas from the map, according to the id list
   * @param ids - list of ids of areas to remove
   */
  public removeAreas (ids: string[]): void {
    ids.forEach(id => {
      this.removeArea(id)
    })
  }
}
