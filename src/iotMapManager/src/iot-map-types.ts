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

export interface Location {
  lat: number
  lng: number
}

export interface GeolocMarker {
  location: Location
}

export enum ShapeType { circle, square} // eslint-disable-line no-unused-vars

export enum TabType {normal, large} // eslint-disable-line no-unused-vars

export enum PathIconType {start, mid, end} // eslint-disable-line no-unused-vars
/**
 * IotMapDisplay abstract class extends leaflet Marker
 *
 * @remarks same behaviour as L.Marker with a stored data structure to save displayed info
 */
export abstract class IotMapDisplay extends L.Marker {
  protected id
  getId () : string {
    return this.id
  }

  abstract getData (): GeolocMarker
  abstract setData (data: GeolocMarker): void
  abstract select (selected: boolean): void
  abstract redraw (): void

  reactAfterZoom (): void {
    // By default: Nothing to do
  }

  elementClicked (): void {
    // By default: Nothing to do
  }

  shiftMap (): void {
    // By default: Nothing to do
  }

  updateAccuracyDisplay (selectedLayers: string[], display: boolean): void { // eslint-disable-line @typescript-eslint/no-unused-vars
    // By default: Nothing to do
  }
}

/**
 * Popup
 *
 * @param title - (optional) string displayed as a title in the marker / cluster popup
 * @param body - (optional) string displayed as a body in the marker / cluster popup
 */
interface Popup {
  title?: string
  body?: string
}

/**
 * Tab
 *
 * @param content - mandatory: string displayed as is in the tab. Can be a label or a more complex html string
 * @param type - (optional) related to tab width (normal or large)
 */
interface Tab {
  content: string
  type?: TabType
}

/**
 * Shape
 *
 * @param type - (optional) shape type (circle or square)
 * @param anchored - (optional) if true, an anchor is displayed under the shape. None otherwise.
 * @param plain - (optional) if true, shape is filled with color. Only border is colored otherwise.
 * @param color - (optional) define the color of the shape (or the border, according to plain value) is filled with.
 * @param percent - (optional) define a gauge, design on the border of the shape. Filled at <percent> %.
 * @param accuracy - (optional) define a circle radius around the marker position.
 */
interface Shape {
  type?: ShapeType
  anchored?: boolean
  plain?: boolean
  color?: string
  percent?: number
  accuracy?: number
  direction?: number
}

/**
 * Inner
 *
 * @param icon - (optional) define the icon displayed inside the shape.
 * @param img - (optional) define the src of an img displayed inside the shape.
 * @param label - (optional) define the character displayed inside the shape.
 * @param color - (optional) define the color of the inner element.
 *
 * @remarks icon and label can not be used simultaneously. Otherwise, only icon will be displayed.
 */
interface Inner {
  color?: string

  icon?: string;
  img?: string;
  // *** OR ***
  label?: string
}

/**
 * * IotMarker
 *
 * @param id - (mandatory) id of the marker. This id must be unique.
 * @param layer - (optional) define the name of the layer the marker is displayed in.
 * @param popup - (optional) define popup elements (see Popup interface).
 * @param tab - (optional) define tab elements (see Tab inferface)
 * @param shape - (optional) define shape elements (see Shape interface)
 * @param inner - (optional) define inner elements (see Inner interface)
 * @param template - (optional) name of the template to apply
 * @param status - (optional) name of the status to apply
 */
export interface IotMarker extends GeolocMarker {
  id: string
  layer?: string
  popup?: Popup
  tab?: Tab
  shape?: Shape
  inner?: Inner
  template?: string
  status?: string
}

/**
 * * IotCluster
 *
 * @param id - (mandatory) id of the marker. This id must be unique.
 * @param layer - (optional) define the name of the layer the marker is displayed in.
 * @param contentLabel - label displayed as title of popup
 * @param childCount - number of markers clustered. Displayed as inner element
 * @param aggregation - array of markers types. Each type represented by a color, a number and a state (sing and plur)
 */
export interface IotCluster extends GeolocMarker {
  id: string
  layer?: string
  contentLabel: string
  childCount: number
  colNumber?: number
  markersArea?: L.LatLngBounds
  aggregation: {
    singularState: string
    pluralState: string
    count: number
    color: string
    bullet?: string
    url?: string
    urlTarget?: string
  }[]
}

/**
 * * IotUserMarker
 *
 * @param direction - (optional) clockwise angle describing the arrow direction
 * @param accuracy - (optional) define accuracy area radius around the user marker location.
 */
export interface IotUserMarker extends GeolocMarker {
  direction?: number
  accuracy?: number
}

/**
 * * MarkerStatus
 *
 * @param state - (mandatory) the status name as it is mentionned in IotMarker
 * @param name - (mandatory) string displayed in cluster popup when IotMarker uses this markerStatus and is clustered
 * @param layer - (optional) the layer the marker is displayed in
 * @param popup - (optional) popup elements (see Popup)
 * @param tab - (optional) tab elements (see Tab)
 * @param shape - (optional) shape elements (see Shape)
 * @param inner - (optional) inner elements (see Inner)
 */
export interface MarkerStatus {
  [state: string]: {
    name: {
      singular: string
      plural: string
    },
    layer?: string
    popup?: Popup
    tab?: Tab
    shape?: Shape
    inner?: Inner
    bullet?: string
    url?: string
    urlTarget?: string
  }
}

/**
 * * MarkerTemplate
 *
 * @param template - (mandatory) the template name as it is mentionned in IotMarker
 * @param layer - (optional) the layer the marker is displayed in
 * @param popup - (optional) popup elements (see Popup)
 * @param tab - (optional) tab elements (see Tab)
 * @param shape - (optional) shape elements (see Shape)
 * @param inner - (optional) inner elements (see Inner)
 */
export interface MarkerTemplate {
  [template: string]: {
    layer?: string
    popup?: Popup
    tab?: Tab
    shape?: Shape
    inner?: Inner
  }
}

/**
 * * LayerTemplate
 *
 * @param layerName - (mandatory) the layer name as it is mentionned in IotMarker
 * @param content - (optional) the html code to display in cluster tab
 * @param type - (optional) the cluster tab width. (see TabType)
 * @param popupColNumber - (optional) the number of columns to display in cluster popups
 */
export interface LayerTemplate {
  [layerName: string]: {
    content?: string,
    type?: TabType
    popupColNumber?: number
  }
}

/**
 * * Path
 *
 * @param id - (mandatory) id of the path (used to update path for exemple)
 * @param color - (optional) color of the path (blue is default)
 * @param points - (mandatory) At least 2 points to define a path
 * @param positions - (optional) several positions marked with a specific marker along the path
 * @param additional - (optional) 1..4 additional path displayed along the main path
 *            additional.points - (mandatory) at least 2 points to define a path
 *            additional.color - (mandatory) color used to display additional path
 *            additional.number - (mandatory) line number (1..4 : 1 is full left, 4 full right in the direction of travel)
 */
export interface IotPath {
  id: string
  color?: string
  points: Location[]
  positions?: Location[]
  additional?: {
    points: Location[]
    color: string
    line: number
  }[]
}

/**
 * * Area
 * @param id - (mandatory) id of the area (used to update area for exemple)
 * @param points - (mandatory) at least 3 points to define an area
 * @param borderColor - (optional) color of the area border
 * @param fillColor - (optional) fill color of the area
 */
export interface IotArea {
  id: string
  points: Location[]
  color?: string
  fillColor?: string
  fillOpacity?: number
}
