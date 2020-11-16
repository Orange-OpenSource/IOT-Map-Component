/*
* Software Name : IotMapManager
* Version: 0.2.4
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

export class IotMapManagerConfig {
  static map: any = {
    DEFAULT_LAT: 44.8888929,
    DEFAULT_LON: 4.8849108,
    DEFAULT_ZOOM_LEVEL: 15,
    CLUSTER_SIZE: 75,
    // tslint:disable-next-line:max-line-length
    geoportailLayer: 'https://wxs.ign.fr/{apikey}/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}',
    openStreetMapLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  };

  static markers: any = {
    default: {
      shape: 'circle',
      color: 'black',
      anchored: true,
      plain: true
    },
    size: {
      fullSvgWidth: 100,
      fullSvgHeight: 100,
      unselectedSvgWidth: 44,
      unselectedSvgHeight: 44,
      selectedSvgWidth: 64,
      selectedSvgHeight: 64,
      anchorHeight: 10
    },

    circles: {
      borderColor: 'white',
      backgroundColor: 'white'
    },

    square: {
      borderColor: 'white',
      backgroundColor: 'white'
    },

    poi: {
      borderColor: 'white'
    }
  };

  static cluster: any = {
    iconSize: 64,
    circleLayer: {
    },
    squareLayer: {
    },
    poiLayer: {
    }
  };
}
