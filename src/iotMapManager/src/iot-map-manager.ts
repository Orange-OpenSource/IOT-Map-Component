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
import 'leaflet.markercluster'
import { IotMapConfig } from './iot-map-config'
import { IotMapDisplay } from './iot-map-types'
import { getAutomaticClusterIcon } from './iot-map-icons'

export class IotMapManager {
  private map: L.Map
  private config: IotMapConfig

  private displayedMarkers: IotMapDisplay[] = []
  private selectedElement: IotMapDisplay

  private baseLayers: any = {} // eslint-disable-line @typescript-eslint/no-explicit-any
  private markersLayers: any = {} // eslint-disable-line @typescript-eslint/no-explicit-any
  private layerControl: L.Control

  private firstLayerAdded = true
  private accuracyDisplayed = true
  private currentDisplayedLayers: string[] = []

  /**
   * Constructor
   * @param config - config to use for map display
   */
  constructor (config: IotMapConfig) {
    this.config = config
  }

  // ------------------------------------------------------------------------------------------------------------------
  // ---------- INIT --------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------------
  // handler for 'moveend'
  public onMove?: () => void

  // handler for 'click' on markers
  public onEltClick?: (id: string) => void

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
    L.tileLayer(this.config.map.openStreetMapLayer,
      { attribution: '&copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' })
      .addTo(this.map)
    if (this.config.map.layerControl) {
      this.layerControl = L.control.layers(this.baseLayers, this.markersLayers).addTo(this.map)
    }

    this.map.on('moveend', this.onMove)
      .on('baselayerchange', this.onBaseLayerChange.bind(this))
      .on('overlayadd', this.onOverlayAdd.bind(this))
      .on('overlayremove', this.onOverlayRemove.bind(this))
      .on('click', this.onClick.bind(this))

    this.selectedElement = undefined
  }

  /**
   * Create a layer according to marker / cluster types : if clustering is automatic or external, if layer is for
   * displaying accuracy areas or user marker...
   * @param layerName - name of the layer to init
   */
  private initLayer (layerName: string) {
    if (this.config.map.layerControl) {
      this.map.removeControl(this.layerControl)
    }

    // create layer
    let layer: L.MarkerClusterGroup | L.FeatureGroup
    if (this.config.map.externalClustering) { // manual clustering
      layer = new L.FeatureGroup()
      layer.on('click', this.onElementClick.bind(this))
        .on('mouseover', this.onElementMouseOver.bind(this))
        .on('mouseout', this.onElementMouseOut)
    } else if (layerName === this.config.accuracyCircle.layerName ||
      layerName === this.config.userMarker.layerName ||
      layerName === this.config.path.layerName) { // accuracy area, user marker or path = no clustering
      layer = new L.FeatureGroup()
    } else { // clusterables marker
      layer = L.markerClusterGroup({
        maxClusterRadius: this.config.map.clusterRadius,
        showCoverageOnHover: false,
        iconCreateFunction: this.getClusterIcon.bind(this)
      })

      layer.on('animationend', this.onZoom.bind(this))
        .on('clustermouseover', this.onClusterMouseOver.bind(this))
        .on('clustermouseout', this.onClusterMouseOut)
        .on('click', this.onElementClick.bind(this))
    }

    // add layer to map
    if (layerName === this.config.accuracyCircle.layerName) {
      this.markersLayers[layerName] = layer // always not exclusive
      this.map.addLayer(layer)
    } else if (this.config.map.layerControl && this.config.map.exclusiveLayers) {
      this.baseLayers[layerName] = layer
      if (this.firstLayerAdded) {
        this.firstLayerAdded = false
        this.map.addLayer(layer)
        this.currentDisplayedLayers[0] = layerName
      }
    } else {
      this.markersLayers[layerName] = layer
      this.map.addLayer(layer)
      this.currentDisplayedLayers.push(layerName)
    }

    // display layer control
    if (this.config.map.layerControl) {
      this.layerControl = L.control.layers(this.baseLayers, this.markersLayers).addTo(this.map)
    }

    this.updateAccuracy()
    return layer
  }

  // ------------------------------------------------------------------------------------------------------------------
  // ---------- GETTERS / SETTERS -------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------------

  /**
   * Returns Leaflet layer corresponding to layerName
   *
   * @param layerName - name of the layer
   */
  public getLayer (layerName: string): L.MarkerClusterGroup | L.FeatureGroup {
    let layer: L.MarkerClusterGroup | L.FeatureGroup = this.markersLayers[layerName]
    if (!layer) {
      layer = this.baseLayers[layerName]
      if (!layer) {
        layer = this.initLayer(layerName)
      }
    }
    return layer
  }

  /**
   * Returns leaflet map
   *
   * @returns the leaflet map previously initialised
   */
  public getIotMap (): L.Map {
    return this.map
  }

  /**
   * switch a displayed element to selected
   * @param elt - element to select
   */
  public selectElement (elt: IotMapDisplay): void {
    if (this.selectedElement !== elt) {
      this.changeSelectionStatus(this.selectedElement, false)
    }
    this.changeSelectionStatus(elt, true)

    // trigger event "on click"
    if (this.onEltClick) {
      this.onEltClick(elt.getId())
    }
  }

  /**
   * switch a displayed element to unselected
   * @param elt - element to unselect
   */
  public unselectElement (elt: IotMapDisplay): void {
    if (this.selectedElement === elt) {
      this.changeSelectionStatus(elt, false)
    }
  }

  /**
   * Add a marker to the map.
   * @param elt - marker to add
   * @param layer - layer to add the marker in
   * @param id - marker id
   *
   * @remarks used to get the list of displayed markers
   */
  public addElement (elt: IotMapDisplay, layer: string, id: string): void {
    this.getLayer(layer).addLayer(elt)
    this.displayedMarkers[id] = elt
  }

  /**
   * remove a marker from the map.
   * @param layer - layer to add the marker in
   * @param id - marker id
   *
   * @remarks used to get the list of displayed markers
   */
  public removeElement (elt: IotMapDisplay, layer: string): void {
    this.getLayer(layer).removeLayer(elt)

    const index = this.displayedMarkers.indexOf(elt, 0)
    if (index > -1) {
      this.displayedMarkers.splice(index, 1)
    }
  }

  /**
   * Set selection status
   * @param elt - element (marker, cluster...) to select/unselect
   * @param selected - True if element must be selected, false otherwise
   */
  private changeSelectionStatus (elt: IotMapDisplay, selected: boolean) {
    if (elt !== undefined) {
      elt.select(selected)
      this.selectedElement = (selected) ? elt : undefined
    }
  }

  /**
   * Returns a DivIcon compatible with leaflet, representing all automatic cluster information (shape, tab, popup, gauge...)
   * @param leafletCluster - cluster computed by leaflet
   */
  private getClusterIcon (leafletCluster: L.MarkerCluster) {
    return getAutomaticClusterIcon(leafletCluster, this.config)
  }

  // ------------------------------------------------------------------------------------------------------------------
  // ---------- EVENTS ------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------------
  /**
   * Called on element click
   * @param event - event data
   */
  private onElementClick (event) {
    const element: IotMapDisplay = event.layer

    if (this.selectedElement === element) {
      this.unselectElement(element)
    } else {
      this.selectElement(element)
    }

    element.elementClicked() // inform cluster to open
    element.shiftMap()
  }

  /**
   * Called on cluster mouse over
   * @param event - event data
   */
  private onClusterMouseOver (event) {
    event.layer.setZIndexOffset(100)
  }

  /**
   * Called on cluster mouse out
   * @param event - event data
   */
  private onClusterMouseOut (event) {
    event.layer.setZIndexOffset(0)
  }

  /**
   * Called on marker mouse over (to brind manual cluster in front)
   * @param event - event data
   */
  private onElementMouseOver (event) {
    event.layer.setZIndexOffset(100)
  }

  /**
   * Called on marker mouse out (to brind manual cluster in background)
   * @param event - event data
   */
  private onElementMouseOut (event) {
    event.layer.setZIndexOffset(0)
  }

  /**
   * Called when displayed map area change (zoom in, zoom out, move, click...)
   */
  private onZoom () {
    for (const id in this.displayedMarkers) {
      const elt = this.displayedMarkers[id]
      if (elt) {
        elt.reactAfterZoom()
      }
    }
  }

  private onBaseLayerChange (event) {
    if (this.config.map.exclusiveLayers === true) {
      this.currentDisplayedLayers = event.name
      this.updateAccuracy()
    }
  }

  private onOverlayAdd (event) {
    if (event.name === this.config.accuracyCircle.layerName) {
      this.accuracyDisplayed = true
    } else {
      this.currentDisplayedLayers.push(event.name)
    }
    this.updateAccuracy()
  }

  private onOverlayRemove (event) {
    if (event.name === this.config.accuracyCircle.layerName) {
      this.accuracyDisplayed = false
    } else {
      const index = this.currentDisplayedLayers.indexOf(event.name, 0)
      if (index > -1) {
        this.currentDisplayedLayers.splice(index, 1)
      }
    }
    this.updateAccuracy()
  }

  private onClick () {
    this.changeSelectionStatus(this.selectedElement, false)
  }

  private updateAccuracy (): void {
    for (const id in this.displayedMarkers) {
      const elt = this.displayedMarkers[id]
      elt.updateAccuracyDisplay(this.currentDisplayedLayers, this.accuracyDisplayed)
    }
  }
}
