/*
* Software Name : IotMapManager
* Version: 0.0.6
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
import { IotCluster, IotMarker, IotUserMarker, ShapeType, TabType, PathIconType } from './iot-map-types'
import { IotMapConfig } from './iot-map-config'
import * as commonSvg from './iot-map-common-svg'
import { IotMapMarker } from './iot-map-marker'

/* eslint-disable quotes */
/**
 * Returns a DivIcon compatible with leaflet, representing all marker information (shape, tab, popup, size...)
 *
 * @param marker - an IotMarker structure containing all visual information
 * @param config - config to use to generate the icon
 * @param selected - true if marker must have selected design, false otherwise. (false by default)
 * @returns a DivIcon containing design
 */
export function getMarkerIcon (marker: IotMarker, config: IotMapConfig, selected = false): L.DivIcon {
  marker = computeMarkerValues(marker, config)
  return getMarkerDivIcon(marker, config, selected)
}

/**
 * Returns a DivIcon compatible with leaflet, representing all manual cluster information (shape, tab, popup, gauge...)
 *
 * @param cluster - an IotCluster structure containing all visual information
 * @param config - config to use to generate the icon
 * @param selected - true if cluster must have selected design, false otherwise. (false by default)
 * @param automatic - true if clustering is automatic (calculated by leaflet), false if clustering is manual
 *
 * @remarks use this function for manual clustering purpose
 */
export function getManualClusterIcon (cluster: IotCluster, config: IotMapConfig, selected = false, automatic: boolean): L.DivIcon {
  const svgGauge = computeClusterGauge(cluster, config)

  // shadow
  const imgShadow = `<img class='clusterShadow' src='./assets/img/${commonSvg.cluster.shadow}'/>`

  // label
  const innerLabel = `<span class='clusterLabel' style='color: ${config.markers.font.color}'>${cluster.childCount}</span>`

  // tab
  let tab = ``
  if (cluster.layer === undefined) {
    cluster.layer = 'default'
  } else {
    const layerTemp = config.layerTemplates[cluster.layer]
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
  const layerTemp = config.layerTemplates[cluster.layer]
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
                  ${commonSvg.cluster.svgDefinitionStart}
                  ${commonSvg.cluster.clusterBG}
                  ${svgGauge}
                  ${commonSvg.cluster.svgDefinitionEnd}
                  ${innerLabel}
                  ${tab}
                </div>`

  const clusterSize = config.clusters.size
  return new L.DivIcon({
    html: html,
    className: 'my-cluster-class',
    iconSize: L.point(clusterSize, clusterSize),
    iconAnchor: L.point(clusterSize / 2, clusterSize / 2)
  })
}

/**
 * Returns a DivIcon compatible with leaflet, representing all automatic cluster information (shape, tab, popup, gauge...)
 * @param leafletCluster - cluster computed by leaflet
 * @param config - config to use to display cluster
 *
 * @remarks use this function for automatic clustering purpose
 */
export function getAutomaticClusterIcon (leafletCluster: L.MarkerCluster, config: IotMapConfig): L.DivIcon {
  const iotCluster: IotCluster = leafletClusterToIotCluster(leafletCluster, config)
  return getManualClusterIcon(iotCluster, config, false, true) // automatic cluster
}

/**
 * Returns a DivIcon compatible with leaflet, representing all user marker information (direction, accuracy...)
 * @param userMarker - IotUserMarker structure containing all visual information
 */
export function getUserMarkerIcon (userMarker: IotUserMarker, config: IotMapConfig): L.DivIcon {
  const userSvg = commonSvg.user
  const userMarkerSize = config.userMarker.size
  const arrowConfig = config.userMarker.arrow

  // shadow file
  const imgShadow = `<img class='usermarkershadow' src='./assets/img/${userSvg.shadow}'/>`

  let html = `<div class='usermarkericon'>`
  if (userMarker.direction !== undefined) {
    html += `<svg xmlns='http://www.w3.org/2000/svg'
                  width='${userMarkerSize}'
                  height='${userMarkerSize}'
                  viewBox='0 0 ${userMarkerSize} ${userMarkerSize}'>${userSvg.border}</svg>
             <svg xmlns='http://www.w3.org/2000/svg'
                  width='${userMarkerSize}'
                  height='${userMarkerSize}'
                  viewBox='-3 -3 38 38'>
              <path ${userSvg.arrow} transform='rotate(${(userMarker.direction + arrowConfig.startAngle)}
                                                       ${arrowConfig.size / 2}
                                                       ${arrowConfig.size / 2})'/>
              </svg>`
  } else {
    html += `<svg xmlns='http://www.w3.org/2000/svg'
                  width='${userMarkerSize}'
                  height='${userMarkerSize}'
                  viewBox='0 0 ${userMarkerSize} ${userMarkerSize}'> ${userSvg.border} ${userSvg.inner}</svg>`
  }
  html += imgShadow

  // creating icon
  return new L.DivIcon({
    className: 'my-custom-pin',
    iconSize: L.point(userMarkerSize, userMarkerSize), // size of the icon
    iconAnchor: L.point(userMarkerSize / 2, userMarkerSize / 2), // point of the icon which will correspond to marker's location
    html: html
  })
}

/**
 * Returns a DivIcon compatible with leaflet, representing a start, end or intermediate path icon
 * @param type - PathIconType = start, end or mid
 * @param config - config to use to display start / end / mid icons
 */
export function getPathIcon (type: PathIconType, config: IotMapConfig): L.DivIcon {
  let svg: string
  switch (type) {
    case PathIconType.start: {
      svg = commonSvg.path.start
      break
    }
    case PathIconType.mid: {
      svg = commonSvg.path.mid
      break
    }
    case PathIconType.end: {
      svg = commonSvg.path.end
      break
    }
    default: {
      svg = ''
      break
    }
  }

  const size = config.path.markerSize
  const html = `<div>
                  <svg xmlns='http://www.w3.org/2000/svg'
                       width='${size}'
                       height='${size}'
                       viewBox='0 0 ${size} ${size}'>
                    ${svg}
                  </svg>
                </div>`

  const iconSize : L.Point = L.point(size, size)
  const iconAnchor : L.Point = L.point(iconSize.x / 2, iconSize.y / 2)

  // creating icon
  return new L.DivIcon({
    className: 'my-custom-pin',
    iconSize: iconSize, // size of the icon
    iconAnchor: iconAnchor, // point of the icon which will correspond to marker's location
    html: html
  })
}

// -------------------
// ----- PRIVATE -----
// -------------------
/**
 * Compute marker values by applying default values, template and status value
 * @param marker - all marker information
 * @param config - configuration to use to display marker
 */
function computeMarkerValues (marker: IotMarker, config: IotMapConfig): IotMarker {
  // default values
  if (!marker.shape) {
    marker.shape = JSON.parse(JSON.stringify(config.markers.default.shape))
  }
  marker.shape.type = marker.shape.type ?? config.markers.default.shape.type
  marker.shape.plain = marker.shape.plain ?? config.markers.default.shape.plain
  marker.shape.anchored = marker.shape.anchored ?? config.markers.default.shape.anchored
  marker.shape.color = marker.shape.color ?? config.markers.default.shape.color
  marker.layer = marker.layer ?? 'default'

  // is template valid ?
  if (marker.template !== undefined) {
    const template = config.markerTemplates[marker.template]
    if (template === undefined) {
      marker.template = undefined
    } else { // update marker with template info
      if (template.layer !== undefined) {
        marker.layer = template.layer
      }
      if (template.popup !== undefined) {
        if (!marker.popup !== undefined) {
          marker.popup = {}
        }
        marker.popup.title = template.popup.title ?? marker.popup.title
        marker.popup.body = template.popup.body ?? marker.popup.body
      }
      if (template.tab !== undefined) {
        marker.tab = {
          content: template.tab.content,
          type: template.tab.type ?? TabType.normal
        }
      }
      if (template.shape !== undefined) {
        marker.shape.type = template.shape.type ?? marker.shape.type
        marker.shape.anchored = template.shape.anchored ?? marker.shape.anchored
        marker.shape.plain = template.shape.plain ?? marker.shape.plain
        marker.shape.color = template.shape.color ?? marker.shape.color
        marker.shape.percent = template.shape.percent ?? marker.shape.percent
        marker.shape.accuracy = template.shape.accuracy ?? marker.shape.accuracy
      }
      if (template.inner !== undefined) {
        if (marker.inner === undefined) {
          marker.inner = {}
        }
        marker.inner.color = template.inner.color ?? marker.inner.color

        if (template.inner.icon !== undefined) {
          marker.inner.icon = template.inner.icon
        } else if (template.inner.label !== undefined) {
          marker.inner.label = template.inner.label
          marker.inner.icon = undefined
        }
      }
    }
  }

  // is status valid ?
  if (marker.status !== undefined) {
    const status = config.markerStatus[marker.status]
    if (status === undefined) {
      marker.status = undefined
    } else { // update marker with status info
      if (status.layer !== undefined) {
        marker.layer = status.layer
      }
      if (status.popup !== undefined) {
        if (marker.popup === undefined) {
          marker.popup = {}
        }
        marker.popup.title = status.popup.title ?? marker.popup.title
        marker.popup.body = status.popup.body ?? marker.popup.body
      }
      if (status.tab !== undefined) {
        marker.tab = {
          content: status.tab.content,
          type: status.tab.type ?? TabType.normal
        }
      }
      if (status.shape !== undefined) {
        marker.shape.type = status.shape.type ?? marker.shape.type
        marker.shape.anchored = status.shape.anchored ?? marker.shape.anchored
        marker.shape.plain = status.shape.plain ?? marker.shape.plain
        marker.shape.color = status.shape.color ?? marker.shape.color
        marker.shape.percent = status.shape.percent ?? marker.shape.percent
        marker.shape.accuracy = status.shape.accuracy ?? marker.shape.accuracy
      }
      if (status.inner !== undefined) {
        if (marker.inner === undefined) {
          marker.inner = {}
        }
        marker.inner.color = status.inner.color ?? marker.inner.color
        if (status.inner.icon !== undefined) {
          marker.inner.icon = status.inner.icon
        } else if (status.inner.label !== undefined) {
          marker.inner.label = status.inner.label
          marker.inner.icon = undefined
        }
      }
    }
  }

  return marker
}

/**
 * Create a divIcon according to marker informations
 * @param marker - an IotMarker structure containing all visual information
 * @param config - config to use to generate the icon
 * @param selected - true if marker must have selected design, false otherwise. (false by default)
 * @returns a DivIcon containing design
 */
function getMarkerDivIcon (marker: IotMarker, config: IotMapConfig, selected: boolean): L.DivIcon {
  // shape
  let svgShape = ``
  let svgBG = ``
  let svgBorder = ``
  let svgGauge = ``
  let shadowFile = './assets/img/'

  const markerConfig = (selected)
    ? config.markers.size.selected
    : ((marker.shape.type === ShapeType.circle)
        ? config.markers.size.unselectedCircle
        : config.markers.size.unselectedSquare
      )

  const svg = (marker.shape.type === ShapeType.circle) ? commonSvg.circle : commonSvg.square
  if (marker.shape.color === undefined) {
    marker.shape.color = config.markers.default.shape.color
  }
  const funColor = (marker.shape.percent !== undefined) ? 'white' : marker.shape.color

  // shape
  if (selected) { // Only anchored markers can be selected
    if (marker.shape.plain) { // STD
      svgShape = `<path ${svg.selStdColour}  fill='${funColor}'/>`
    } else { // FUN
      svgShape = `<path ${svg.selFunColour} fill='${funColor}'/>`
      svgBG = svg.selFunBg
    }
    shadowFile += svg.selShadow
  } else if (marker.shape.type === ShapeType.circle) {
    if (marker.shape.anchored) {
      svgBorder = svg.pinBorder
      svgShape = `<path ${svg.pinStdColour} fill='${funColor}'/>`
      shadowFile += svg.pinShadow
    } else {
      svgBorder = svg.border
      svgShape = `<circle ${svg.stdColour} fill='${funColor}'/>`
      shadowFile += svg.shadow
    }
  } else if (marker.shape.type === ShapeType.square) {
    if (marker.shape.anchored) {
      if (marker.shape.plain) {
        svgBorder = svg.pinBorder
        svgShape = `<path ${svg.pinStdColour} fill='${funColor}'/>`
        shadowFile += svg.pinShadow
      } else {
        svgBorder = svg.pinBorder
        svgShape = `<path ${svg.pinFunColour} fill='${funColor}'/>`
        svgBG = svg.pinFunBg
        shadowFile += svg.pinShadow
      }
    } else {
      if (marker.shape.plain) {
        svgBorder = svg.border
        svgShape = `<rect ${svg.stdColour} fill='${funColor}'/>`
        shadowFile += svg.shadow
      } else {
        svgBorder = svg.border
        svgShape = `<rect ${svg.funColour} fill='${funColor}'/>`
        shadowFile += svg.shadow
        svgBG = svg.funBg
      }
    }
  }

  // inner
  let innerDesign = ''
  if (marker.inner) {
    const innerColor = (marker.inner.color !== undefined) ? marker.inner.color : config.markers.default.inner.color

    if (marker.inner.icon) { // icon
      innerDesign = `<span class='innerspan ${marker.inner.icon} ${((selected) ? ' iconSelected' : ' iconUnselected')}'
                           style='color: ${innerColor}'></span>`
    } else if (marker.inner.label) { // label
      innerDesign = `<span class='innerspan ${((selected) ? ' labelSelected' : ' labelUnselected')}'
                           style='color: ${innerColor}'>${marker.inner.label[0]}</span>`
    }
  }

  // state / gauge
  if (marker.shape.percent && marker.shape.type === ShapeType.circle) {
    const gaugeColor = marker.shape.color
    const perimeter = 2 * 3.14 * markerConfig.origin.gauge.radius
    const arc = marker.shape.percent * perimeter / 100

    svgGauge = `<circle ${svg.gauge}
      r='${markerConfig.origin.gauge.radius}'
      stroke-width='${markerConfig.origin.gauge.width}'
      stroke='${gaugeColor}'
      stroke-dasharray='${arc}, ${perimeter}'
      transform='rotate(${markerConfig.origin.gauge.startAngle}
                        ${markerConfig.origin.fullWidth / 2}
                        ${markerConfig.origin.fullHeight / 2})'/>`
  }

  // shadow
  const imgShadow = `<img class='${((selected) ? 'shadowSelected' : 'shadowUnselected')}' src='${shadowFile}'/>`

  // tabs
  let tab = ``
  if (marker.tab !== undefined) {
    // color
    if (marker.tab.type === TabType.normal || marker.tab.type === undefined) {
      tab = `<span class='tab-top'>${marker.tab.content}</span>`
    } else {
      tab = `<span class='tab-top-big'>${marker.tab.content}</span>`
      tab += `<span class='tab-top-big-left'></span>`
      tab += `<span class='tab-top-big-right'></span>`
    }
  }

  // popup
  let popup = ''
  if (marker.popup !== undefined) {
    popup = `<div class='marker-popup'>`
    if (marker.popup.title) {
      popup += `<span class='pop-up-title'>${marker.popup.title}</span><br>`
    }
    if (marker.popup.body) {
      popup += `<span class='pop-up-body'>${marker.popup.body}</span><br>`
    }
    popup += `</div>`
  }

  // calculate ViewBox
  const x = (markerConfig.origin.fullWidth - markerConfig.origin.width) / 2
  const y = (markerConfig.origin.fullHeight - markerConfig.origin.height) / 2
  const w = markerConfig.origin.width
  const h = markerConfig.origin.height + ((marker.shape.anchored || selected) ? markerConfig.origin.anchorHeight : 0)

  // result
  const markerSelectionClass = selected ? 'marker-selected' : 'marker-unselected'

  const html = `<div class='markericon ${markerSelectionClass}'>
                  ${imgShadow}
                  ${popup}
                  <svg xmlns='http://www.w3.org/2000/svg'
                       width='${markerConfig.width}'
                       height='${markerConfig.height + ((marker.shape.anchored || selected) ? markerConfig.anchorHeight : 0)}'
                       viewBox='${x} ${y} ${w} ${h}'>
                    ${svgBorder} ${svgShape} ${svgBG} ${svgGauge}
                  </svg>
                  ${innerDesign}
                  ${tab}
                </div>`

  const iconSize : L.Point = L.point(markerConfig.width, markerConfig.height + ((marker.shape.anchored || selected) ? markerConfig.anchorHeight : 0))
  const iconAnchor : L.Point = L.point(iconSize.x / 2, (!(marker.shape.anchored || selected)) ? iconSize.y / 2 : iconSize.y)

  // creating icon
  return new L.DivIcon({
    className: 'my-custom-pin',
    iconSize: iconSize, // size of the icon
    iconAnchor: iconAnchor, // point of the icon which will correspond to marker's location
    html: html
  })
}

/**
 * Create a svg gauge according to cluster information (number and distribution of children markers)
 * @param cluster - an IotCluster structure containing all visual information
 * @param config - config to use to generate the svg string
 */
function computeClusterGauge (cluster: IotCluster, config: IotMapConfig): string {
  // Gauge design
  let svgGauge = ``
  let angle = config.clusters.gauge.startAngle
  let arc = 0.0
  const radius = config.clusters.gauge.radius
  const perimeter = 2 * 3.14 * radius
  const clusterSize = config.clusters.size
  for (const aggr of cluster.aggregation) {
    const n = aggr.count
    const color = aggr.color

    arc = n * perimeter / cluster.childCount

    svgGauge += `<circle ${commonSvg.cluster.gauge}
      r='${radius}'
      stroke='${color}'
      stroke-dasharray='${arc}, ${perimeter}'
      transform='rotate(${angle} ${clusterSize / 2} ${clusterSize / 2})'/>`
    angle += n * 360 / cluster.childCount
  }

  return svgGauge
}

/**
 * Convert a MarkerCluster to an IotCluster
 * @param leafletCluster - MarkerCluster containing children markers
 * @param config - config to use to convert
 */
function leafletClusterToIotCluster (leafletCluster: L.MarkerCluster, config: IotMapConfig): IotCluster {
  // marker Distribution
  const tabDistribution: any = {} // eslint-disable-line @typescript-eslint/no-explicit-any

  const allChildMarkers = leafletCluster.getAllChildMarkers()
  allChildMarkers.forEach(m => {
    const marker = <IotMapMarker> m // cast m to IotMapMaker
    const state = (marker.getData().status) ? marker.getData().status : 'stateless'
    if (tabDistribution[state]) {
      tabDistribution[state] = {
        count: tabDistribution[state].count + 1,
        label: (marker.getData().status)
          ? config.markerStatus[marker.getData().status].name.plural
          : 'stateless'
      }
    } else {
      tabDistribution[state] = {
        count: 1,
        label: (marker.getData().status)
          ? config.markerStatus[marker.getData().status].name.singular
          : 'stateless'
      }
    }
  })

  const layer = (<IotMapMarker> allChildMarkers[0]).getData().layer

  const currentCluster: IotCluster = {
    id: '', // unused in automatic mode
    location: {
      lat: 0,
      lng: 0
    }, // unused in automatic mode
    contentLabel: layer, // unused in automatic mode
    layer: layer,
    childCount: leafletCluster.getChildCount(),
    aggregation: []
  }
  let i = 0
  for (const state in tabDistribution) {
    if (tabDistribution[state]) {
      currentCluster.aggregation[i] = {
        count: tabDistribution[state].count,
        color: (state === 'stateless') ? config.clusters.defaultColor : config.markerStatus[state].shape.color,
        singularState: tabDistribution[state].label,
        pluralState: tabDistribution[state].label
      }
      i++
    }
  }

  return currentCluster
}
/* eslint-enable quotes */
