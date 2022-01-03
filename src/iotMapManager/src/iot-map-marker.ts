/*
* Software Name : IotMapManager
* Version: 2.6.6
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
import { IotMapDisplay, IotMarker } from './iot-map-types'
import { IotMapConfig } from './iot-map-config'
import { IotMapManager } from './iot-map-manager'
import { getMarkerIcon } from './iot-map-icons'

/**
 *
 */
export class IotMapMarker extends IotMapDisplay {
  private data: IotMarker
  private config: IotMapConfig
  private map: IotMapManager
  private selected = false
  private layerDisplayed = false
  private accuracityDisplayed = true

  private accuracyCircle: L.Circle

  constructor (marker: IotMarker, map: IotMapManager, config: IotMapConfig) {
    super(marker.location, { icon: getMarkerIcon(marker, config) })
    this.data = marker
    this.id = this.data.id
    this.config = config
    this.map = map
    this.data.layer = this.data.layer ?? 'default'
    this.map.addElement(this, this.data.layer, this.data.id)
    this.displayAccuracy()
  }

  public removeMarker () : void {
    this.removeAccuracy()
    this.map.removeElement(this, this.data.layer)
  }

  public select (selected: boolean): void {
    this.selected = selected
    this.setIcon(getMarkerIcon(this.data, this.config, selected))
    this.setZIndexOffset((selected) ? 100 : 0)

    // if (this.selected && this.data.popup !== undefined) {
    //   // move map if marker is too close to the edge
    //   this.shiftMap()
    // }
  }

  public getData (): IotMarker {
    return this.data
  }

  public setData (data: IotMarker): void {
    this.data = data
  }

  public redraw (): void {
    this.setIcon(getMarkerIcon(this.data, this.config, this.selected))
    this.displayAccuracy()
  }

  public reactAfterZoom (): void {
    if (this.map.getIotMap().hasLayer(this)) { // marker is unclustered
      this.displayAccuracy()
    } else { // marker is clustered
      this.removeAccuracy()
    }
  }

  public updateAccuracyDisplay (selectedLayers: string[], display: boolean): void {
    this.layerDisplayed = selectedLayers.includes(this.data.layer)
    this.accuracityDisplayed = display
    if (this.layerDisplayed) {
      if (this.accuracityDisplayed) {
        this.displayAccuracy()
      } else {
        this.removeAccuracy()
      }
    } else {
      this.removeAccuracy()
    }
  }

  private displayAccuracy (): void {
    this.removeAccuracy()
    if (this.layerDisplayed && this.accuracityDisplayed) {
      if (this.data.shape.accuracy !== undefined) {
        this.accuracyCircle = L.circle(this.data.location, {
          color: this.config.accuracyCircle.color,
          fillColor: this.config.accuracyCircle.fillColor,
          fillOpacity: this.config.accuracyCircle.fillOpacity,
          radius: this.data.shape.accuracy,
          interactive: false // not clickable
        })
        this.map.getLayer(this.config.accuracyCircle.layerName).addLayer(this.accuracyCircle)
      }
    }
  }

  private removeAccuracy (): void {
    if (this.accuracyCircle) {
      this.map.getLayer(this.config.accuracyCircle.layerName).removeLayer(this.accuracyCircle)
    }
  }

  private rotateFrom (origin: L.Point, theta: number, pivot: L.Point): L.Point {
    if (!theta) { return origin; }
    // Rotate around (pivot.x, pivot.y) by:
    // 1. subtract (pivot.x, pivot.y)
    // 2. rotate around (0, 0)
    // 3. add (pivot.x, pivot.y) back
    // same as `this.subtract(pivot).rotate(theta).add(pivot)`
    const sinTheta = Math.sin(theta);
    const cosTheta = Math.cos(theta);
    const cx = pivot.x
    const cy = pivot.y;
    const x = origin.x - cx
    const y = origin.y - cy;

    return new L.Point(
      x * cosTheta - y * sinTheta + cx,
      x * sinTheta + y * cosTheta + cy
    )
  }

  public shiftMap (): void {
    if (this.selected && this.data.popup !== undefined) {
      const eltPos: L.Point = this.map.getIotMap().latLngToLayerPoint(this.data.location)

      const mapBounds = this.map.getIotMap().getBounds()
      const northEastPos = this.map.getIotMap().latLngToLayerPoint(mapBounds.getNorthEast())
      const southWestPos = this.map.getIotMap().latLngToLayerPoint(mapBounds.getSouthWest())

      // top
      // if (eltPos.y - northEastPos.y < 200) {
      //   const shift = 200 - (eltPos.y - northEastPos.y)
      //   northEastPos.y -= shift
      //   southWestPos.y -= shift
      // }
      //
      // // left
      // if (eltPos.x - southWestPos.x < 150) {
      //   const shift = 150 - (eltPos.x - southWestPos.x)
      //   northEastPos.x -= shift
      //   southWestPos.x -= shift
      // }
      //
      // // bottom - no need to shift
      // // right
      // if (northEastPos.x - eltPos.x < 150) {
      //   const shift = 150 - (northEastPos.x - eltPos.x)
      //   northEastPos.x += shift
      //   southWestPos.x += shift
      // }

      const newMapBounds = L.latLngBounds(this.map.getIotMap().layerPointToLatLng(southWestPos), this.map.getIotMap().layerPointToLatLng(northEastPos))
      // this.map.getIotMap().flyToBounds(newMapBounds)
      this.map.getIotMap().fitBounds(this.map.getIotMap().getBounds())

      // console.log('mapBounds : ' + mapBounds)
      // this.map.getIotMap().setMaxBounds(this.map.getIotMap().getBounds())
    }
  }
}
