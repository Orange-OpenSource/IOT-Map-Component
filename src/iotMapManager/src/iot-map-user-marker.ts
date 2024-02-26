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

import * as L from 'leaflet'
import { IotMapConfig } from './iot-map-config'
import { IotMapDisplay, IotUserMarker, Location } from './iot-map-types'
import { IotMapManager } from './iot-map-manager'
import { getUserMarkerIcon } from './iot-map-icons'

export class IotMapUserMarker extends IotMapDisplay {
  private data: IotUserMarker
  private config: IotMapConfig
  private map: IotMapManager
  private accuracyCircle: L.Circle

  private layerDisplayed = false
  private accuracityDisplayed = true

  constructor (userMarker: IotUserMarker, map: IotMapManager, config: IotMapConfig) {
    super(userMarker.location, { icon: getUserMarkerIcon(userMarker, config), interactive: false }) // not clickable

    this.data = userMarker
    this.config = config
    this.map = map

    // this.map.getLayer(this.config.userMarker.layerName).addLayer(this)
    this.map.addElement(this, this.config.userMarker.layerName, this.config.userMarker.layerName)
    this.setZIndexOffset(75)
    this.displayAccuracy()
  }

  public removeUserMarker (): void {
    this.map.getLayer(this.config.userMarker.layerName).removeLayer(this)
    this.map.getLayer(this.config.accuracyCircle.layerName).removeLayer(this.accuracyCircle)
  }

  public select (selected: boolean): void { // eslint-disable-line @typescript-eslint/no-unused-vars
    throw new Error('Select is not supported by user marker')
  }

  public getData (): IotUserMarker {
    return this.data
  }

  public setData (data: IotUserMarker): void {
    this.data = data
  }

  public redraw (): void {
    this.setIcon(getUserMarkerIcon(this.data, this.config))
    this.displayAccuracy()
  }

  public setPosition (latlng: Location): void {
    const newLatLng: L.LatLng = new L.LatLng(latlng.lat, latlng.lng)
    super.setLatLng(newLatLng)
    this.accuracyCircle.setLatLng(newLatLng)
  }

  public updateAccuracyDisplay (selectedLayers: string[], display: boolean): void {
    this.layerDisplayed = selectedLayers.includes(this.config.userMarker.layerName)
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
      if (this.data.accuracy !== undefined) {
        this.accuracyCircle = L.circle(this.data.location, {
          color: this.config.accuracyCircle.color,
          fillColor: this.config.accuracyCircle.fillColor,
          fillOpacity: this.config.accuracyCircle.fillOpacity,
          radius: this.data.accuracy,
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
