/*
* Software Name : IotMapManager
* Version: 0.5.6
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
import {MarkerStatus, MarkerTemplate, ShapeType} from './iotMapManagerTypes';

export class IotMapManagerConfig {
  private static instance: IotMapManagerConfig;
  private constructor() { }

  /*
   *** Default configuration definition :
   */
  map: any = {
    defaultLat: 44.8888929,
    defaultLng: 4.8849108,
    defaultZoomLevel: 15,
    defaultLayerName: 'default',
    clusterRadius: 100,
    externalClustering: false,
    layerControl: true,

    // *** Private conf: not modified by SetConfig ***
    // tslint:disable-next-line:max-line-length
    geoportailLayer: 'https://wxs.ign.fr/{apikey}/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}',
    openStreetMapLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  };

  markers: any = {
    default: {
      shape: {
        type: ShapeType.circle,
        anchored: true,
        plain: true,
        color: 'black',
      },
      inner: {
        color: 'white'
      }
    },

    // *** Private conf: not modified by SetConfig ***
    font: {
      family: 'Helvetica Neue',
      weight: 'bold'
    },
    size: {
      fullSvgWidth: 100,
      fullSvgHeight: 100,
      selected: {
        svgWidth: 66,
        svgHeight: 66,
        anchoredHeight: 8,
        fontSize: 44,
        gaugeRadius: 27,
        gaugeWidth: 6
      },
      unselectedSquare: {
        svgWidth: 44,
        svgHeight: 44,
        anchoredHeight: 10,
        fontSize: 30
      },
      unselectedCircle: {
        svgWidth: 46,
        svgHeight: 46,
        anchoredHeight: 8,
        fontSize: 30,
        gaugeRadius: 19,
        gaugeWidth: 4
      }
    }
  };

  markerStatus: MarkerStatus = {
    'Positive': {
      shape: {
        color: '#32C832'
      },
      inner: {
        color: 'black'
      },
      name: {
        singular: 'positive',
        plural: 'positive'
      }
    },
    'Neutral': {
      shape: {
        color: '#527EDB'
      },
      inner: {
        color: 'white'
      },
      name: {
        singular: 'neutral',
        plural: 'neutral'
      }
    },
    'Warning': {
      shape: {
        color: '#FFCC00'
      },
      inner: {
        color: 'black'
      },
      name: {
        singular: 'in warning',
        plural: 'in warning'
      }
    },
    'Alert': {
      shape: {
        color: '#CD3C14'
      },
      inner: {
        color: 'white'
      },
      name: {
        singular: 'in alert',
        plural: 'in alert'
      }
    },
    'Inactive': {
      shape: {
        color: '#CCCCCC'
      },
      inner: {
        color: 'black'
      },
      name: {
        singular: 'inactive',
        plural: 'inactive'
      }
    },
    'FoodAndDrink': {
      shape: {
        color: '#467e74'
      },
      inner: {
        color: 'white'
      },
      name: {
        singular: 'food and drink',
        plural: 'food and drink'
      }
    },
    'Shopping': {
      shape: {
        color: '#b8860b'
      },
      inner: {
        color: 'black'
      },
      name: {
        singular: 'shopping',
        plural: 'shopping'
      }
    },
    'Health': {
      shape: {
        color: '#d24d57'
      },
      inner: {
        color: 'black'
      },
      name: {
        singular: 'health',
        plural: 'health'
      }
    },
    'Entertainment': {
      shape: {
        color: '#886288'
      },
      inner: {
        color: 'white'
      },
      name: {
        singular: 'entertainment',
        plural: 'entertainment'
      }
    },
    'Services': {
      shape: {
        color: '#526e91'
      },
      inner: {
        color: 'white'
      },
      name: {
        singular: 'service',
        plural: 'services'
      }
    },
    'CivilServiceWorship': {
      shape: {
        color: '#874b0e'
      },
      inner: {
        color: 'white'
      },
      name: {
        singular: 'civil service / worship',
        plural: 'civil service / worship'
      }
    },
    'Outdoor': {
      shape: {
        color: '#176129'
      },
      inner: {
        color: 'white'
      },
      name: {
        singular: 'outdoor',
        plural: 'outdoor'
      }
    },
    'Transport': {
      shape: {
        color: '#19a0b8'
      },
      inner: {
        color: 'black'
      },
      name: {
        singular: 'transport',
        plural: 'transports'
      }
    }
  };

  markerTemplates: MarkerTemplate = {
    'circle': {
      shape: {
        type: ShapeType.circle,
        anchored: true,
        color: '#477ddf'
      },
      inner: {
        color: 'white'
      }
    },
    'square': {
      shape: {
        type: ShapeType.square,
        plain: false,
        color: '#477ddf'
      },
      inner: {
        color: 'white'
      }
    },
    'poi': {
      shape: {
        type: ShapeType.square,
        plain: true,
        color: '#6180a2'
      },
      inner: {
        color: 'white'
      }
    }
  }
  // *** Private conf: not modified by SetConfig ***
  clusters: any = {
    size: {
      fullSvgWidth: 200,
      fullSvgHeight: 200,
      svgWidth: 150,
      svgHeight: 150
    },
    gauge: {
      startAngle: -90,
      radius: 62
    },
    defaultColor: 'black'
  };

  userMarker: any = {
    size: {
      fullSvgWidth: 100,
      fullSvgHeight: 100,
      svgWidth: 68,
      svgHeight: 68
    }
  };

  accuracyCircle: any = {
    color: 'none',
    fillColor: '#527EDB',
    fillOpacity: 0.15
  };



  /***
   * Functions
   */
  public static getConfig(): IotMapManagerConfig {
    if (!IotMapManagerConfig.instance) {
      IotMapManagerConfig.instance = new IotMapManagerConfig();
    }

    return IotMapManagerConfig.instance;
  }

  public static setConfig(newConfig: any) {
    /*
     *** MAP ***
    */
    if (newConfig.map !== undefined) {
      if (newConfig.map.defaultLat !== undefined) {
        this.instance.map.defaultLat = newConfig.map.defaultLat;
      }
      if (newConfig.map.defaultLon !== undefined) {
        this.instance.map.defaultLon = newConfig.map.defaultLon;
      }
      if (newConfig.map.defaultZoomLevel !== undefined) {
        this.instance.map.defaultZoomLevel = newConfig.map.defaultZoomLevel;
      }
      if (newConfig.map.clusterRadius !== undefined) {
        this.instance.map.clusterRadius = newConfig.map.clusterRadius;
      }
      if (newConfig.map.externalClustering !== undefined) {
        this.instance.map.externalClustering = newConfig.map.externalClustering;
      }
      if (newConfig.map.layerControl !== undefined) {
        this.instance.map.layerControl = newConfig.map.layerControl;
      }
    }

    /*
     *** MARKERS ***
    */
    if (newConfig.markers !== undefined) {
      if (newConfig.markers.default !== undefined) {
        if (newConfig.markers.default.shape !== undefined) {
          if (newConfig.markers.default.shape.type !== undefined) {
            this.instance.markers.default.shape.type = newConfig.markers.default.shape.type;
          }
          if (newConfig.markers.default.shape.anchored !== undefined) {
            this.instance.markers.default.shape.anchored = newConfig.markers.default.shape.anchored;
          }
          if (newConfig.markers.default.shape.plain !== undefined) {
            this.instance.markers.default.shape.plain = newConfig.markers.default.shape.plain;
          }
          if (newConfig.markers.default.shape.color !== undefined) {
            this.instance.markers.default.shape.color = newConfig.markers.default.shape.color;
          }
        }
        if (newConfig.markers.default.inner !== undefined) {
          if (newConfig.markers.default.inner.color !== undefined) {
            this.instance.markers.default.inner.color = newConfig.markers.default.inner.color;
          }
        }
      }
    }

    /*
     *** MARKER STATUS
    */
    if (newConfig.markerStatus !== undefined) {
      for (const status in newConfig.markerStatus) {
        if (newConfig.markerStatus[status] !== undefined) {
          this.instance.markerStatus[status] = newConfig.markerStatus[status];
        }
      }
    }

    /*
     *** MARKER TEMPLATES
     */
    if (newConfig.markerTemplates !== undefined) {
      for (const template in newConfig.markerTemplates) {
        if (newConfig.markerTemplates[template] !== undefined) {
          this.instance.markerTemplates[template] = newConfig.markerTemplates[template];
        }
      }
    }

    /*
     *** ACCURACY CIRCLE
     */
    if (newConfig.accuracyCircle !== undefined) {
      if (newConfig.accuracyCircle.color !== undefined) {
        this.instance.accuracyCircle.color = newConfig.accuracyCircle.color;
      }
      if (newConfig.accuracyCircle.fillColor !== undefined) {
        this.instance.accuracyCircle.fillColor = newConfig.accuracyCircle.fillColor;
      }
      if (newConfig.accuracyCircle.fillOpacity !== undefined) {
        this.instance.accuracyCircle.fillOpacity = newConfig.accuracyCircle.fillOpacity;
      }
    }
  }
}
