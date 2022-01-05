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

import { IotMapConfig } from './iot-map-config'
import { IotPath, PathIconType } from './iot-map-types'
import { IotMapManager } from './iot-map-manager'
import { getPathIcon } from './iot-map-icons'

import { Polyline as leafletPolyline, Marker, marker } from 'leaflet'
import 'leaflet-polylineoffset'
declare const L: any // eslint-disable-line @typescript-eslint/no-explicit-any

/**
 * Class IotMapPath displaying a path, with start, stop and mid points and with sub paths
 */
export class IotMapPath extends leafletPolyline {
  private data: IotPath
  private config: IotMapConfig
  private map: IotMapManager
  private start: Marker
  private end: Marker
  private mids: Marker[] = []
  private additionalPaths: leafletPolyline[] = []

  /**
   * Creates a path
   * @param path - an IotPath containing information to display a path
   * @param map - the map the path will be displayed on
   * @param config - the config to use to display the path
   */
  constructor (path: IotPath, map: IotMapManager, config: IotMapConfig) {
    super(path.points,
      {
        color: path.color ?? config.path.color,
        weight: config.path.width,
        smoothFactor: 1,
        interactive: false
      })

    this.data = path
    this.config = config
    this.map = map
  }

  /**
   * returns a L.marker displayed on the start point of the path
   */
  public getStart (): Marker {
    this.start?.remove()
    this.start = marker(this.data.points[0], { icon: getPathIcon(PathIconType.start, this.config), interactive: false })
    return this.start
  }

  /**
   * returns a L.marker displayed on the end point of the path
   */
  public getEnd (): Marker {
    this.end?.remove()
    this.end = marker(this.data.points[this.data.points.length - 1], { icon: getPathIcon(PathIconType.end, this.config), interactive: false })
    return this.end
  }

  /**
   * returns a L.marker list according to mid points defined in IotPath
   */
  public getMids (): Marker[] {
    this.mids?.forEach(pos => pos.remove())
    if (this.data.positions !== undefined) {
      this.data.positions.forEach(pos => {
        const newMarker = marker(pos, { icon: getPathIcon(PathIconType.mid, this.config), interactive: false })
        this.mids.push(newMarker)
      })
    }
    return this.mids
  }

  /**
   * returns a L.PolyLine array containing all additional paths
   */
  public getAdditionalPaths (): leafletPolyline[] {
    // TODO: à revoir
    this.additionalPaths.forEach(path => path.remove())
    // add additional paths if existing
    if (this.data.additional !== undefined) {
      this.data.additional.forEach(path => {
        const newPath = L.polyline(path.points, {
          color: path.color,
          weight: 3,
          smoothFactor: 1,
          interactive: false,
          offset: IotMapPath.getOffset(path.line)
        })
        this.additionalPaths.push(newPath)
      })
    }
    return this.additionalPaths
  }

  /**
   * remove all points (start, end and mids points) from the map
   */
  public removeAllPos (): void {
    this.start?.remove()
    this.end?.remove()
    this.mids?.forEach(pos => pos.remove())
  }

  /**
   * calculate offset according to line number
   * @param line - [1..4] line number from left to right
   */
  private static getOffset (line: number): number {
    let offset: number
    switch (line) {
      case 1:
        offset = -8
        break
      case 2:
        offset = -6
        break
      case 3:
        offset = 6
        break
      case 4:
        offset = 8
        break
      default:
        offset = 0
        break
    }
    return offset
  }
}
