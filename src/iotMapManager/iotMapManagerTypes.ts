/*
* Software Name : IotMapManager
* Version: 0.4.4
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

import * as L from 'leaflet';

export enum markerType { circle, square, poi}

export class CustomDataMarker extends L.Marker {
  data: any;

  constructor(data: any, options?: L.MarkerOptions) {
    super(data.location, options);
    this.setData(data);
  }

  getData() {
    return this.data;
  }

  setData(data: any) {
    this.data = data;
  }
}

export interface IotMarker {
  id: string;
  location: {
    lat: number;
    lng: number;
  };
  layer?: string;
  popup?: string;
  status?: string;
  shape?: {
    type?: markerType;
    anchored?: boolean;
    plain?: boolean;
    color?: string;
    percent?: number;
    accuracy?: number;
  };
  inner?: {
    color?: string;

    icon?: string;
    // *** OR ***
    label?: string;
  };

}


export interface IotCluster {
  id: string;
  location: {
    lat: number;
    lng: number
  };
  contentLabel: string;
  childCount: number;
  aggregation: {
    singularState: string;
    pluralState: string;
    count: number;
    color: string
  }[];
}


export interface IotUserMarker {
  location: {
    lat: number;
    lng: number
  };
  direction?: number;
  accuracy?: number;
}
