/*
* Software Name : IotMapManager
* Version: 0.0.6
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
import { IotMapManager } from './iot-map-manager'
import { IotMarker } from './iot-map-types'
import { IotMapMarker } from './iot-map-marker'

export class IotMapMarkerManager {
  markersObjects: IotMapMarker[] = [] // eslint-disable-line @typescript-eslint/no-explicit-any
  accuracyObjects: any = {} // eslint-disable-line @typescript-eslint/no-explicit-any
  config: IotMapConfig
  map: IotMapManager

  constructor (map: IotMapManager, config: IotMapConfig) {
    this.map = map
    this.config = config
  }

  /**
   * Insert marker in the map
   *
   * @param marker - an IotMarker containing all display info
   */
  public addMarker (marker: IotMarker): void {
    if (marker.id && marker.location) {
      // does id already exist ?
      if (this.markersObjects && this.markersObjects[marker.id] !== undefined && this.markersObjects[marker.id] !== null) {
        this.updateMarker(marker.id, marker)
      } else {
        const newMarker: IotMapMarker = new IotMapMarker(marker, this.map, this.config)
        marker.layer = marker.layer ?? 'default'
        this.map.addElement(newMarker, marker.layer, marker.id)
        this.markersObjects[marker.id] = newMarker
      }
    } else {
      console.log('No id and/or no location defined for new marker. Unable to display')
    }
  }

  /**
   * Insert a list of markers in the map
   *
   * @param markerList - list of IotMarker containing all display info for each marker
   */
  public addMarkers (markerList: IotMarker[]): void {
    markerList.forEach(marker => {
      this.addMarker(marker)
    })
  }

  /**
   * Remove a marker from the map
   *
   * @param markerId - the id of the marker to remove
   */
  public removeMarker (markerId: string): void {
    const markerToRemove: IotMapMarker = this.markersObjects[markerId]
    if (markerToRemove) {
      markerToRemove.removeMarker()
    }
  }

  /**
   * Remove a list of markers from the map
   *
   * @param markersId - the id list of markers to remove
   */
  public removeMarkers (markersId: string[]): void {
    markersId.forEach(id => {
      this.removeMarker(id)
    })
  }

  /**
   * Update a marker with new display parameters
   *
   * @param markersId - the id of the marker to update
   * @param params - a structure containing partial display information to update
   */
  public updateMarker (markerId: string, params: Partial<IotMarker>): void {
    const currentMarkerObject: IotMapMarker = this.markersObjects[markerId]

    if (currentMarkerObject) {
      const currentMarkerInfos: IotMarker = currentMarkerObject.getData()

      let htmlModificationNeeded = false
      let oldLayerName: string = null

      // location modified
      if (params.location) {
        currentMarkerInfos.location = params.location

        const newLatLng: L.LatLng = new L.LatLng(params.location.lat, params.location.lng)
        currentMarkerObject.setLatLng(newLatLng)

        // update accuracy circle
        const currentAccuracyCircle: L.Circle = this.accuracyObjects[markerId]
        if (currentAccuracyCircle !== undefined) {
          currentAccuracyCircle.setLatLng(newLatLng)
        }
      }

      // popup modified
      if (params.popup !== undefined) {
        if (params.popup.title === null && params.popup.body === null) { // cmd to remove popup
          currentMarkerInfos.popup = undefined
        } else {
          currentMarkerInfos.popup = {
            title: params.popup.title ?? currentMarkerInfos.popup?.title,
            body: params.popup.body ?? currentMarkerInfos.popup?.body
          }
        }
        htmlModificationNeeded = true
      }

      // tab modified
      if (params.tab !== undefined) {
        if (params.tab.content === null) { // cmd to remove tab
          currentMarkerInfos.tab = undefined
        } else {
          currentMarkerInfos.tab = {
            content: params.tab.content,
            type: params.tab.type ?? currentMarkerInfos.tab?.type
          }
        }
        htmlModificationNeeded = true
      }

      // shape modified
      if (params.shape !== undefined) {
        currentMarkerInfos.shape.type = params.shape.type ?? currentMarkerInfos.shape.type
        currentMarkerInfos.shape.anchored = params.shape.anchored ?? currentMarkerInfos.shape.anchored
        currentMarkerInfos.shape.plain = params.shape.plain ?? currentMarkerInfos.shape.plain
        currentMarkerInfos.shape.color = params.shape.color ?? currentMarkerInfos.shape.color
        currentMarkerInfos.shape.percent = params.shape.percent ?? currentMarkerInfos.shape.percent
        if (params.shape.accuracy === null) {
          currentMarkerInfos.shape.accuracy = undefined
        } else {
          currentMarkerInfos.shape.accuracy = params.shape.accuracy ?? currentMarkerInfos.shape.accuracy
        }
        htmlModificationNeeded = true
      }

      // layer modified
      if (params.layer !== undefined) {
        oldLayerName = currentMarkerInfos.layer
        currentMarkerInfos.layer = params.layer
      }

      // inner modified
      if (params.inner !== undefined) {
        currentMarkerInfos.inner = {
          color: params.inner?.color ?? currentMarkerInfos.inner?.color ?? this.config.markers.default.inner.color,
          icon: params.inner?.icon ?? currentMarkerInfos.inner?.icon,
          label: (params.inner?.icon === undefined) ? (params.inner?.label ?? currentMarkerInfos.inner?.label) : undefined
        }
        htmlModificationNeeded = true
      }

      // status modified
      if (params.status !== undefined) {
        currentMarkerInfos.status = params.status
        htmlModificationNeeded = true
      }

      // template modified
      if (params.template !== undefined) {
        currentMarkerInfos.template = params.template
        htmlModificationNeeded = true
      }

      // update marker icon
      if (htmlModificationNeeded) {
        currentMarkerObject.redraw()
      }

      if (oldLayerName != null) {
        // remove marker from previous layer
        this.map.getLayer(oldLayerName).removeLayer(currentMarkerObject)
        // add marker to new layer
        this.map.getLayer(currentMarkerInfos.layer).addLayer(currentMarkerObject)
      }
    }
  }

  /**
   * Update all markers with new display parameters
   *
   * @param markerList - the list of markers to display
   * @remarks the marker list is exhaustive: if a marker is not previously displayed but appears in markerList, it will
   * be added / if a marker is previously displayed but doesn't appear in markerList, it will be removed / if a marker
   * is previously displayed and appears in markerList, it will be updated
   */
  public updateAllMarkers (markerList: IotMarker[]): void {
    // first : remove unused markers
    // create id list from new marker list
    const markersToUpdate: string[] = []
    for (const marker of markerList) {
      markersToUpdate.push(marker.id)
    }

    for (const markerId in this.markersObjects) {
      if (!markersToUpdate.includes(markerId)) {
        this.removeMarker(markerId)
      }
    }

    // Now update / create new markers
    for (const marker of markerList) {
      if (this.markersObjects[marker.id] === undefined) {
        this.addMarker(marker)
      } else {
        this.updateMarker(marker.id, marker)
      }
    }
  }

  /**
   * Returns a leaflet element defined by its id
   * @param id - Id of the element to return
   *
   * @remarks id is unique
   */
  public getMarker (id: string): IotMapMarker {
    return this.markersObjects[id]
  }

  /**
   * Returns all leaflet elements (markers and clusters)
   */
  public getAllMarkers (): IotMapMarker[] {
    return this.markersObjects
  }

  /**
   * Force all markers to redraw
   */
  public redrawAll (): void {
    for (const elt of this.markersObjects) {
      elt.redraw()
    }
  }
}
