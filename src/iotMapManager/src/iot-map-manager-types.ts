/*
* Software Name : IotMapManager
* Version: 1.0.0
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

interface Location {
  lat: number
  lng: number
}

interface GeolocMarker {
  location: Location
}

export enum ShapeType { circle, square} // eslint-disable-line no-unused-vars

export class CustomDataMarker<T extends GeolocMarker> extends L.Marker {
  data: T

  constructor (data: T, options?: L.MarkerOptions) {
    super(data.location, options)
    this.setData(data)
  }

  getData (): T {
    return this.data
  }

  setData (data: T) {
    this.data = data
  }
}

interface Popup {
  title?: string
  body?: string
}

interface Tab {
  icon?: string
  text?: string
  color?: string
}

interface Shape {
  type?: ShapeType
  anchored?: boolean
  plain?: boolean
  color?: string
  percent?: number
  accuracy?: number
}

interface Inner {
  color?: string

  icon?: string
  // *** OR ***
  label?: string
}

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

export interface IotUserMarker extends GeolocMarker {
  direction?: number
  accuracy?: number
}

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

export interface MarkerTemplate {
  [template: string]: {
    layer?: string
    popup?: Popup
    tab?: Tab
    shape?: Shape
    inner?: Inner
  }
}

export interface LayerTemplate {
  [layerName: string]: {
    icon?: string
    label?: string
    color?: string
  }
}
