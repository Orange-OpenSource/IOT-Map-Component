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

import { IotCluster, IotMapDisplay } from './iot-map-types'
import { IotMapConfig } from './iot-map-config'
import { getManualClusterIcon } from './iot-map-icons'
import { IotMapManager } from './iot-map-manager'

/**
 * Class IotMapCluster to display a manual cluster
 */
export class IotMapCluster extends IotMapDisplay {
  private data: IotCluster
  private map: IotMapManager
  readonly config: IotMapConfig
  private selected = false

  /**
   * Constructor for manual cluster
   * @param cluster - Structure containing all cluster information
   * @param config - configuration to use to display cluster
   */
  constructor (cluster: IotCluster, map: IotMapManager, config: IotMapConfig) {
    super(cluster.location, { icon: getManualClusterIcon(cluster, config) })
    this.data = cluster
    this.id = this.data.id
    this.map = map
    this.config = config
    this.data.layer = this.data.layer ?? 'default'

    this.map.addElement(this, this.data.layer, this.data.id)
  }

  /**
   * Removes the current cluster from the map
   */
  public removeCluster (): void {
    this.map.removeElement(this, this.data.layer)
  }

  /**
   * Select / unselect cluster, according to parameter
   * @param selected - if true, cluster must be displayed as selected
   * @remarks a selected cluster has a popup displayed and tab (optional) is hidden
   */
  public select (selected: boolean): void {
    this.selected = selected
    this.setIcon(getManualClusterIcon(this.data, this.config))
    this.setZIndexOffset((selected) ? 100 : 0)
  }

  /**
   * @returns structure containing all cluster information
   */
  public getData (): IotCluster {
    return this.data
  }

  /**
   * Store structure containing all cluster information
   * @param data - structure containing all manual cluster information
   */
  public setData (data: IotCluster): void {
    this.data = data
  }

  /**
   * Force cluster redrawing
   */
  public redraw (): void {
    this.setIcon(getManualClusterIcon(this.data, this.config))
  }

  /**
   * zoom in and center the map on cluster clicked
   * This will change map bounds, and can make cluster opening
   */
  public elementClicked (): void {
    const markersArea = this.getData().markersArea
    if (markersArea !== undefined) {
      this.map.getIotMap().flyToBounds([[markersArea.getSouth(), markersArea.getWest()], [markersArea.getNorth(), markersArea.getEast()]])
    } else {
      const zoomLevel = this.map.getIotMap().getZoom()
      this.map.getIotMap().flyTo(this.getData().location, (zoomLevel !== 18 ? zoomLevel + 1 : 18))
    }
  }
}
