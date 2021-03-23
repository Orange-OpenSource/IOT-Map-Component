/*
* Software Name : IotMapManager
* Version: 2.0.0
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
import { IotMapConfig } from './iot-map-config'
import { IotPath, PathIconType } from './iot-map-types'
import { IotMapManager } from './iot-map-manager'
import { getPathIcon } from './iot-map-icons'

/**
 * Class IotMapPath displaying a path, with start, stop and mid points and with sub paths
 */
export class IotMapPath extends L.Polyline {
  private data: IotPath
  private config: IotMapConfig
  private map: IotMapManager
  private start: L.Marker
  private end: L.Marker
  private mids: L.Marker[] = []

  /**
   * Creates a path
   * @param path - an IotPath containing information to display a path
   * @param map - the map the path will be displayed on
   * @param config - the config to use to display the path
   */
  constructor (path: IotPath, map: IotMapManager, config: IotMapConfig) {
    super(path.points, { color: '#527EDB', weight: 8, smoothFactor: 1, interactive: false })

    this.data = path
    this.config = config
    this.map = map
  }

  /**
   * returns a L.marker displayed on the start point of the path
   */
  public getStart (): L.Marker {
    this.start?.remove()
    this.start = L.marker(this.data.points[0], { icon: getPathIcon(PathIconType.start, this.config), interactive: false })
    return this.start
  }

  /**
   * returns a L.marker displayed on the end point of the path
   */
  public getEnd (): L.Marker {
    this.end?.remove()
    this.end = L.marker(this.data.points[this.data.points.length - 1], { icon: getPathIcon(PathIconType.end, this.config), interactive: false })
    return this.end
  }

  /**
   * returns a L.marker list according to mid points defined in IotPath
   */
  public getMids (): L.Marker[] {
    this.mids?.forEach(pos => pos.remove())
    if (this.data.positions !== undefined) {
      this.data.positions.forEach(pos => {
        const newMarker = L.marker(pos, { icon: getPathIcon(PathIconType.mid, this.config), interactive: false })
        this.mids.push(newMarker)
      })
    }
    return this.mids
  }

  /**
   * remove all points (start, end and mids points) from the map
   */
  public removeAllPos (): void {
    this.start?.remove()
    this.end?.remove()
    this.mids?.forEach(pos => pos.remove())
  }
}
