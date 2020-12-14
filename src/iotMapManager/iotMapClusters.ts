/*
* Software Name : IotMapManager
* Version: 0.3.1
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
  config: IotMapManagerConfig = IotMapManagerConfig.getConfig();

  public getClusterIcon(cluster: IotCluster): L.divIcon {
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
        + `' transform='rotate(` + angle + ` 100 100)'/>`;
      angle += n * 360 / cluster.childCount;
    }

    // label design
    const svgLabel = `<text x=` + this.config.clusters.size.fullSvgWidth / 2
                        + ` y=` + this.config.clusters.size.fullSvgHeight / 2
                        + ` dominant-baseline='central'
                            text-anchor='middle'
                            font-size='` + this.config.clusters.size.fontSize + `'
                            font-family='Helvetica Neue' font-weight='bold'>` + cluster.childCount + `</text>`;
    const imgShadow = `<img class='clusterShadow' src='/assets/img/` + IotMapCommonSvg.cluster.shadow + `'/>`;
    const html = `<div class='container'>`
                  + imgShadow
                  + IotMapCommonSvg.cluster.svgDefinitionStart
                  + IotMapCommonSvg.cluster.clusterBG
                  + svgLabel
                  + svgGauge
                  + IotMapCommonSvg.cluster.svgDefinitionEnd
                + `</div>`;

    // tslint:disable:max-line-length
    return new L.DivIcon({
      html: html,
      className: 'my-cluster-class',
      iconSize: [this.config.clusters.size.fullSvgWidth, this.config.clusters.size.fullSvgHeight],
      popupAnchor: [0, 0]
    });
  }

  public getClusterPopup(cluster: IotCluster): string {
    const conf = this.config.popupFont;

    let popup = `<span style="font-size:` + conf.titleSize + `;
                              font-family:` + conf.fontFamily + `;
                              font-weight:` + conf.fontWeight + `;">` + cluster.childCount + ` ` + cluster.contentLabel + ' : <br>';

    for (const aggr of cluster.aggregation) {
      popup += `<span style="color:` + aggr.color + `;">&#x25CF;   </span>
                <span style="color: ` + conf.color + `;
                             font-size: ` + conf.bodySize + `;
                             font-family: ` + conf.fontFamily + `;
                             font-weight: ` + conf.fontWeight + `;">`
                      + aggr.count + ` ` + ((aggr.count === 1) ? aggr.singularState : aggr.pluralState)
              + `</span><br>`;
    }
    return popup;
  }
}
