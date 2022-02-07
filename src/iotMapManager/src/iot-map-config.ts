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

import { MarkerStatus, MarkerTemplate, ShapeType, LayerTemplate, TabType } from './iot-map-types'

export class IotMapConfig {
  /*
   *** Default configuration definition :
   */
  map: any = { // eslint-disable-line @typescript-eslint/no-explicit-any
    defaultLat: 44.8888929,
    defaultLng: 4.8849108,
    defaultZoomLevel: 15,
    defaultLayerName: 'default',
    clusterRadius: 100,
    externalClustering: false,
    layerControl: true,
    exclusiveLayers: false,

    // *** Private conf: not modified by SetConfig ***
    geoportailLayer: 'https://wxs.ign.fr/{apikey}/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}',
    openStreetMapLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  }

  markers: any = { // eslint-disable-line @typescript-eslint/no-explicit-any
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
      },
      directionArrow: {
        fullWidth: 90,
        fullHeight: 90,
        width: 16,
        height: 16
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
        color: 'black'
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

  layerTemplates: LayerTemplate = {
    'vehicles': { // eslint-disable-line quote-props
      content: `<span class='iotmap-icons-vehicle'></span>`, // eslint-disable-line quotes
      type: TabType.large
    }
  }

  accuracyCircle: any = { // eslint-disable-line @typescript-eslint/no-explicit-any
    color: 'none',
    fillColor: '#527EDB',
    fillOpacity: 0.15,
    layerName: 'Accuracy'
  }

  // *** Private conf: not modified by SetConfig ***
  clusters: any = { // eslint-disable-line @typescript-eslint/no-explicit-any
    size: 50,
    gauge: {
      startAngle: -90,
      radius: 20
    },
    defaultColor: 'black'
  }

  userMarker: any = { // eslint-disable-line @typescript-eslint/no-explicit-any
    size: 22,
    arrow: {
      size: 32,
      startAngle: -45
    },
    layerName: 'UserMarker'
  }

  path: any = { // eslint-disable-line @typescript-eslint/no-explicit-any
    layerName: 'Paths',
    color: '#527EDB',
    width: 8,
    markerSize: 24
  }

  area: any = { // eslint-disable-line @typescript-eslint/no-explicit-any
    layerName: 'Areas',
    color: '#886288',
    fillColor: '#886288',
    fillOpacity: 0.4
  }

  /**
   * Update current configuration with new values for some entries
   * @remarks some configuration entries are private and can not be modified
   *
   * @param newConfig - a structure containing entries to update in current configuration
   *
   */
  public setConfig (newConfig: Partial<IotMapConfig>): void {
    /*
     *** MAP ***
    */
    if (newConfig.map !== undefined) {
      if (newConfig.map.defaultLat !== undefined) {
        this.map.defaultLat = newConfig.map.defaultLat
      }
      if (newConfig.map.defaultLng !== undefined) {
        this.map.defaultLng = newConfig.map.defaultLng
      }
      if (newConfig.map.defaultZoomLevel !== undefined) {
        this.map.defaultZoomLevel = newConfig.map.defaultZoomLevel
      }
      if (newConfig.map.defaultLayerName !== undefined) {
        this.map.defaultLayerName = newConfig.map.defaultLayerName
      }
      if (newConfig.map.clusterRadius !== undefined) {
        this.map.clusterRadius = newConfig.map.clusterRadius
      }
      if (newConfig.map.externalClustering !== undefined) {
        this.map.externalClustering = newConfig.map.externalClustering
      }
      if (newConfig.map.layerControl !== undefined) {
        this.map.layerControl = newConfig.map.layerControl
      }
      if (newConfig.map.exclusiveLayers !== undefined) {
        this.map.exclusiveLayers = newConfig.map.exclusiveLayers
      }
    }

    /*
     *** MARKERS ***
    */
    if (newConfig.markers !== undefined) {
      if (newConfig.markers.default !== undefined) {
        if (newConfig.markers.default.shape !== undefined) {
          if (newConfig.markers.default.shape.type !== undefined) {
            this.markers.default.shape.type = newConfig.markers.default.shape.type
          }
          if (newConfig.markers.default.shape.anchored !== undefined) {
            this.markers.default.shape.anchored = newConfig.markers.default.shape.anchored
          }
          if (newConfig.markers.default.shape.plain !== undefined) {
            this.markers.default.shape.plain = newConfig.markers.default.shape.plain
          }
          if (newConfig.markers.default.shape.color !== undefined) {
            this.markers.default.shape.color = newConfig.markers.default.shape.color
          }
        }
        if (newConfig.markers.default.inner !== undefined) {
          if (newConfig.markers.default.inner.color !== undefined) {
            this.markers.default.inner.color = newConfig.markers.default.inner.color
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
          this.markerStatus[status] = {
            name: newConfig.markerStatus[status].name ?? this.markerStatus[status]?.name,
            layer: newConfig.markerStatus[status].layer ?? this.markerStatus[status]?.layer,
            popup: newConfig.markerStatus[status].popup ?? this.markerStatus[status]?.popup,
            tab: newConfig.markerStatus[status].tab ?? this.markerStatus[status]?.tab,
            shape: newConfig.markerStatus[status].shape ?? this.markerStatus[status]?.shape,
            inner: newConfig.markerStatus[status].inner ?? this.markerStatus[status]?.inner,
            bullet: newConfig.markerStatus[status].bullet ?? this.markerStatus[status]?.bullet,
            url: newConfig.markerStatus[status].url ?? this.markerStatus[status]?.url,
            urlTarget: newConfig.markerStatus[status].urlTarget ?? this.markerStatus[status]?.urlTarget
          }
        }
      }
    }

    /*
     *** MARKER TEMPLATES
     */
    if (newConfig.markerTemplates !== undefined) {
      for (const template in newConfig.markerTemplates) {
        if (newConfig.markerTemplates[template] !== undefined) {
          this.markerTemplates[template] = {
            layer: newConfig.markerTemplates[template].layer ?? this.markerTemplates[template]?.layer,
            inner: newConfig.markerTemplates[template].inner ?? this.markerTemplates[template]?.inner,
            shape: newConfig.markerTemplates[template].shape ?? this.markerTemplates[template]?.shape,
            popup: newConfig.markerTemplates[template].popup ?? this.markerTemplates[template]?.popup,
            tab: newConfig.markerTemplates[template].tab ?? this.markerTemplates[template]?.tab
          }
        }
      }
    }

    /*
     *** LAYER TEMPLATES
     */
    if (newConfig.layerTemplates !== undefined) {
      for (const template in newConfig.layerTemplates) {
        if (newConfig.layerTemplates[template] !== undefined) {
          this.layerTemplates[template] = {
            content: newConfig.layerTemplates[template].content ?? this.layerTemplates[template]?.content,
            type: newConfig.layerTemplates[template].type ?? this.layerTemplates[template]?.type,
            popupColNumber: newConfig.layerTemplates[template].popupColNumber ?? this.layerTemplates[template]?.popupColNumber
          }
        }
      }
    }

    /*
     *** ACCURACY CIRCLE
     */
    if (newConfig.accuracyCircle !== undefined) {
      if (newConfig.accuracyCircle.layerName !== undefined) {
        this.accuracyCircle.layerName = newConfig.accuracyCircle.layerName
      }
      if (newConfig.accuracyCircle.color !== undefined) {
        this.accuracyCircle.color = newConfig.accuracyCircle.color
      }
      if (newConfig.accuracyCircle.fillColor !== undefined) {
        this.accuracyCircle.fillColor = newConfig.accuracyCircle.fillColor
      }
      if (newConfig.accuracyCircle.fillOpacity !== undefined) {
        this.accuracyCircle.fillOpacity = newConfig.accuracyCircle.fillOpacity
      }
    }

    /*
     *** CLUSTERS
     */
    if (newConfig.clusters !== undefined) {
      this.clusters.defaultColor ??= newConfig.clusters.defaultColor
    }

    /*
     *** USER MARKER
     */
    if (newConfig.userMarker !== undefined) {
      this.userMarker.layerName ??= newConfig.userMarker.layerName
    }

    /*
     *** PATHS
     */
    if (newConfig.path !== undefined) {
      this.path.layerName ??= newConfig.path.layerName
      this.path.color ??= newConfig.path.color
      this.path.width ??= newConfig.path.width
    }

    /*
     *** AREAS
     */
    if (newConfig.area !== undefined) {
      this.area.layerName ??= newConfig.area.layerName
      this.area.color ??= newConfig.area.color
      this.area.fillColor ??= newConfig.area.fillColor
      this.area.fillOpacity ??= newConfig.area.fillOpacity
    }
  }
}
