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

import { IotMapManager } from './iot-map-manager'
import { IotUserMarker } from './iot-map-types'
import { IotMapUserMarker } from './iot-map-user-marker'
import { IotMapConfig } from './iot-map-config'

export class IotMapUserMarkerManager {
  userMarkerObject : IotMapUserMarker
  config: IotMapConfig
  map: IotMapManager

  constructor (map: IotMapManager, config: IotMapConfig) {
    this.map = map
    this.config = config
  }

  /**
   * Insert user marker in the map
   *
   * @param userMarker - an IotUserMarker containing all display info
   */
  public addUserMarker (userMarker: IotUserMarker): void {
    if (userMarker.location) {
      if (this.userMarkerObject != null) {
        this.userMarkerObject.removeUserMarker()
      }
      this.userMarkerObject = new IotMapUserMarker(userMarker, this.map, this.config)
    } else {
      console.log('No location defined for userMarker. Unable to display')
    }
  }

  /**
   * Remove a user marker from the map
   *
   * @remarks there is no param as only one user marker can be displayed at a time
   */
  public removeUserMarker (): void {
    this.userMarkerObject.removeUserMarker()
  }

  /**
   * Update user marker with new display parameters
   *
   * @param params - a structure containing partial display information to update
   */
  public updateUserMarker (params: Partial<IotUserMarker>): void {
    if (this.userMarkerObject !== null) {
      let htmlModificationNeeded = false
      const userMarkerInfo = this.userMarkerObject.getData()
      if (params.location !== undefined) {
        userMarkerInfo.location = params.location
        this.userMarkerObject.setPosition(userMarkerInfo.location)
      }

      if (params.direction !== undefined) {
        htmlModificationNeeded = true
        if (params.direction === null) { // cmd to remove arrow
          userMarkerInfo.direction = undefined
        } else {
          userMarkerInfo.direction = params.direction
        }
      }
      if (params.accuracy !== undefined) {
        htmlModificationNeeded = true
        if (params.accuracy === null) { // cmd to remove arrow
          userMarkerInfo.accuracy = undefined
        } else {
          userMarkerInfo.accuracy = params.accuracy
        }
      }

      // update icon
      if (htmlModificationNeeded) {
        this.userMarkerObject.redraw()
      }
    } else {
      const userMarker: IotUserMarker = {
        location: params.location,
        direction: params.direction,
        accuracy: params.accuracy
      }
      this.addUserMarker(userMarker)
    }
  }

  /**
   * Returns the user marker object
   */
  public getUserMarker (): IotMapUserMarker {
    return this.userMarkerObject
  }
}
