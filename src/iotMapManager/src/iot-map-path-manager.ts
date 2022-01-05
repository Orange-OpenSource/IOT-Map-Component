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
import { IotPath } from './iot-map-types'
import { IotMapPath } from './iot-map-path'

/**
 * Class IotMapPathManager manage iot paths
 */
export class IotMapPathManager {
  map: IotMapManager
  config: IotMapConfig
  pathObjects: IotMapPath[] = []

  /**
   * Create a path manager
   * @param map - the map the path will be displayed on
   * @param config - the config to use to display path
   */
  constructor (map: IotMapManager, config: IotMapConfig) {
    this.map = map
    this.config = config
  }

  /**
   * Display a path according to 'path' information
   * @param path - IotPath containing points and others information to display
   */
  public addPath (path: IotPath): void {
    const newPath: IotMapPath = new IotMapPath(path, this.map, this.config)
    this.map.getLayer(this.config.path.layerName).addLayer(newPath)
    this.pathObjects[path.id] = newPath

    // additional paths
    if (path.additional !== undefined) {
      const additionalPaths = newPath.getAdditionalPaths()
      additionalPaths.forEach(addPath => {
        this.map.getLayer(this.config.path.layerName).addLayer(addPath)
      })
    }

    // draw start :
    const start = newPath.getStart()
    this.map.getLayer(this.config.path.layerName).addLayer(start)

    // draw end :
    const end = newPath.getEnd()
    this.map.getLayer(this.config.path.layerName).addLayer(end)

    // draw mids
    const mids = newPath.getMids()
    for (const marker of mids) {
      this.map.getLayer(this.config.path.layerName).addLayer(marker)
    }
  }

  /**
   * Display a list of paths
   * @param paths - paths to display
   */
  public addPaths (paths: IotPath[]): void {
    paths.forEach(path => {
      this.addPath(path)
    })
  }

  /**
   * Remove a path from the map
   * @param id - id of the path to remove
   */
  public removePath (id: string): void {
    const pathToRemove: IotMapPath = this.pathObjects[id]
    if (pathToRemove) {
      pathToRemove.removeAllPos()
      pathToRemove.remove()
    }
  }

  /**
   * Removes paths from the map, according to the id list
   * @param ids - list of ids of paths to remove
   */
  public removePaths (ids: string[]): void {
    ids.forEach(id => {
      this.removePath(id)
    })
  }
}
