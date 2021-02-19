/*
* Software Name : IotMapManager
* Version: 1.0.1
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
import {IotCluster, TabType} from './iot-map-manager-types'
import { IotMapManagerConfig } from './iot-map-manager-config'
import { IotMapCommonSvg } from './iot-map-common-svg'

/* eslint-disable quotes */
export class IotMapClusters {
  private config: IotMapManagerConfig = IotMapManagerConfig.getConfig()

  public getClusterIcon (cluster: IotCluster, selected = false, automatic = true): L.DivIcon {
    // Gauge design
    let svgGauge = ``
    let angle = this.config.clusters.gauge.startAngle
    let arc = 0.0
    const radius = this.config.clusters.gauge.radius
    const perimeter = 2 * 3.14 * radius
    const clusterSize = this.config.clusters.size
    for (const aggr of cluster.aggregation) {
      const n = aggr.count
      const color = aggr.color

      arc = n * perimeter / cluster.childCount
      svgGauge += `<circle ${IotMapCommonSvg.cluster.gauge}
        r='${radius}'
        stroke='${color}'
        stroke-dasharray='${arc}, ${perimeter}'
        transform='rotate(${angle} ${clusterSize / 2} ${clusterSize / 2})'/>`
      angle += n * 360 / cluster.childCount
    }

    // shadow
    const imgShadow = `<img class='clusterShadow' src='./assets/img/${IotMapCommonSvg.cluster.shadow}'/>`

    // label
    const innerLabel = `<span class='clusterLabel' style='color: ${this.config.markers.font.color}'>${cluster.childCount}</span>`

    // tab
    let tab = ``
    if (cluster.layer === undefined) {
      cluster.layer = 'default'
    } else {
      const layerTemp = this.config.layerTemplates[cluster.layer]
      if (layerTemp !== undefined) {
        if (layerTemp.type === TabType.normal || layerTemp.type === undefined) {
          tab = `<span class='tab-top'>${layerTemp.content}</span>`
        } else {
          tab = `<span class='tab-top-big'>${layerTemp.content}</span>`
          tab += `<span class='tab-top-big-left'></span>`
          tab += `<span class='tab-top-big-right'></span>`
        }
      }
    }

    // popup
    const clusterSelectionClass = selected ? 'cluster-selected' : (automatic ? 'automatic-cluster' : 'cluster-unselected')
    const layerTemp = this.config.layerTemplates[cluster.layer]
    let popup = `<div class='${(automatic ? 'automatic-cluster-popup' : 'manual-cluster-popup')}'>`
    if (layerTemp !== undefined) {
      popup += `<span class='pop-up-title'>
                  <span class='pop-up-title-icon'>${layerTemp.content}</span>
                  ${cluster.childCount} ${cluster.contentLabel}
                </span><br>`
    } else {
      popup += `<span class='pop-up-title'>${cluster.childCount} ${cluster.contentLabel}</span><br>`
    }

    for (const aggr of cluster.aggregation) {
      popup += `<span class='pop-up-bullet' style='text-shadow: 0 0 0 ${aggr.color}'> &#x26ab  </span>
                <span class='pop-up-body'>${aggr.count} ${((aggr.count === 1) ? aggr.singularState : aggr.pluralState)}</span><br>`
    }
    popup += `</div>`

    const html = `<div class='clustericon ${clusterSelectionClass}'>
                    ${imgShadow}
                    ${popup}
                    ${IotMapCommonSvg.cluster.svgDefinitionStart}
                    ${IotMapCommonSvg.cluster.clusterBG}
                    ${svgGauge}
                    ${IotMapCommonSvg.cluster.svgDefinitionEnd}
                    ${innerLabel}
                    ${tab}
                  </div>`

    // tslint:disable:max-line-length
    return new L.DivIcon({
      html: html,
      className: 'my-cluster-class',
      iconSize: L.point(clusterSize, clusterSize),
      iconAnchor: L.point(clusterSize / 2, clusterSize / 2)
    })
  }
}

/* eslint-enable quotes */
