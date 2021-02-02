/*
* Software Name : IotMapManager
* Version: 0.5.13
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
import { IotCluster } from './iotMapManagerTypes';
import { IotMapManagerConfig } from './iotMapManagerConfig';
import { IotMapCommonSvg } from './iotMapCommonSvg';

export class IotMapClusters {
  private config: IotMapManagerConfig = IotMapManagerConfig.getConfig();

  public getClusterIcon(cluster: IotCluster, selected = false, automatic = true): L.DivIcon {
    // Gauge design
    let svgGauge = ``;
    let angle = this.config.clusters.gauge.startAngle;
    let arc = 0.0;
    const radius = this.config.clusters.gauge.radius;
    const perimeter = 2 * 3.14 * radius;
    for (const aggr of cluster.aggregation) {
      const n = aggr.count;
      const color = aggr.color;

      arc = n * perimeter / cluster.childCount;
      svgGauge += IotMapCommonSvg.cluster.gauge
        + ` r='` + radius
        + `' stroke='` + color
        + `' stroke-dasharray='` + arc + `, ` + perimeter
        + `' transform='rotate(` + angle + ` 25 25)'/>`;
      angle += n * 360 / cluster.childCount;
    }

    // shadow
    const imgShadow = `<img class='clusterShadow' src='./assets/img/` + IotMapCommonSvg.cluster.shadow + `'/>`;

    // label
    const innerLabel = `<span class='clusterLabel' style='color: ` + this.config.markers.font.color
      + `; font-family: ` + this.config.markers.font.family
      + `; font-weight: ` + this.config.markers.font.weight
      + `' >` + cluster.childCount + `</span>`;


    // popup
    const clusterSelectionClass = selected ? 'cluster-selected' : 'cluster-unselected';

    let popup = `<div class='` + (automatic ? 'automatic-cluster' : 'manual-cluster') + `'>`;
    popup += `<span class='pop-up-title'>` + cluster.childCount + ` ` + cluster.contentLabel + `<br>`;

    for (const aggr of cluster.aggregation) {
      popup += `<span class='pop-up-bullet' style="text-shadow: 0 0 0 ` + aggr.color + `"> &#x26ab;  </span>
                <span class='pop-up-body'>`
        + aggr.count + ` ` + ((aggr.count === 1) ? aggr.singularState : aggr.pluralState)
        + `</span><br>`;
    }

    popup += `</div>`;

    const html = `<div class='clustericon ` + clusterSelectionClass + `'>`
                  + imgShadow
                  + popup
                  + IotMapCommonSvg.cluster.svgDefinitionStart
                  + IotMapCommonSvg.cluster.clusterBG
                  + svgGauge
                  + IotMapCommonSvg.cluster.svgDefinitionEnd

                  + innerLabel
                + `</div>`;

    // tslint:disable:max-line-length
    return new L.DivIcon({
      html: html,
      className: 'my-cluster-class',
      iconSize: L.point(50, 50),
      iconAnchor: L.point(25, 25)//[this.config.clusters.size.fullSvgWidth, this.config.clusters.size.fullSvgHeight]
    });
  }
}
