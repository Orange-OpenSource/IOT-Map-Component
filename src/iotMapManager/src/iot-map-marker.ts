/*
* Software Name : IotMapManager
* Version: 2.5.1
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
}
