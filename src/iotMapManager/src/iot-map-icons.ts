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

import * as L from 'leaflet'
import { IotCluster, IotMarker, IotUserMarker, PathIconType, ShapeType, TabType } from './iot-map-types'
import { IotMapConfig } from './iot-map-config'
import * as commonSvg from './iot-map-common-svg'
import { IotMapMarker } from './iot-map-marker'

import cluShadow from '../img/CLU_Shadow.png'
import mobCirShadow from '../img/MOB_CIR_Shadow.png'
import mobCirSelShadow from '../img/MOB_CIR_SEL_Shadow.png'
import mobCirPinShadow from '../img/MOB_CIR_PIN_Shadow.png'
import poiSqrShadow from '../img/POI_SQR_Shadow.png'
import poiSqrSelShadow from '../img/POI_SQR_SEL_Shadow.png'
import poiSqrPinShadow from '../img/POI_SQR_PIN_Shadow.png'
import usrShadow from '../img/USR_Shadow.png'

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
export function getManualClusterIcon (cluster: IotCluster, config: IotMapConfig): L.DivIcon {
  const svgGauge = computeClusterGauge(cluster, config)

  // shadow
  const imgShadow = `<img class='iotmap-clusterShadow' src='${cluShadow}'/>`

  // label
  let innerLabel: string
  const label = computeLabel(cluster.childCount)

  if (label.length < 4) {
    innerLabel = `<span class='iotmap-clusterShortLabel' style='color: ${config.markers.font.color}'>${label}</span>`
  } else if (label.length < 5) {
    innerLabel = `<span class='iotmap-clusterMidLabel' style='color: ${config.markers.font.color}'>${label}</span>`
  } else {
    innerLabel = `<span class='iotmap-clusterLongLabel' style='color: ${config.markers.font.color}'>${label}</span>`
  }

  // tab
  let tab = ``
  if (cluster.layer === undefined) {
    cluster.layer = 'default'
  } else {
    const layerTemp = config.layerTemplates[cluster.layer]
    if (layerTemp?.content !== undefined) {
      if (layerTemp.type === TabType.normal || layerTemp.type === undefined) {
        tab = `<span class='iotmap-tab-top'>${layerTemp.content}</span>`
      } else {
        tab = `<span class='iotmap-tab-top-big'>${layerTemp.content}</span>`
        tab += `<span class='iotmap-tab-top-big-left'></span>`
        tab += `<span class='iotmap-tab-top-big-right'></span>`
      }
    }
  }

  // popup
  const layerTemp = config.layerTemplates[cluster.layer]
  const nbCols = (cluster.aggregation.length === 1) ? 1 : (cluster.colNumber ?? layerTemp?.popupColNumber) ?? 1

  let popup = (nbCols > 1) ? `<div class='iotmap-cluster-big-popup'>` : `<div class='iotmap-cluster-popup'>`

  // popup title
  if (layerTemp !== undefined) {
    popup += `<span class='iotmap-pop-up-title'>
              <span class='iotmap-pop-up-title-icon'>${layerTemp.content ?? ''}</span>
              ${cluster.childCount} ${cluster.contentLabel}
            </span><br>`
  } else {
    popup += `<span class='iotmap-pop-up-title'>${cluster.childCount} ${cluster.contentLabel}</span><br>`
  }

  // popup body
  popup += `<table class='iotmap-cluster-big-popup-table'>`
  popup += `<tr>`
  let elemNum = 1

  const nbRows = Math.round(cluster.aggregation.length / nbCols)

  for (let row = 1; row <= nbRows; row++) {
    for (let col = 1; col <= nbCols; col++) {
      const agregNum = (nbRows * (col - 1) + row - 1)
      if (agregNum < cluster.aggregation.length) {
        const currentAgreg = cluster.aggregation[agregNum]
        const bullet = currentAgreg.bullet ?? `<span class='iotmap-pop-up-bullet' style='text-shadow: 0 0 0 ${currentAgreg.color}'> &#x26aa;  </span>`
        const url = currentAgreg.url ?? ''
        const urlTarget = currentAgreg.urlTarget ?? ''

        popup += `<td class='iotmap-cluster-big-popup-body-bullet'><span >${bullet}</span></td>`
        popup += `<td class='iotmap-cluster-big-popup-body-cell'><span >`
        popup += (url !== '') ? (`<a href='${url}` + ((urlTarget !== '') ? `' target='${urlTarget}` : '') + `'>`) : ''
        popup += `${currentAgreg.count} ${(currentAgreg.count === 1) ? currentAgreg.singularState : currentAgreg.pluralState} </span></td>`
        popup += (url !== '') ? `</a>` : ''
        if (elemNum % nbCols === 0) {
          popup += `</tr><tr>`
        }
        elemNum += 1
      }
    }
  }

  popup += `</tr>`
  popup += `</table>`

  popup += `</div>`

  const html = `<div class='iotmap-clustericon'>
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
    className: 'iotmap-divicon',
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
  return getManualClusterIcon(iotCluster, config) // automatic cluster
}

/**
 * Returns a DivIcon compatible with leaflet, representing all user marker information (direction, accuracy...)
 * @param userMarker - IotUserMarker structure containing all visual information
 * @param config - IotMapConfig configuration containing predefined and user defined values
 */
export function getUserMarkerIcon (userMarker: IotUserMarker, config: IotMapConfig): L.DivIcon {
  const userSvg = commonSvg.user
  const userMarkerSize = config.userMarker.size
  const arrowConfig = config.userMarker.arrow

  // shadow file
  const imgShadow = `<img class='iotmap-usermarkershadow' src='${usrShadow}'/>`

  let html = `<div class='iotmap-usermarkericon'>`
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
    className: 'iotmap-divicon',
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
    className: 'iotmap-divicon',
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
        marker.shape.direction = template.shape.direction ?? marker.shape.direction
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
        marker.shape.direction = status.shape.direction ?? marker.shape.direction
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
  let svgDirection = ``
  let shadowFile = ''
  let shadowClass = ''

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
    if (marker.shape.type === ShapeType.circle) {
      shadowFile = mobCirSelShadow
      shadowClass = 'iotmap-selected-circle-shadow'
    } else {
      shadowFile = poiSqrSelShadow
      shadowClass = 'iotmap-selected-square-shadow'
    }
  } else if (marker.shape.type === ShapeType.circle) {
    if (marker.shape.anchored) {
      svgBorder = svg.pinBorder
      svgShape = `<path ${svg.pinStdColour} fill='${funColor}'/>`
      shadowFile = mobCirPinShadow
      shadowClass = 'iotmap-circle-pin-shadow'
    } else {
      svgBorder = svg.border
      svgShape = `<circle ${svg.stdColour} fill='${funColor}'/>`
      shadowFile = mobCirShadow
      shadowClass = 'iotmap-circle-shadow'
    }
  } else if (marker.shape.type === ShapeType.square) {
    if (marker.shape.anchored) {
      if (marker.shape.plain) {
        svgBorder = svg.pinBorder
        svgShape = `<path ${svg.pinStdColour} fill='${funColor}'/>`
      } else {
        svgBorder = svg.pinBorder
        svgShape = `<path ${svg.pinFunColour} fill='${funColor}'/>`
        svgBG = svg.pinFunBg
      }
      shadowFile = poiSqrPinShadow
      shadowClass = 'iotmap-square-pin-shadow'
    } else {
      if (marker.shape.plain) {
        svgBorder = svg.border
        svgShape = `<rect ${svg.stdColour} fill='${funColor}'/>`
      } else {
        svgBorder = svg.border
        svgShape = `<rect ${svg.funColour} fill='${funColor}'/>`
        svgBG = svg.funBg
      }
      shadowFile = poiSqrShadow
      shadowClass = 'iotmap-square-shadow'
    }
  }

  // Direction
  if (marker.shape.type === ShapeType.circle && marker.shape.direction !== undefined) {
    const arrowConf = config.markers.size.directionArrow
    const shift = (selected) ? 0 : 3 * arrowConf.height / 4
    const arrowColor = (marker.shape.percent) ? marker.shape.color : funColor
    const strokeColor = (selected) ? funColor : 'white'

    svgDirection = `<div class='${((selected) ? 'iotmap-directionSelected' : 'iotmap-directionUnselected')}'>
                    <svg xmlns='http://www.w3.org/2000/svg'
                       width='${arrowConf.fullWidth}'
                       height='${arrowConf.fullHeight}'
                       viewBox='0 0 ${arrowConf.fullWidth} ${arrowConf.fullHeight}'>
                       <g transform='translate(${(arrowConf.fullWidth - arrowConf.width) / 2}, ${shift})
                                     rotate( ${marker.shape.direction} ${arrowConf.width / 2} ${arrowConf.fullHeight / 2 - shift})'>
                          <path ${commonSvg.circle.dirArrow} fill='${arrowColor}' stroke='${strokeColor}'/>
                       </g>
                    </svg></div>`
  }

  // inner
  let innerDesign = ''
  if (marker.inner) {
    const innerColor = (marker.inner.color !== undefined) ? marker.inner.color : config.markers.default.inner.color

    if (marker.inner.img) {
      innerDesign = `<img src='${marker.inner.img}' class='iotmap-innerspan ${((selected) ? ' iotmap-imgSelected' : ' iotmap-imgUnselected')}'>`
    } else if (marker.inner.icon) { // icon
      innerDesign = `<span class='iotmap-innerspan ${marker.inner.icon} ${((selected) ? ' iotmap-iconSelected' : ' iotmap-iconUnselected')}'
      style='color: ${innerColor}'></span>`
    } else if (marker.inner.label) { // label
      innerDesign = `<span class='iotmap-innerspan ${((selected) ? ' iotmap-labelSelected' : ' iotmap-labelUnselected')}'
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
  const imgShadow = `<img class=${shadowClass} src='${shadowFile}'/>`

  // tabs
  let tab = ``
  if (marker.tab !== undefined) {
    // color
    if (marker.tab.type === TabType.normal || marker.tab.type === undefined) {
      tab = `<span class='iotmap-tab-top'>${marker.tab.content}</span>`
    } else {
      tab = `<span class='iotmap-tab-top-big'>${marker.tab.content}</span>`
      tab += `<span class='iotmap-tab-top-big-left'></span>`
      tab += `<span class='iotmap-tab-top-big-right'></span>`
    }
  }

  // popup
  let popup = ''
  if (marker.popup !== undefined) {
    popup = `<div class='iotmap-marker-popup'>`
    if (marker.popup.title) {
      popup += `<span class='iotmap-pop-up-title'>${marker.popup.title}</span><br>`
    }
    if (marker.popup.body) {
      popup += `<span class='iotmap-pop-up-body'>${marker.popup.body}</span><br>`
    }
    popup += `</div>`
  }

  // calculate ViewBox
  const x = (markerConfig.origin.fullWidth - markerConfig.origin.width) / 2
  const y = (markerConfig.origin.fullHeight - markerConfig.origin.height) / 2
  const w = markerConfig.origin.width
  const h = markerConfig.origin.height + ((marker.shape.anchored || selected) ? markerConfig.origin.anchorHeight : 0)

  // result
  const markerSelectionClass = selected ? 'iotmap-marker-selected' : 'iotmap-marker-unselected'

  const html = `<div class='iotmap-markericon ${markerSelectionClass}'>
                  ${imgShadow}
                  ${popup}
                  <div class='iotmap-svgMarker'>
                  <svg xmlns='http://www.w3.org/2000/svg'
                       width='${markerConfig.width}'
                       height='${markerConfig.height + ((marker.shape.anchored || selected) ? markerConfig.anchorHeight : 0)}'
                       viewBox='${x} ${y} ${w} ${h}'>
                    ${svgBorder} ${svgShape} ${svgBG} ${svgGauge}
                  </svg></div>
                  ${svgDirection}
                  ${innerDesign}
                  ${tab}
                </div>`

  const iconSize : L.Point = L.point(markerConfig.width, markerConfig.height + ((marker.shape.anchored || selected) ? markerConfig.anchorHeight : 0))
  const iconAnchor : L.Point = L.point(iconSize.x / 2, (!(marker.shape.anchored || selected)) ? iconSize.y / 2 : iconSize.y)

  // creating icon
  return new L.DivIcon({
    className: 'iotmap-divicon',
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
          ? config.markerStatus[marker.getData().status]?.name.plural
          : 'stateless'
      }
    } else {
      tabDistribution[state] = {
        count: 1,
        label: (marker.getData().status)
          ? config.markerStatus[marker.getData().status]?.name.singular
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
    colNumber: config.layerTemplates[layer]?.popupColNumber ?? 1,
    aggregation: []
  }
  let i = 0
  for (const state in tabDistribution) {
    if (tabDistribution[state]) {
      currentCluster.aggregation[i] = {
        count: tabDistribution[state].count,
        color: config.markerStatus[state]?.shape?.color ?? config.clusters.defaultColor,
        singularState: tabDistribution[state].label,
        pluralState: tabDistribution[state].label,
        bullet: config.markerStatus[state]?.bullet,
        url: config.markerStatus[state]?.url,
        urlTarget: config.markerStatus[state]?.urlTarget
      }
      i++
    }
  }

  return currentCluster
}

/**
 * Compute a short label with rounded value
 * @param number - number to display
 */
function computeLabel (number: number): string {
  let stringResult: string
  // get 3 significant digits
  const num = Math.pow(10, 3 - Math.floor(Math.log(number) / Math.LN10) - 1)
  const res = Math.round(Math.round(number * num) / num)

  if (res < 1000) {
    stringResult = String(res)
  } else if (res < 1e6) {
    stringResult = String(res / 1e3) + 'k'
  } else if (res < 1e9) {
    stringResult = String(res / 1e6) + 'M'
  } else {
    stringResult = String(res / 1e9) + 'G'
  }
  return stringResult
}
/* eslint-enable quotes */
