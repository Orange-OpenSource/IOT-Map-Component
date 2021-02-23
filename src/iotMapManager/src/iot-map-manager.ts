/*
* Software Name : IotMapManager
* Version: 1.0.3
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
import 'leaflet.markercluster'
import { IotMapMarkers } from './iot-map-markers'
import { IotMapUserMarker } from './iot-map-user-markers'
import { IotMapClusters } from './iot-map-clusters'
import { IotMapManagerConfig } from './iot-map-manager-config'
import { IotMarker, IotCluster, IotUserMarker, CustomDataMarker } from './iot-map-manager-types'

const CLUSTER_LAYER = 'Clusters'
const ACCURACY_LAYER = 'Accuracy'
const USERMARKER_LAYER = 'UserMarker'

export class IotMapManager {
  private map: L.Map
  private iotMapMarkers: IotMapMarkers
  private iotMapClusters: IotMapClusters
  private iotMapUserMarkers: IotMapUserMarker
  private config: IotMapManagerConfig
  private markersObjects: any = {} // eslint-disable-line @typescript-eslint/no-explicit-any
  private accuracyObjects: any = {} // eslint-disable-line @typescript-eslint/no-explicit-any
  private userMarkerObject: CustomDataMarker<IotUserMarker> // only one user marker
  private userMarkerAccuracy: L.Circle

  private baseLayers: any = {} // eslint-disable-line @typescript-eslint/no-explicit-any
  private markersLayers: any = {} // eslint-disable-line @typescript-eslint/no-explicit-any
  private selectedMarkerId = ''
  private layerControl: L.Control

  constructor () {
    this.iotMapMarkers = new IotMapMarkers()
    this.iotMapClusters = new IotMapClusters()
    this.iotMapUserMarkers = new IotMapUserMarker()
    this.config = IotMapManagerConfig.getConfig()
  }

  // ------------------------------------------------------------------------------------------------------------------
  // ---------- INIT --------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------------
  // handler for 'moveend'
  public onMove?: () => void

  /**
   * Initialise a leaflet map with default position, zoom and layer
   *
   * @param selector - map id
   */
  public init (selector: string): void {
    // init map
    this.map = L.map(selector).setView(L.latLng(this.config.map.defaultLat, this.config.map.defaultLng),
      this.config.map.defaultZoomLevel)

    // init base layers
    const defaultLayer = L.tileLayer(this.config.map.openStreetMapLayer, {
      attribution: '&copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map)

    this.baseLayers = {
      // eslint-disable-next-line quote-props
      'Standard': defaultLayer
    }

    if (this.config.map.layerControl) {
      this.layerControl = L.control.layers(this.baseLayers, this.markersLayers).addTo(this.map)
    }

    this.map.on('moveend', this.onMove)
  }

  private initMarkerLayer (layerName) {
    if (this.config.map.layerControl) {
      this.map.removeControl(this.layerControl)
    }
    // create layer
    let layer: L.MarkerClusterGroup | L.FeatureGroup
    if (this.config.map.externalClustering) { // manual clustering
      layer = new L.FeatureGroup()
      layer.on('click', this.onMarkerClick.bind(this))
    } else if (layerName === ACCURACY_LAYER || layerName === USERMARKER_LAYER) { // accuracy zones or user marker = no clustering
      layer = new L.FeatureGroup()
    } else { // clusterables marker
      layer = L.markerClusterGroup({
        maxClusterRadius: this.config.map.clusterRadius,
        showCoverageOnHover: false,
        iconCreateFunction: this.defineClusterIcon.bind(this)
      })

      layer.on('animationend', this.onZoom.bind(this))
        .on('clustermouseover', this.onClusterMouseOver.bind(this))
        .on('clustermouseout', this.onClusterMouseOut.bind(this))
        .on('click', this.onMarkerClick.bind(this))
    }

    // add layer to map
    this.map.addLayer(layer)
    this.markersLayers[layerName] = layer
    if (this.config.map.layerControl) {
      this.layerControl = L.control.layers(this.baseLayers, this.markersLayers).addTo(this.map)
    }

    return layer
  }

  private getMarkerLayer (layerName): L.MarkerClusterGroup | L.FeatureGroup {
    let layer: L.MarkerClusterGroup | L.FeatureGroup = this.markersLayers[layerName]
    if (!layer) {
      layer = this.initMarkerLayer(layerName)
    }
    return layer
  }

  // ------------------------------------------------------------------------------------------------------------------
  // ---------- GETTERS -----------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------------
  /**
   * Returns leaflet map
   *
   * @returns the leaflet map previously initialised
   */
  public getIotMap (): L.Map {
    return this.map
  }

  /**
   * Returns bounds containing all the defined markers, manual clusters and user marker
   *
   * @returns leaflet LatLngBounds object
   */
  public getMapBounds (): L.LatLngBounds {
    let north: number
    let west: number
    let south: number
    let east: number
    let first = true

    // markers + manual clusters
    for (const id in this.markersObjects) {
      const markerLoc = this.markersObjects[id].getData().location

      if (first) {
        north = markerLoc.lat
        west = markerLoc.lng
        south = markerLoc.lat
        east = markerLoc.lng

        first = false
      } else {
        west = (markerLoc.lng < west) ? markerLoc.lng : west
        east = (markerLoc.lng > east) ? markerLoc.lng : east
        south = (markerLoc.lat < south) ? markerLoc.lat : south
        north = (markerLoc.lat > north) ? markerLoc.lat : north
      }
    }

    // user marker
    if (this.userMarkerObject) {
      const userMarkerLoc = this.userMarkerObject.getData().location
      west = (userMarkerLoc.lng < west) ? userMarkerLoc.lng : west
      east = (userMarkerLoc.lng > east) ? userMarkerLoc.lng : east
      south = (userMarkerLoc.lat < south) ? userMarkerLoc.lat : south
      north = (userMarkerLoc.lat > north) ? userMarkerLoc.lat : north
    }

    return L.latLngBounds([[south, east], [north, west]])
  }

  /**
   * Fit map to given bounds, according to options
   *
   * @param bounds - bounds of the map area to display
   * @param options - see leaflet options
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  public fitMapToBounds (bounds: L.LatLngBounds, options?: any): void {
    this.map.fitBounds(bounds, options)
  }

  /**
   * Returns the displayed area bounds
   *
   * @returns leaflet LatLngBounds object
   */
  public getBounds (): L.LatLngBounds {
    return this.map.getBounds()
  }

  /**
   * Defines displayed area bounds
   *
   * @param bounds - leaflet LatLngBounds object
   */
  public setBounds (bounds: L.LatLngBounds): void {
    this.map.fitBounds(bounds)
  }

  // ------------------------------------------------------------------------------------------------------------------
  // ---------- EVENTS ------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------------

  private onMarkerClick (event) {
    const markerObject = event.layer
    const isManualCluster = (markerObject.getData().childCount !== undefined)

    // select / unselect marker
    let html: L.DivIcon
    // already selected => unselect it
    if (this.selectedMarkerId === markerObject.getData().id) {
      // update selected id
      this.selectedMarkerId = ''

      // get new html and update marker (=> unselect marker)
      html = (isManualCluster)
        ? this.iotMapClusters.getClusterIcon(markerObject.getData(), false, false)
        : this.iotMapMarkers.getMarkerIcon(markerObject.getData(), false)
      markerObject.setIcon(html)
      markerObject.setZIndexOffset(0)
    } else { // new marker selected
      // --- unselect last selected marker ---
      if (this.selectedMarkerId !== '') { // a marker was already selected
        const lastSelectedMarker = this.markersObjects[this.selectedMarkerId]

        // get new html and update marker (=> unselect marker)
        html = (lastSelectedMarker.getData().childCount !== undefined)
          ? this.iotMapClusters.getClusterIcon(lastSelectedMarker.getData(), false, false)
          : this.iotMapMarkers.getMarkerIcon(lastSelectedMarker.getData(), false)
        lastSelectedMarker.setIcon(html)
        lastSelectedMarker.setZIndexOffset(0)
      }

      // --- select new marker ---
      // update selected id
      this.selectedMarkerId = markerObject.getData().id

      // get new html and update marker (=> select marker)
      html = (isManualCluster)
        ? this.iotMapClusters.getClusterIcon(markerObject.getData(), true, false)
        : this.iotMapMarkers.getMarkerIcon(markerObject.getData(), true)
      markerObject.setIcon(html)
      markerObject.setZIndexOffset(100)
    }
  }

  private onClusterMouseOver (event) {
    event.layer.setZIndexOffset(100)
  }

  private onClusterMouseOut (event) {
    event.layer.setZIndexOffset(0)
  }

  private onZoom () {
    for (const markerId in this.markersObjects) {
      if (this.markersObjects[markerId] !== undefined && this.markersObjects[markerId] !== null) {
        const marker = this.markersObjects[markerId].getData()
        if (this.map.hasLayer(this.markersObjects[markerId])) { // unclustered
          if (marker.shape.accuracy !== undefined) {
            // accuracy circle if needed
            const accuracy = this.accuracyObjects[markerId]
            if (!accuracy) { // create accuracy circle
              const newCircle = L.circle(marker.location, {
                color: this.config.accuracyCircle.color,
                fillColor: this.config.accuracyCircle.fillColor,
                fillOpacity: this.config.accuracyCircle.fillOpacity,
                radius: marker.shape.accuracy,
                interactive: false // not clickable
              })
              this.getMarkerLayer(ACCURACY_LAYER).addLayer(newCircle)
              this.accuracyObjects[markerId] = newCircle
            }
          }
        } else { // clustered
          if (marker.location.accuracy !== undefined) {
            // accuracy circle if needed
            const accuracyToRemove: L.Circle = this.accuracyObjects[markerId]
            if (accuracyToRemove) {
              this.getMarkerLayer(ACCURACY_LAYER).removeLayer(accuracyToRemove)
              this.accuracyObjects[markerId] = null
            }
          }
        }
      }
    }
  }

  // ------------------------------------------------------------------------------------------------------------------
  // ---------- MARKERS -----------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------------
  /**
   * Insert marker in the map
   *
   * @param marker - an IotMarker containing all display info
   */
  public addMarker (marker: IotMarker): void {
    if (marker.id && marker.location) {
      // does id already exist ?
      if (this.markersObjects[marker.id] !== undefined && this.markersObjects[marker.id] !== null) {
        this.updateMarker(marker.id, marker)
      } else {
        const newMarker: CustomDataMarker<IotMarker> =
          new CustomDataMarker(
            marker,
            { icon: this.iotMapMarkers.getMarkerIcon(marker) })
        this.getMarkerLayer(marker.layer).addLayer(newMarker)
        this.markersObjects[marker.id] = newMarker

        // accuracy circle if needed
        if (marker.shape.accuracy !== undefined) {
          const newCircle = L.circle(marker.location, {
            color: this.config.accuracyCircle.color,
            fillColor: this.config.accuracyCircle.fillColor,
            fillOpacity: this.config.accuracyCircle.fillOpacity,
            radius: marker.shape.accuracy,
            interactive: false // not clickable
          })
          this.getMarkerLayer(ACCURACY_LAYER).addLayer(newCircle)
          this.accuracyObjects[marker.id] = newCircle
        }
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
    const markerToRemove: CustomDataMarker<IotMarker> = this.markersObjects[markerId]
    if (markerToRemove) {
      this.getMarkerLayer(markerToRemove.getData().layer).removeLayer(markerToRemove)
      this.markersObjects[markerId] = null

      const accuracyToRemove: L.Circle = this.accuracyObjects[markerId]
      if (accuracyToRemove) {
        this.getMarkerLayer(ACCURACY_LAYER).removeLayer(accuracyToRemove)
        this.accuracyObjects[markerId] = null
      }

      // deselect marker if selected
      if (this.selectedMarkerId === markerId) {
        this.selectedMarkerId = ''
      }
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
    const currentMarkerObject: CustomDataMarker<IotMarker> = this.markersObjects[markerId]

    if (currentMarkerObject) {
      const currentMarkerInfos: IotMarker = currentMarkerObject.getData()
      const currentMarkerIsSelected: boolean = (this.selectedMarkerId === currentMarkerInfos.id)

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
        currentMarkerInfos.shape = {
          type: params.shape.type ?? currentMarkerInfos.shape.type,
          anchored: params.shape.anchored ?? currentMarkerInfos.shape.anchored,
          plain: params.shape.plain ?? currentMarkerInfos.shape.plain,
          color: params.shape.color ?? currentMarkerInfos.shape.color,
          percent: params.shape.percent ?? currentMarkerInfos.shape.percent
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
          label: (params.inner?.icon === undefined) ? (params.inner?.icon ?? currentMarkerInfos.inner?.icon) : undefined
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
        const html = this.iotMapMarkers.getMarkerIcon(currentMarkerInfos, currentMarkerIsSelected)
        currentMarkerObject.setIcon(html)
      }

      if (oldLayerName != null) {
        // remove  marker from previous layer
        this.getMarkerLayer(oldLayerName).removeLayer(currentMarkerObject)
        // add marker to new layer
        this.getMarkerLayer(currentMarkerInfos.layer).addLayer(currentMarkerObject)
      }

      // accuracy
      if (params.shape?.accuracy !== undefined) {
        // update marker info
        if (currentMarkerInfos.shape === undefined) {
          currentMarkerInfos.shape = {}
        }
        currentMarkerInfos.shape.accuracy = params.shape?.accuracy

        // update accuracy layer
        const currentAccuracyCircle = this.accuracyObjects[currentMarkerInfos.id]
        if (currentAccuracyCircle !== undefined) {
          currentAccuracyCircle.setRadius(currentMarkerInfos.shape.accuracy)
        } else {
          const newCircle = L.circle(currentMarkerInfos.location, {
            color: 'none',
            fillColor: this.config.accuracyCircle.fillColor,
            fillOpacity: this.config.accuracyCircle.fillOpacity,
            radius: currentMarkerInfos.shape.accuracy,
            interactive: false // not clickable
          })
          this.getMarkerLayer(ACCURACY_LAYER).addLayer(newCircle)
          this.accuracyObjects[currentMarkerInfos.id] = newCircle
        }
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
   * Force map to redraw all markers / clusters and user marker.
   *
   * @remarks This can be used to force the automatic clustering to take into account an update of a clustered marker
   */
  public redrawAll (): void {
    for (const layerName in this.markersLayers) {
      if (this.markersLayers[layerName] !== undefined) {
        this.markersLayers[layerName].clearLayers()
      }
    }

    // redraw markers and manual clusters
    for (const markerId in this.markersObjects) {
      if (this.markersObjects[markerId] != null) {
        const marker = this.markersObjects[markerId].getData()
        if (marker.childCount !== undefined) { // marker is a manual cluster
          this.addCluster(marker)
        } else {
          this.addMarker(marker)
        }
      }
    }

    // redraw usermarker
    this.addUserMarker(this.userMarkerObject.getData())
  }

  // ------------------------------------------------------------------------------------------------------------------
  // ---------- CLUSTERS ----------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------------
  private defineClusterIcon (cluster): L.DivIcon {
    const currentCluster: IotCluster = this.leafletClusterToIotCluster(cluster)
    return this.iotMapClusters.getClusterIcon(currentCluster, false, true) // automatic cluster
  }

  /**
   * Insert manual cluster in the map
   *
   * @param cluster - an IotCluster containing all display info
   */
  public addCluster (cluster: IotCluster): void {
    if (this.config.map.externalClustering) {
      if (cluster.id && cluster.location) {
        const newCluster: CustomDataMarker<IotCluster> = new CustomDataMarker(
          cluster,
          {
            icon: this.iotMapClusters.getClusterIcon(cluster, false, false)
          } // manual cluster
        )

        this.getMarkerLayer(CLUSTER_LAYER).addLayer(newCluster)
        this.markersObjects[cluster.id] = newCluster
      } else {
        console.log('No id and/or no location defined for new cluster. Unable to display')
      }
    }
  }

  /**
   * Insert a list of manual clusters in the map
   *
   * @param clusterList - list of IotCluster containing all display info for each manual cluster
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
   *
   * @param clusterId - the id of the manual cluster to remove
   */
  public removeCluster (clusterId: string): void {
    if (this.config.map.externalClustering) {
      const clusterToRemove: CustomDataMarker<IotCluster> = this.markersObjects[clusterId]
      if (clusterToRemove) {
        this.getMarkerLayer(CLUSTER_LAYER).removeLayer(clusterToRemove)
        this.markersObjects[clusterId] = null

        // deselect cluster if selected
        if (this.selectedMarkerId === clusterId) {
          this.selectedMarkerId = ''
        }
      }
    }
  }

  /**
   * Remove a list of manual clusters from the map
   *
   * @param clustersId - the id list of manual clusters to remove
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
   *
   * @param clusterId - the id of the manual cluster to update
   * @param params - a structure containing partial display information to update
   */
  public updateCluster (clusterId: string, params: Partial<IotCluster>): void {
    if (this.config.map.externalClustering) {
      const currentClusterObject: CustomDataMarker<IotCluster> = this.markersObjects[clusterId]

      if (currentClusterObject) {
        const currentClusterInfos: IotCluster = currentClusterObject.getData()

        let htmlModificationNeeded = false

        // location modified
        if (params.location) {
          currentClusterInfos.location = params.location

          const newLatLng: L.LatLng = new L.LatLng(params.location.lat, params.location.lng)
          currentClusterObject.setLatLng(newLatLng)
        }

        if (params.childCount) {
          currentClusterInfos.childCount = params.childCount
          htmlModificationNeeded = true
        }

        if (params.aggregation) {
          currentClusterInfos.aggregation = params.aggregation
          htmlModificationNeeded = true
        }

        // update cluster icon
        if (htmlModificationNeeded) {
          const selected = (this.selectedMarkerId === currentClusterInfos.id)
          const html = this.iotMapClusters.getClusterIcon(currentClusterInfos, selected, !this.config.map.externalClustering)
          currentClusterObject.setIcon(html)
        }
      }
    }
  }

  /**
   * Update all manual clusters with new display parameters
   *
   * @param clusterList - the list of manual clusters to display
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

      for (const clusterId in this.markersObjects) {
        if (!clustersToUpdate.includes(clusterId)) {
          this.removeCluster(clusterId)
        }
      }

      // Now update / create new clusters
      for (const cluster of clusterList) {
        if (this.markersObjects[cluster.id] === undefined) {
          this.addCluster(cluster)
        } else {
          this.updateCluster(cluster.id, cluster)
        }
      }
    }
  }

  /***
   * privates !
   */
  private leafletClusterToIotCluster (leafletCluster): IotCluster {
    // marker Distribution
    const tabDistribution: any = {} // eslint-disable-line @typescript-eslint/no-explicit-any

    const allChildMarkers = leafletCluster.getAllChildMarkers()
    allChildMarkers.forEach(marker => {
      const state = (marker.getData().status) ? marker.getData().status : 'stateless'
      if (tabDistribution[state]) {
        tabDistribution[state] = {
          count: tabDistribution[state].count + 1,
          label: (marker.getData().status)
            ? this.config.markerStatus[marker.getData().status].name.plural
            : 'stateless'
        }
      } else {
        tabDistribution[state] = {
          count: 1,
          label: (marker.getData().status)
            ? this.config.markerStatus[marker.getData().status].name.singular
            : 'stateless'
        }
      }
    })

    const layer = allChildMarkers[0].getData().layer

    const currentCluster: IotCluster = {
      id: '', // unused in automatic mode
      location: {
        lat: 0,
        lng: 0
      }, // unused in automatic mode
      contentLabel: layer, // unused in automatic mode
      layer: layer,
      childCount: leafletCluster.getChildCount(),
      aggregation: []
    }
    let i = 0
    for (const state in tabDistribution) {
      if (tabDistribution[state]) {
        currentCluster.aggregation[i] = {
          count: tabDistribution[state].count,
          color: (state === 'stateless') ? this.config.clusters.defaultColor : this.config.markerStatus[state].shape.color,
          singularState: tabDistribution[state].label,
          pluralState: tabDistribution[state].label
        }
        i++
      }
    }

    return currentCluster
  }

  /***
   * USER MARKER
   */

  /**
   * Insert user marker in the map
   *
   * @param userMarker - an IotUserMarker containing all display info
   */
  public addUserMarker (userMarker: IotUserMarker): void {
    if (userMarker.location) {
      if (this.userMarkerObject != null) {
        this.getMarkerLayer(USERMARKER_LAYER).clearLayers()
        this.getMarkerLayer(ACCURACY_LAYER).removeLayer(this.userMarkerAccuracy)
      }
      this.userMarkerObject = new CustomDataMarker(userMarker, {
        icon: this.iotMapUserMarkers.getUserMarkerIcon(userMarker),
        interactive: false
      }) // not clickable
      this.getMarkerLayer(USERMARKER_LAYER).addLayer(this.userMarkerObject)
      this.userMarkerObject.setZIndexOffset(75)

      // accuracy circle if needed
      if (userMarker.accuracy !== undefined) {
        this.userMarkerAccuracy = L.circle(userMarker.location, {
          color: this.config.accuracyCircle.color,
          fillColor: this.config.accuracyCircle.fillColor,
          fillOpacity: this.config.accuracyCircle.fillOpacity,
          radius: userMarker.accuracy,
          interactive: false // not clickable
        })
        this.getMarkerLayer(ACCURACY_LAYER).addLayer(this.userMarkerAccuracy)
      }
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
    this.getMarkerLayer(USERMARKER_LAYER).removeLayer(this.userMarkerObject)
    delete this.userMarkerObject

    this.getMarkerLayer(ACCURACY_LAYER).removeLayer(this.userMarkerAccuracy)
    delete this.userMarkerAccuracy
  }

  /**
   * Update user marker with new display parameters
   *
   * @param params - a structure containing partial display information to update
   */
  public updateUserMarker (params: Partial<IotUserMarker>): void {
    if (this.userMarkerObject !== null) {
      const userMarkerInfo = this.userMarkerObject.getData()
      if (params.location !== undefined) {
        userMarkerInfo.location = params.location

        const newLatLng: L.LatLng = new L.LatLng(params.location.lat, params.location.lng)
        this.userMarkerObject.setLatLng(newLatLng)
        this.userMarkerAccuracy.setLatLng(newLatLng)
      }

      if (params.direction !== undefined) {
        if (params.direction === null) { // cmd to remove arrow
          userMarkerInfo.direction = undefined
        } else {
          userMarkerInfo.direction = params.direction
        }

        // update icon
        const html = this.iotMapUserMarkers.getUserMarkerIcon(userMarkerInfo)
        this.userMarkerObject.setIcon(html)
      }

      if (params.accuracy !== undefined) {
        userMarkerInfo.accuracy = params.accuracy
        if (this.userMarkerAccuracy === null) { // create
          this.userMarkerAccuracy = L.circle(userMarkerInfo.location, {
            color: this.config.accuracyCircle.color,
            fillColor: this.config.accuracyCircle.fillColor,
            fillOpacity: this.config.accuracyCircle.fillOpacity,
            radius: userMarkerInfo.accuracy,
            interactive: false // not clickable
          })
          this.getMarkerLayer(ACCURACY_LAYER).addLayer(this.userMarkerAccuracy)
        } else { // update
          this.userMarkerAccuracy.setRadius(userMarkerInfo.accuracy)
        }
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
}
