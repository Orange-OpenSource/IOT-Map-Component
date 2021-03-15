/*
* Software Name : IotMapManager
* Version: 1.0.5
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
  abstract getData (): GeolocMarker
  abstract setData (data: GeolocMarker): void
  abstract select (selected: boolean): void
  abstract redraw (): void
  reactAfterZoom (): void {
    // By default : Nothing to do
  }
}

/**
 * Popup
 *
 * @param title - (optionnal) string displayed as a title in the marker / cluster popup
 * @param body - (optionnal) string displayed as a body in the marker / cluster popup
 */
interface Popup {
  title?: string
  body?: string
}

/**
 * Tab
 *
 * @param content - mandatory: string displayed as is in the tab. Can be a label or a more complex html string
 * @param type - (optionnal) related to tab width (normal or large)
 */
interface Tab {
  content: string
  type?: TabType
}

/**
 * Shape
 *
 * @param type - (optionnal) shape type (circle or square)
 * @param anchored - (optionnal) if true, an anchor is displayed under the shape. None otherwise.
 * @param plain - (optionnal) if true, shape is filled with color. Only border is colored otherwise.
 * @param color - (optionnal) define the color of the shape (or the border, according to plain value) is filled with.
 * @param percent - (optionnal) define a gauge, design on the border of the shape. Filled at <percent> %.
 * @param accuracy - (optionnal) define a circle radius around the marker position.
 */
interface Shape {
  type?: ShapeType
  anchored?: boolean
  plain?: boolean
  color?: string
  percent?: number
  accuracy?: number
}

/**
 * Inner
 *
 * @param icon - (optionnal) define the icon displayed inside the shape.
 * @param label - (optionnal) define the character displayed inside the shape.
 * @param color - (optionnal) define the color of the inner element.
 *
 * @remarks icon and label can not be used simultaneously. Otherwise, only icon will be displayed.
 */
interface Inner {
  color?: string

  icon?: string
  // *** OR ***
  label?: string
}

/**
 * * IotMarker
 *
 * @param id - (mandatory) id of the marker. This id must be unique.
 * @param layer - (optionnal) define the name of the layer the marker is displayed in.
 * @param popup - (optionnal) define popup elements (see Popup interface).
 * @param tab - (optionnal) define tab elements (see Tab inferface)
 * @param shape - (optionnal) define shape elements (see Shape interface)
 * @param inner - (optionnal) define inner elements (see Inner interface)
 * @param template - (optionnal) name of the template to apply
 * @param status - (optionnal) name of the status to apply
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
 * @param layer - (optionnal) define the name of the layer the marker is displayed in.
 * @param contentLabel - label displayed as title of popup
 * @param childCount - number of markers clustered. Displayed as inner element
 * @param aggregation - array of markers types. Each type represented by a color, a number and a state (sing and plur)
 */
export interface IotCluster extends GeolocMarker {
  id: string
  layer?: string
  contentLabel: string
  childCount: number
  aggregation: {
    singularState: string
    pluralState: string
    count: number
    color: string
  }[]
}

/**
 * * IotUserMarker
 *
 * @param direction - (optionnal) clockwise angle describing the arrow direction
 * @param accuracy - (optionnal) define accuracy area radius around the user marker location.
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
 * @param layer - (optionnal) the layer the marker is displayed in
 * @param popup - (optionnal) popup elements (see Popup)
 * @param tab - (optionnal) tab elements (see Tab)
 * @param shape - (optionnal) shape elements (see Shape)
 * @param inner - (optionnal) inner elements (see Inner)
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
  }
}

/**
 * * MarkerTemplate
 *
 * @param template - (mandatory) the template name as it is mentionned in IotMarker
 * @param layer - (optionnal) the layer the marker is displayed in
 * @param popup - (optionnal) popup elements (see Popup)
 * @param tab - (optionnal) tab elements (see Tab)
 * @param shape - (optionnal) shape elements (see Shape)
 * @param inner - (optionnal) inner elements (see Inner)
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
 * @param content - (mandatory) the html code to display in cluster tab
 * @param type - (optionnal) the cluster tab width. (see TabType)
 */
export interface LayerTemplate {
  [layerName: string]: {
    content: string,
    type?: TabType
  }
}

/**
 * * Path
 *
 * @param id - (mandatory) id of the path (used to update path for exemple)
 * @param color - (optionnal) color of the path (blue is default)
 * @param type - (mandatory) At least 2 points to define a path
 */
export interface IotPath {
  id: string,
  color?: string
  points: Location[]
  middlePos?: Location[]
  sidePath?: {
    points: Location[]
    color: string
    line: number
  }[]
}
