/*
* Software Name : IotMapManager
* Version: 0.5.3
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
import 'leaflet.markercluster';
import { IotMapMarkers } from './iotMapMarkers';
import { IotMapUserMarker } from './iotMapUserMarkers';
import { IotMapClusters } from './iotMapClusters';
import { IotMapManagerConfig } from './iotMapManagerConfig';
import { IotMarker, IotCluster, IotUserMarker, CustomDataMarker } from './iotMapManagerTypes';


const CLUSTER_LAYER = 'Clusters';
const ACCURACY_LAYER = 'Accuracy';
const USERMARKER_LAYER = 'UserMarker';


export class IotMapManager {
  private map: L.Map;
  private iotMapMarkers: IotMapMarkers;
  private iotMapClusters: IotMapClusters;
  private iotMapUserMarkers: IotMapUserMarker;
  private config: IotMapManagerConfig;
  private markersObjects: any = {};
  private accuracyObjects: any = {};
  private userMarkerObject: CustomDataMarker;   // only one user marker
  private userMarkerAccuracy: L.Circle;

  private baseLayers: any = {};
  private markersLayers: any = {};
  private selectedMarkerId = '';
  private layerControl: L.Control;

  constructor() {
    this.iotMapMarkers = new IotMapMarkers();
    this.iotMapClusters = new IotMapClusters();
    this.iotMapUserMarkers = new IotMapUserMarker();
    this.config = IotMapManagerConfig.getConfig();
  }

  // ------------------------------------------------------------------------------------------------------------------
  // ---------- INIT --------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------------
  // handler for 'moveend'
  public onMove?: () => void;

  public init(selector) {
    // init map
    this.map = L.map(selector).setView(L.latLng(this.config.map.defaultLat, this.config.map.defaultLng),
      this.config.map.defaultZoomLevel);

    // init base layers
    const defaultLayer = L.tileLayer(this.config.map.openStreetMapLayer, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    /*const geoportailLayer = L.tileLayer.wms(this.config.map.geoportailLayer, {
      attribution: '<a target="_blank" href="https://www.geoportail.gouv.fr/">Geoportail France</a>',
      format: 'image/jpeg',
      styles: 'normal'
    }).addTo(this.map);*/

    this.baseLayers = {
      'Standard': defaultLayer/*,
      "Satellite": geoportailLayer*/
    };

    if (this.config.map.layerControl) {
      this.layerControl = L.control.layers(this.baseLayers, this.markersLayers).addTo(this.map);
    }

    this.map.on('moveend', this.onMove);
  }

  private initMarkerLayer(layerName) {
    if (this.config.map.layerControl) {
      this.map.removeControl(this.layerControl);
    }
    // create layer
    let layer: L.MarkerClusterGroup | L.FeatureGroup;
    if (this.config.map.externalClustering || layerName === ACCURACY_LAYER) {
      layer = new L.FeatureGroup();
    } else {
      layer = L.markerClusterGroup({
        maxClusterRadius: this.config.map.clusterRadius,
        showCoverageOnHover: false,
        iconCreateFunction: this.defineClusterIcon.bind(this)
      });

      layer.on('animationend', this.onZoom.bind(this));
    }
    this.map.addLayer(layer);
    this.markersLayers[layerName] = layer;
    if (this.config.map.layerControl) {
      this.layerControl = L.control.layers(this.baseLayers, this.markersLayers).addTo(this.map);
    }

    // manage events
    layer.on('click', this.onMarkerClick.bind(this)
    //).on('clustermouseover', this.onClusterMouseOver.bind(this)
    //).on('clustermouseout', this.onClusterMouseOut.bind(this)
    );

    return layer;
  }

  private getMarkerLayer(layerName): L.MarkerClusterGroup | L.FeatureGroup {
    let layer: L.MarkerClusterGroup | L.FeatureGroup = this.markersLayers[layerName];
    if (!layer) {
      layer = this.initMarkerLayer(layerName);
    }
    return layer;
  }

  // ------------------------------------------------------------------------------------------------------------------
  // ---------- EVENTS ------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------------


  private onMarkerClick(event) {

    const markerObject = this.markersObjects[event.layer.getData().id];

    // select / unselect marker
    let html: L.DivIcon;
    // already selected => unselect it
    if (this.selectedMarkerId === markerObject.getData().id) {
      // update selected id
      this.selectedMarkerId = '';

      // get new html and update marker (=> unselect marker)
      html = this.iotMapMarkers.getMarker(markerObject.getData(), false);
      markerObject.setIcon(html);
      //this.map.closePopup();
    } else {  // new marker selected
      // --- unselect last selected marker ---
      if (this.selectedMarkerId !== '') {  // a marker was already selected
        const lastSelectedMarker = this.markersObjects[this.selectedMarkerId];

        // get new html and update marker (=> unselect marker)
        html = this.iotMapMarkers.getMarker(lastSelectedMarker.getData(), false);
        lastSelectedMarker.setIcon(html);
      }

      // --- select new marker ---
      if (event.layer.getData().aggregation === undefined) {  // not a manual cluster
        // update selected id
        this.selectedMarkerId = markerObject.getData().id;

        // get new html and update marker (=> select marker)
        html = this.iotMapMarkers.getMarker(markerObject.getData(), true);
        markerObject.setIcon(html);//.bindPopup(markerObject.getData().popup);
      }
    }
  }

  /*private onClusterMouseOver(cluster) {
    const currentCluster: IotCluster = this.leafletClusterToIotCluster(cluster.layer);

    // create popup
    L.popup({closeButton: false})
      .setLatLng(cluster.layer.getLatLng())
      .setContent(this.iotMapClusters.getClusterPopup(currentCluster))
      .openOn(this.map);
  }*/

  /*private onClusterMouseOut() {
    this.map.closePopup();
  }*/

  private onZoom() {
    for (const markerId in this.markersObjects) {
      if (this.markersObjects[markerId] !== undefined && this.markersObjects[markerId] !== null) {
        const marker = this.markersObjects[markerId].getData();
        if (this.map.hasLayer(this.markersObjects[markerId])) { // unclustered
          if (marker.shape.accuracy !== undefined) {
            // accuracy circle if needed
            const accuracy = this.accuracyObjects[markerId];
            if (!accuracy) {  // create accuracy circle
              const newCircle = L.circle(marker.location, {
                color: this.config.accuracyCircle.color,
                fillColor: this.config.accuracyCircle.fillColor,
                fillOpacity: this.config.accuracyCircle.fillOpacity,
                radius: marker.shape.accuracy
              });
              this.getMarkerLayer(ACCURACY_LAYER).addLayer(newCircle);
              this.accuracyObjects[markerId] = newCircle;
            }
          }
        } else {  // clustered
          if (marker.shape.accuracy !== undefined) {
            // accuracy circle if needed
            const accuracyToRemove: L.Circle = this.accuracyObjects[markerId];
            if (accuracyToRemove) {
              this.getMarkerLayer(ACCURACY_LAYER).removeLayer(accuracyToRemove);
              this.accuracyObjects[markerId] = null;
            }
          }
        }
      }
    }
  }

  // ------------------------------------------------------------------------------------------------------------------
  // ---------- MARKERS -----------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------------
  public addMarker(marker: IotMarker) {
    if (marker.id && marker.location) {
      // does id already exist ?
      if (this.markersObjects[marker.id] !== undefined && this.markersObjects[marker.id] !== null) {
        this.updateMarker(marker.id, marker);
      } else {
/*        // popup
        let popupText = marker.popup;
        if (!popupText) {
          popupText = `<span style="color: ` + this.config.popupFont.color + `;
                                  font-size: ` + this.config.popupFont.bodySize + `;
                                  font-family: ` + this.config.popupFont.fontFamily + `;
                                  font-weight: ` + this.config.popupFont.fontWeight + `;">`
            + marker.id + ((marker.status !== undefined) ? (' - ' + marker.status) : '')
            + `</span><br>`;
          marker.popup = popupText;
        }*/

        // force layer name if not present
        if (marker.layer === undefined) {
          marker.layer = this.config.map.defaultLayerName;
        }

        const newMarker: CustomDataMarker = new CustomDataMarker(
                                                      marker,
                                                      {icon: this.iotMapMarkers.getMarker(marker)}
                                                      );//.bindPopup(popupText);

        this.getMarkerLayer(marker.layer).addLayer(newMarker);
        this.markersObjects[marker.id] = newMarker;

        // accuracy circle if needed
        if (marker.shape.accuracy !== undefined) {
          const newCircle = L.circle(marker.location, {
            color: this.config.accuracyCircle.color,
            fillColor: this.config.accuracyCircle.fillColor,
            fillOpacity: this.config.accuracyCircle.fillOpacity,
            radius: marker.shape.accuracy
          });
          this.getMarkerLayer(ACCURACY_LAYER).addLayer(newCircle);
          this.accuracyObjects[marker.id] = newCircle;
        }
      }
    } else {
      console.log ('No id and/or no location defined for new marker. Unable to display');
    }
  }

  public addMarkers(markerList: IotMarker[]) {
    markerList.forEach(marker => {
       this.addMarker(marker);
    });
  }

  public removeMarker(markerId: string) {
    const markerToRemove: CustomDataMarker = this.markersObjects[markerId];
    if (markerToRemove) {
      this.getMarkerLayer(markerToRemove.getData().layer).removeLayer(markerToRemove);
      this.markersObjects[markerId] = null;

      const accuracyToRemove: L.Circle = this.accuracyObjects[markerId];
      if (accuracyToRemove) {
        this.getMarkerLayer(ACCURACY_LAYER).removeLayer(accuracyToRemove);
        this.accuracyObjects[markerId] = null;
      }
    }
  }

  public removeMarkers(markersId: string[]) {
    markersId.forEach(id => {
      this.removeMarker(id);
    });
  }

  public updateMarker(markerId: string, params: any) {
    const currentMarkerObject: CustomDataMarker  = this.markersObjects[markerId];

    if (currentMarkerObject) {
      const currentMarkerInfos: IotMarker = currentMarkerObject.getData();
      const currentMarkerIsSelected: boolean = (this.selectedMarkerId === currentMarkerInfos.id);

      let htmlModificationNeeded = false;
      let oldLayerName: string = null;

      // location modified
      if (params.location) {
        currentMarkerInfos.location = params.location;

        const newLatLng: L.LatLng = new L.LatLng(params.location.lat, params.location.lng);
        currentMarkerObject.setLatLng(newLatLng);

        // update accuracy circle
        const currentAccuracyCircle: L.Circle = this.accuracyObjects[markerId];
        if (currentAccuracyCircle) {
          currentAccuracyCircle.setLatLng(newLatLng);
        }
      }

      // popup modified
      if (params.popup) {
        currentMarkerInfos.popup = params.popup;
        htmlModificationNeeded = true;
      }

      // shape modified
      if (params.shape) {
        if (params.shape.type != null) {
          currentMarkerInfos.shape.type = params.shape.type;
        }
        if (params.shape.anchored != null) {
          currentMarkerInfos.shape.anchored = params.shape.anchored;
        }
        if (params.shape.plain != null) {
          currentMarkerInfos.shape.plain = params.shape.plain;
        }
        if (params.shape.color != null) {
          currentMarkerInfos.shape.color = params.shape.color;
        }
        if (params.shape.percent != null) {
          currentMarkerInfos.shape.percent = params.shape.percent;
        }

        htmlModificationNeeded = true;
      }

      // layer modified
      if (params.layer) {
        oldLayerName = currentMarkerInfos.layer;
        currentMarkerInfos.layer = params.layer;
      }

      // inner modified
      if (params.inner) {
        if (!currentMarkerInfos.inner) {
          currentMarkerInfos.inner = {
            color: this.config.markers.default.inner.color,
            label: ''}; // Default values
        }
        if (params.inner.color) {
          currentMarkerInfos.inner.color = params.inner.color;
        }
        if (params.inner.icon) {
          currentMarkerInfos.inner.icon = params.inner.icon;
          currentMarkerInfos.inner.label = '';
        } else if (params.inner.label) {
          currentMarkerInfos.inner.label = params.inner.label;
          currentMarkerInfos.inner.icon = '';
        }
        htmlModificationNeeded = true;
      }

      // status modified
      if (params.status) {
        currentMarkerInfos.status = params.status;

        htmlModificationNeeded = true;
      }

      // template modified
      if (params.template) {
        currentMarkerInfos.template = params.template;
        htmlModificationNeeded = true;
      }

      // update marker icon
      if (htmlModificationNeeded) {
        const html = this.iotMapMarkers.getMarker(currentMarkerInfos, currentMarkerIsSelected);
        currentMarkerObject.setIcon(html);
      }

      if (oldLayerName != null) {
        // remove  marker from previous layer
        this.getMarkerLayer(oldLayerName).removeLayer(currentMarkerObject);
        // add marker to new layer
        this.getMarkerLayer(currentMarkerInfos.layer).addLayer(currentMarkerObject);
      }

      // accuracy
      if (params.shape) {
        if (params.shape.accuracy !== undefined) {
          // update marker info
          currentMarkerInfos.shape.accuracy = params.shape.accuracy;

          // update accuracy layer
          const currentAccuracyCircle = this.accuracyObjects[currentMarkerInfos.id];
          if (currentAccuracyCircle !== undefined) {
            currentAccuracyCircle.setRadius(currentMarkerInfos.shape.accuracy);
          } else {
            const newCircle = L.circle(currentMarkerInfos.location, {
              color: 'none',
              fillColor: this.config.accuracyCircle.fillColor,
              fillOpacity: this.config.accuracyCircle.fillOpacity,
              radius: currentMarkerInfos.shape.accuracy
            });
            this.getMarkerLayer(ACCURACY_LAYER).addLayer(newCircle);
            this.accuracyObjects[currentMarkerInfos.id] = newCircle;
          }
        }
      }
    }
  }

  public updateAllMarkers(markerList: IotMarker[]) {
    // first : remove unused markers
    // create id list from new marker list
    const markersToUpdate: string[] = [];
    for (const marker of markerList) {
      markersToUpdate.push(marker.id);
    }

    for (const markerId in this.markersObjects) {
      if (!markersToUpdate.includes(markerId)) {
        this.removeMarker(markerId);
      }
    }

    // Now update / create new markers
    for (const marker of markerList) {
      if (this.markersObjects[marker.id] === undefined) {
        this.addMarker(marker);
      } else {
        this.updateMarker(marker.id, marker);
      }
    }
  }

  public redrawAll() {
    for (const layerName in this.markersLayers) {
      if (this.markersLayers[layerName] !== undefined) {
        this.markersLayers[layerName].clearLayers();
      }
    }

    // redraw markers and manual clusters
    for (const markerId in this.markersObjects) {
      if (this.markersObjects[markerId] != null) {
        const marker = this.markersObjects[markerId].getData();
        if (marker.childCount !== undefined) {   // marker is a manual cluster
          this.addCluster(marker);
        } else {
          this.addMarker(marker);
        }
      }
    }

    // redraw usermarker
    this.addUserMarker(this.userMarkerObject.getData());
  }

  // ------------------------------------------------------------------------------------------------------------------
  // ---------- CLUSTERS ----------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------------
  public getBounds(): L.LatLngBounds {
    return this.map.getBounds();
  }

  private defineClusterIcon(cluster) {
    const currentCluster: IotCluster = this.leafletClusterToIotCluster(cluster);
    return this.iotMapClusters.getClusterIcon(currentCluster);
  }

  public addCluster(cluster: IotCluster) {
    if (this.config.map.externalClustering) {
      if (cluster.id && cluster.location) {
        // popup
        //const popupText = this.iotMapClusters.getClusterPopup(cluster);
        const newCluster: CustomDataMarker = new CustomDataMarker(
          cluster,
          {icon: this.iotMapClusters.getClusterIcon(cluster)}
        );//.bindPopup(popupText);

        this.getMarkerLayer(CLUSTER_LAYER).addLayer(newCluster);
        this.markersObjects[cluster.id] = newCluster;
      } else {
        console.log ('No id and/or no location defined for new cluster. Unable to display');
      }
    }
  }

  public addClusters(clusters: IotCluster[]) {
    if (this.config.map.externalClustering) {
      for (const cluster of clusters) {
        this.addCluster(cluster);
      }
    }
  }

  public removeCluster(id: string) {
    if (this.config.map.externalClustering) {
      const clusterToRemove: CustomDataMarker = this.markersObjects[id];
      if (clusterToRemove) {
        this.getMarkerLayer(CLUSTER_LAYER).removeLayer(clusterToRemove);
        this.markersObjects[id] = null;
      }
    }
  }

  public removeClusters(ids: string[]) {
    if (this.config.map.externalClustering) {
      for (const id of ids) {
        this.removeCluster(id);
      }
    }
  }

  public updateCluster(clusterId: string, params: any) {
    if (this.config.map.externalClustering) {
      const currentClusterObject: CustomDataMarker = this.markersObjects[clusterId];

      if (currentClusterObject) {
        const currentClusterInfos: IotCluster = currentClusterObject.getData();

        let htmlModificationNeeded = false;

        // location modified
        if (params.location) {
          currentClusterInfos.location = params.location;

          const newLatLng: L.LatLng = new L.LatLng(params.location.lat, params.location.lng);
          currentClusterObject.setLatLng(newLatLng);
        }

        if (params.childCount) {
          currentClusterInfos.childCount = params.childCount;
          htmlModificationNeeded = true;
        }

        if (params.aggregation) {
          currentClusterInfos.aggregation = params.aggregation;
          htmlModificationNeeded = true;
        }

        // update cluster icon
        if (htmlModificationNeeded) {
          const html = this.iotMapClusters.getClusterIcon(currentClusterInfos);
          currentClusterObject.setIcon(html);
        }
      }
    }
  }

  public updateAllClusters(clusterList: IotCluster[]) {
    if (this.config.map.externalClustering) {
      // first : remove unused clusters
      // create id list from new clusters list
      const clustersToUpdate: string[] = [];
      for (const cluster of clusterList) {
        clustersToUpdate.push(cluster.id);
      }

      for (const clusterId in this.markersObjects) {
        if (!clustersToUpdate.includes(clusterId)) {
          this.removeCluster(clusterId);
        }
      }

      // Now update / create new clusters
      for (const cluster of clusterList) {
        if (this.markersObjects[cluster.id] === undefined) {
          this.addCluster(cluster);
        } else {
          this.updateCluster(cluster.id, cluster);
        }
      }
    }
  }


  /***
   * privates !
   */
  private leafletClusterToIotCluster(leafletCluster): IotCluster {
    // marker Distribution
    const tabDistribution: any = {};

    const allChildMarkers = leafletCluster.getAllChildMarkers();
    allChildMarkers.forEach(marker => {
      const state = (marker.getData().status) ? marker.getData().status : 'stateless';
      if (tabDistribution[state]) {
        tabDistribution[state] = {
          count: tabDistribution[state].count + 1,
          label: (marker.getData().status)
            ? this.config.markerStatus[marker.getData().status].pluralState
            : 'stateless'
        };
      } else {
        tabDistribution[state] = {
          count: 1,
          label: (marker.getData().status)
            ? this.config.markerStatus[marker.getData().status].singularState
            : 'stateless'
        };
      }
    });

    const layer = allChildMarkers[0].getData().layer;

    const currentCluster: IotCluster = {
      id: '',   // unused in automatic mode
      location: {lat: 0, lng: 0 }, // unused in automatic mode
      contentLabel: layer, // unused in automatic mode
      childCount: leafletCluster.getChildCount(),
      aggregation: []
    };
    let i = 0;
    for (const state in tabDistribution) {
      if (tabDistribution[state]) {
        currentCluster.aggregation[i] = {
          count: tabDistribution[state].count,
          color: (state === 'stateless') ? this.config.clusters.defaultColor : this.config.markerStatus[state].stateColor,
          singularState: tabDistribution[state].label,
          pluralState: tabDistribution[state].label
        };
        i++;
      }
    }

    return currentCluster;
  }


  /***
   * USER MARKER
   */

  public addUserMarker(userMarker: IotUserMarker) {
    if (userMarker.location) {
      if (this.userMarkerObject != null) {
        this.getMarkerLayer(USERMARKER_LAYER).clearLayers();
        this.getMarkerLayer(ACCURACY_LAYER).removeLayer(this.userMarkerAccuracy);
      }
      this.userMarkerObject = new CustomDataMarker(userMarker, {icon: this.iotMapUserMarkers.getMarker(userMarker)});
      this.getMarkerLayer(USERMARKER_LAYER).addLayer(this.userMarkerObject);

      // accuracy circle if needed
      if (userMarker.accuracy !== undefined) {
        this.userMarkerAccuracy = L.circle(userMarker.location, {
          color: this.config.accuracyCircle.color,
          fillColor: this.config.accuracyCircle.fillColor,
          fillOpacity: this.config.accuracyCircle.fillOpacity,
          radius: userMarker.accuracy
        });
        this.getMarkerLayer(ACCURACY_LAYER).addLayer(this.userMarkerAccuracy);
      }
    } else {
      console.log ('No location defined for userMarker. Unable to display');
    }
  }

  public removeUserMarker() {
    this.getMarkerLayer(USERMARKER_LAYER).removeLayer(this.userMarkerObject);
    delete this.userMarkerObject;

    this.getMarkerLayer(ACCURACY_LAYER).removeLayer(this.userMarkerAccuracy);
    delete this.userMarkerAccuracy;
  }

  public updateUserMarker(params: any) {
    if (this.userMarkerObject !== null) {
      const userMarkerInfo = this.userMarkerObject.getData();
      if (params.location !== undefined) {
        userMarkerInfo.location = params.location;

        const newLatLng: L.LatLng = new L.LatLng(params.location.lat, params.location.lng);
        this.userMarkerObject.setLatLng(newLatLng);
        this.userMarkerAccuracy.setLatLng(newLatLng);
      }

      if (params.direction !== undefined || (userMarkerInfo.direction !== undefined && params.direction === undefined)) {
        userMarkerInfo.direction = params.direction;

        // update icon
        const html = this.iotMapUserMarkers.getMarker(userMarkerInfo);
        this.userMarkerObject.setIcon(html);
      }

      if (params.accuracy !== undefined) {
        userMarkerInfo.accuracy = params.accuracy;
        if (this.userMarkerAccuracy === null) {  // create
          this.userMarkerAccuracy = L.circle(userMarkerInfo.location, {
            color: this.config.accuracyCircle.color,
            fillColor: this.config.accuracyCircle.fillColor,
            fillOpacity: this.config.accuracyCircle.fillOpacity,
            radius: userMarkerInfo.accuracy
          });
          this.getMarkerLayer(ACCURACY_LAYER).addLayer(this.userMarkerAccuracy);
        } else {  // update
          this.userMarkerAccuracy.setRadius(userMarkerInfo.accuracy);
        }
      }
    } else {
      this.addUserMarker(params);
    }
  }
}
