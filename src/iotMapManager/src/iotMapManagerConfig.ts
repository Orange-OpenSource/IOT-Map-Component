/*
* Software Name : IotMapManager
* Version: 0.5.4
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
import {markerType} from './iotMapManagerTypes';

export interface MarkerStatus {
  [state: string]: {
    stateColor: string;
    innerColor: string;
    singularState: string;
    pluralState: string;
  };
}

export interface MarkerTemplate {
  [template: string]: {
    layer?: string;
    shape?: {
      type?: markerType;
      anchored?: boolean;
      plain?: boolean;
      color?: string;
    };
    inner?: {
      color?: string;

      icon?: string;
      // *** OR ***
      label?: string;
    };
  }
}

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
        type: markerType.circle,
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

  markerStatus = {
    'Positive': {
      stateColor: '#32C832',
      innerColor: '#527EDB',
      singularState: 'Positive',
      pluralState: 'Positives'
    },
    'Neutral': {
      stateColor: '#527EDB',
      innerColor: '#FFCC00',
      singularState: 'Neutral',
      pluralState: 'Neutrals'
    },
    'Warning': {
      stateColor: '#FFCC00',
      innerColor: '#CD3C14',
      singularState: 'Warning',
      pluralState: 'Warnings'
    },
    'Alert': {
      stateColor: '#CD3C14',
      innerColor: '#CCCCCC',
      singularState: 'Alert',
      pluralState: 'Alerts'
    },
    'Inactive': {
      stateColor: '#CCCCCC',
      innerColor: '#32C832',
      singularState: 'Inactive',
      pluralState: 'Inactives'
    }
  };

  markerTemplates = {
    'Temperature': {
      layer: 'temperature',
      shape: {
        type: markerType.circle,
        anchored: true,
        plain: true
      },
      inner: {
        icon: 'iotmap-icons-temperature'
      }
    },
    'Monument': {
      layer: 'Monument',
      shape: {
        type: markerType.poi,
        anchored: true
      },
      inner: {
        label: 'M'
      }
    },
    'Vehicle': {
      layer: 'Vehicle',
      shape: {
        type: markerType.circle,
        anchored: true
      },
      inner: {
        icon: 'iotmap-icons-Car_pooling'
      }
    }

  }
  // *** Private conf: not modified by SetConfig ***
  clusters: any = {
    size: {
      fullSvgWidth: 200,
      fullSvgHeight: 200,
      svgWidth: 150,
      svgHeight: 150,
      fontSize: 44
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

  popupFont: any = {
    color: 'black',
    titleSize: '20px',
    bodySize: '14px',
    fontFamily: 'Helvetica Neue',
    fontWeight: 'bold'
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
      for (const state in newConfig.markerStatus) {
        if (newConfig.markerStatus[state] !== undefined) {
          this.instance.markerStatus[state] = newConfig.markerStatus[state];
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
