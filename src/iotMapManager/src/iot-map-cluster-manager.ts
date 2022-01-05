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

import * as L from 'leaflet'
import { IotMapConfig } from './iot-map-config'
import { IotCluster } from './iot-map-types'
import { IotMapCluster } from './iot-map-cluster'
import { IotMapManager } from './iot-map-manager'

/**
 *  Class IotMapClusterManager to manage manual clusters
 */
export class IotMapClusterManager {
  clustersObjects: IotMapCluster[] = [] // eslint-disable-line @typescript-eslint/no-explicit-any
  config: IotMapConfig
  map: IotMapManager

  /**
   * Constructor of manual cluster manager
   * @param map - map manager to display in
   * @param config - config to use to display manual cluster
   */
  constructor (map: IotMapManager, config: IotMapConfig) {
    this.map = map
    this.config = config
  }

  /**
   * Insert manual cluster in the map
   * @param cluster - structure containing all cluster information
   */
  public addCluster (cluster: IotCluster): void {
    if (this.config.map.externalClustering) {
      if (cluster.id && cluster.location) {
        if (this.clustersObjects[cluster.id] !== undefined && this.clustersObjects[cluster.id] !== null) {
          this.updateCluster(cluster.id, cluster)
        } else {
          const newCluster: IotMapCluster = new IotMapCluster(cluster, this.map, this.config)
          this.clustersObjects[cluster.id] = newCluster
        }
      } else {
        console.log('No id and/or no location defined for new cluster. Unable to display')
      }
    }
  }

  /**
   * Insert a list of manual clusters in the map
   * @param clusterList - list of structures containing manual clusters information
   */
  public addClusters (clusterList: IotCluster[]): void {
    if (this.config.map.externalClustering) {
      for (const cluster of clusterList) {
        this.addCluster(cluster)
      }
    }
  }

  /**
   * Remove a manual cluster from the map
   * @param clusterId - id of the cluster to remove
   */
  public removeCluster (clusterId: string): void {
    if (this.config.map.externalClustering) {
      const clusterToRemove: IotMapCluster = this.clustersObjects[clusterId]
      if (clusterToRemove) {
        clusterToRemove.removeCluster()
        delete this.clustersObjects[clusterId]
      }
    }
  }

  /**
   * Remove a list of manual clusters from the map
   * @param clustersId - list of ids of manual clusters to remove
   */
  public removeClusters (clustersId: string[]): void {
    if (this.config.map.externalClustering) {
      for (const id of clustersId) {
        this.removeCluster(id)
      }
    }
  }

  /**
   * Update a manual cluster with new display parameters
   * @param clusterId - id of the cluster to update
   * @param params - structure containing cluster information to update
   */
  public updateCluster (clusterId: string, params: Partial<IotCluster>): void {
    if (this.config.map.externalClustering) {
      const currentClusterObject: IotMapCluster = this.clustersObjects[clusterId]

      if (currentClusterObject) {
        const currentClusterInfos: IotCluster = currentClusterObject.getData()

        let htmlModificationNeeded = false
        let oldLayerName: string = null

        // location modified
        if (params.location !== undefined) {
          currentClusterInfos.location = params.location

          const newLatLng: L.LatLng = new L.LatLng(params.location.lat, params.location.lng)
          currentClusterObject.setLatLng(newLatLng)
        }

        // childcount modified
        if (params.childCount !== undefined) {
          currentClusterInfos.childCount = params.childCount
          htmlModificationNeeded = true
        }

        // layer modified
        if (params.layer !== undefined) {
          oldLayerName = currentClusterInfos.layer
          currentClusterInfos.layer = params.layer
          htmlModificationNeeded = true
        }

        if (params.contentLabel !== undefined) {
          currentClusterInfos.contentLabel = params.contentLabel
          htmlModificationNeeded = true
        }

        if (params.colNumber !== undefined) {
          currentClusterInfos.colNumber = params.colNumber
          htmlModificationNeeded = true
        }
        if (params.aggregation !== undefined) {
          currentClusterInfos.aggregation = params.aggregation
          htmlModificationNeeded = true
        }
        // Update cluster zoom
        if (params.markersArea !== undefined) {
          currentClusterInfos.markersArea = params.markersArea
        }

        // update cluster icon
        if (htmlModificationNeeded) {
          currentClusterObject.redraw()
        }

        // layer modified
        if (oldLayerName != null) {
          // remove marker from previous layer
          this.map.getLayer(oldLayerName).removeLayer(currentClusterObject)
          // add marker to new layer
          this.map.getLayer(currentClusterInfos.layer).addLayer(currentClusterObject)
        }
      }
    }
  }

  /**
   * Update all manual clusters with new display parameters
   * @param clusterList - the list of manual clusters to display
   *
   * @remarks the manual clusters list is exhaustive: if a cluster is not previously displayed but appears in
   * clusterList, it will be added / if a cluster is previously displayed but doesn't appear in clusterList, it will be
   * removed / if a cluster is previously displayed and appears in clusterList, it will be updated
   */
  public updateAllClusters (clusterList: IotCluster[]): void {
    if (this.config.map.externalClustering) {
      // first : remove unused clusters
      // create id list from new clusters list
      const clustersToUpdate: string[] = []
      for (const cluster of clusterList) {
        clustersToUpdate.push(cluster.id)
      }

      for (const clusterId in this.clustersObjects) {
        if (!clustersToUpdate.includes(clusterId)) {
          this.removeCluster(clusterId)
        }
      }

      // Now update / create new clusters
      for (const cluster of clusterList) {
        if (this.clustersObjects[cluster.id] === undefined) {
          this.addCluster(cluster)
        } else {
          this.updateCluster(cluster.id, cluster)
        }
      }
    }
  }

  public getAllClusters (): IotMapCluster[] {
    return this.clustersObjects
  }

  public redrawAll (): void {
    this.clustersObjects.forEach(cluster => {
      cluster.redraw()
    })
  }
}
