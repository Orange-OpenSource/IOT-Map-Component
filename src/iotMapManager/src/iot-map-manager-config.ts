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
import { MarkerStatus, MarkerTemplate, ShapeType, LayerTemplate } from './iot-map-manager-types'

export class IotMapManagerConfig {
  private static instance: IotMapManagerConfig

  /*
   *** Default configuration definition :
   */
  map = {
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
  }

  markers = {
    default: {
      shape: {
        type: ShapeType.circle,
        anchored: true,
        plain: true,
        color: 'black'
      },
      inner: {
        color: 'white'
      }
    },

    // *** Private conf: not modified by SetConfig ***
    font: {
      family: 'Helvetica Neue',
      weight: 'bold',
      color: 'black'
    },
    size: {
      selected: {
        origin: {
          fullWidth: 100,
          fullHeight: 100,
          width: 66,
          height: 66,
          anchorHeight: 8,
          gauge: {
            radius: 27,
            width: 6,
            startAngle: -90
          }
        },
        width: 50,
        height: 50,
        anchorHeight: 5,
        fontSize: 26
      },
      unselectedSquare: {
        origin: {
          fullWidth: 100,
          fullHeight: 100,
          width: 44,
          height: 44,
          anchorHeight: 10,
          gauge: {
            radius: 0,
            width: 0,
            startAngle: 0
          }
        },
        width: 30,
        height: 30,
        anchorHeight: 7,
        fontSize: 20
      },
      unselectedCircle: {
        origin: {
          fullWidth: 100,
          fullHeight: 100,
          width: 46,
          height: 46,
          anchorHeight: 8,
          gauge: {
            radius: 18,
            width: 4,
            startAngle: -90
          }
        },
        width: 30,
        height: 30,
        anchorHeight: 6,
        fontSize: 18
      }
    }
  }

  markerStatus: MarkerStatus = {
    'positive': { // eslint-disable-line quote-props
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
    'neutral': { // eslint-disable-line quote-props
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
    'warning': { // eslint-disable-line quote-props
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
    'alert': { // eslint-disable-line quote-props
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
    'inactive': { // eslint-disable-line quote-props
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
    'foodAndDrink': { // eslint-disable-line quote-props
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
    'shopping': { // eslint-disable-line quote-props
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
    'health': { // eslint-disable-line quote-props
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
    'entertainment': { // eslint-disable-line quote-props
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
    'services': { // eslint-disable-line quote-props
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
    'civilServiceWorship': { // eslint-disable-line quote-props
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
    'outdoor': { // eslint-disable-line quote-props
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
    'transport': { // eslint-disable-line quote-props
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
  }

  markerTemplates: MarkerTemplate = {
    'circle': { // eslint-disable-line quote-props
      shape: {
        type: ShapeType.circle,
        anchored: true,
        color: '#477ddf'
      },
      inner: {
        color: 'white'
      }
    },
    'square': { // eslint-disable-line quote-props
      shape: {
        type: ShapeType.square,
        plain: false,
        color: '#477ddf'
      },
      inner: {
        color: 'white'
      }
    },
    'poi': { // eslint-disable-line quote-props
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

  // layers template
  layerTemplates: LayerTemplate = {
    'vehicle': { // eslint-disable-line quote-props
      icon: 'iotmap-icons-vehicle',
      color: 'black'
    },
    'entertainment': { // eslint-disable-line quote-props
      icon: 'iotmap-icons-Entertainment_channel',
      color: 'black'
    }
  }

  // *** Private conf: not modified by SetConfig ***
  clusters = {
    size: 50,
    gauge: {
      startAngle: -90,
      radius: 20
    },
    defaultColor: 'black'
  }

  userMarker = {
    size: 22,
    arrow: {
      size: 32,
      startAngle: -45
    }
  }

  accuracyCircle = {
    color: 'none',
    fillColor: '#527EDB',
    fillOpacity: 0.15
  }

  /***
   * Functions
   */
  public static getConfig (): IotMapManagerConfig {
    if (!IotMapManagerConfig.instance) {
      IotMapManagerConfig.instance = new IotMapManagerConfig()
    }

    return IotMapManagerConfig.instance
  }

  public static setConfig (newConfig: Partial<IotMapManagerConfig>) {
    /*
     *** MAP ***
    */
    if (newConfig.map !== undefined) {
      if (newConfig.map.defaultLat !== undefined) {
        this.instance.map.defaultLat = newConfig.map.defaultLat
      }
      if (newConfig.map.defaultLng !== undefined) {
        this.instance.map.defaultLng = newConfig.map.defaultLng
      }
      if (newConfig.map.defaultZoomLevel !== undefined) {
        this.instance.map.defaultZoomLevel = newConfig.map.defaultZoomLevel
      }
      if (newConfig.map.clusterRadius !== undefined) {
        this.instance.map.clusterRadius = newConfig.map.clusterRadius
      }
      if (newConfig.map.externalClustering !== undefined) {
        this.instance.map.externalClustering = newConfig.map.externalClustering
      }
      if (newConfig.map.layerControl !== undefined) {
        this.instance.map.layerControl = newConfig.map.layerControl
      }
    }

    /*
     *** MARKERS ***
    */
    if (newConfig.markers !== undefined) {
      if (newConfig.markers.default !== undefined) {
        if (newConfig.markers.default.shape !== undefined) {
          if (newConfig.markers.default.shape.type !== undefined) {
            this.instance.markers.default.shape.type = newConfig.markers.default.shape.type
          }
          if (newConfig.markers.default.shape.anchored !== undefined) {
            this.instance.markers.default.shape.anchored = newConfig.markers.default.shape.anchored
          }
          if (newConfig.markers.default.shape.plain !== undefined) {
            this.instance.markers.default.shape.plain = newConfig.markers.default.shape.plain
          }
          if (newConfig.markers.default.shape.color !== undefined) {
            this.instance.markers.default.shape.color = newConfig.markers.default.shape.color
          }
        }
        if (newConfig.markers.default.inner !== undefined) {
          if (newConfig.markers.default.inner.color !== undefined) {
            this.instance.markers.default.inner.color = newConfig.markers.default.inner.color
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
          this.instance.markerStatus[status] = newConfig.markerStatus[status]
        }
      }
    }

    /*
     *** MARKER TEMPLATES
     */
    if (newConfig.markerTemplates !== undefined) {
      for (const template in newConfig.markerTemplates) {
        if (newConfig.markerTemplates[template] !== undefined) {
          this.instance.markerTemplates[template] = newConfig.markerTemplates[template]
        }
      }
    }

    /*
     *** ACCURACY CIRCLE
     */
    if (newConfig.accuracyCircle !== undefined) {
      if (newConfig.accuracyCircle.color !== undefined) {
        this.instance.accuracyCircle.color = newConfig.accuracyCircle.color
      }
      if (newConfig.accuracyCircle.fillColor !== undefined) {
        this.instance.accuracyCircle.fillColor = newConfig.accuracyCircle.fillColor
      }
      if (newConfig.accuracyCircle.fillOpacity !== undefined) {
        this.instance.accuracyCircle.fillOpacity = newConfig.accuracyCircle.fillOpacity
      }
    }
  }
}
