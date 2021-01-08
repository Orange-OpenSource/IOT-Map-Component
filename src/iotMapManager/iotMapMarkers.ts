/*
* Software Name : IotMapManager
* Version: 0.4.3
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
import {IotMapManagerConfig} from './iotMapManagerConfig';
import {IotMarker, markerType} from './iotMapManagerTypes';
import {IotMapCommonSvg} from './iotMapCommonSvg';


export class IotMapMarkers {
  config: IotMapManagerConfig = IotMapManagerConfig.getConfig();

  getMarker(marker: IotMarker, selected = false): L.DivIcon {
    let html: string;

    // default values
    if (!marker.shape) {
      marker.shape = this.config.markers.default;
    }

    // is status valid ?
    if (marker.status !== undefined) {
      if (this.config.markerStatus[marker.status] === undefined) {
        marker.status = undefined;
      }
    }

    // only anchored markers can be selected
    if (!marker.shape.anchored) {
      selected = false;
    }

    html = this.getSvg(marker, selected);


    // sizing
    const size = this.config.markers.size;
    const markerSize = (selected)
      ? size.selected
      : ((marker.shape.type === markerType.circle) ? size.unselectedCircle : size.unselectedSquare);
    const iconSize: L.Point = L.point(size.fullSvgWidth, size.fullSvgHeight);

    let iconAnchor: L.Point = L.point(size.fullSvgWidth / 2, size.fullSvgHeight / 2); // by default = center
    if (marker.shape.anchored) {
      const height = (size.fullSvgHeight + markerSize.svgHeight) / 2 + markerSize.anchoredHeight;
      iconAnchor = L.point(size.fullSvgWidth / 2, height);
    }

    const popupAnchor: L.Point = (selected)
            ? L.point(0, - (markerSize.svgHeight + markerSize.anchoredHeight))    // from anchor point
            : L.point(0, - (markerSize.svgHeight / 2));   // from center point

    // creating icon
    return new L.DivIcon({
        className: 'my-custom-pin',
        iconSize:     iconSize, // size of the icon
        iconAnchor:   iconAnchor, // point of the icon which will correspond to marker's location
        popupAnchor:  popupAnchor,
        html: html
      });
  }

  private getSvg(marker: IotMarker, selected: boolean): string {
    // shape
    let svgShape: string;
    let svgBG: string;
    let svgBorder: string;
    let svgGauge: string;
    let shadowFile = '/assets/img/';

    const commonSvg = (marker.shape.type === markerType.circle) ? IotMapCommonSvg.circle : IotMapCommonSvg.square;
    if (marker.status === undefined && marker.shape.color === undefined) {
      marker.shape.color = this.config.markers.default.funColor;
    }
    const funColor = (marker.shape.percent !== undefined)
      ? 'white'
      : ((marker.status !== undefined) ? this.config.markerStatus[marker.status].stateColor : marker.shape.color);

    // shape
    if (selected) {   // Only anchored markers can be selected
      if (marker.shape.type === markerType.poi || marker.shape.plain) {  // STD
        svgShape = commonSvg.selStdColour + ` fill='` + funColor + `'/>`;
      } else {  // FUN
        svgShape = commonSvg.selFunColour + ` fill='` + funColor + `'/>`;
        svgBG = commonSvg.selFunBg;
      }
      shadowFile += commonSvg.selShadow;
    } else if (marker.shape.type === markerType.poi || marker.shape.plain || marker.shape.plain === undefined) {  // STD
      if (marker.shape.anchored) {
        svgBorder = commonSvg.pinBorder;
        svgShape = commonSvg.pinStdColour + ` fill='` + funColor + `'/>`;
        shadowFile += commonSvg.pinShadow;
      } else { // FUN
        svgBorder = commonSvg.border;
        svgShape = commonSvg.stdColour + ` fill='` + funColor + `'/>`;
        shadowFile += commonSvg.shadow;
      }
    } else {  // FUN
      if (marker.shape.anchored) {
        svgBorder = commonSvg.pinBorder;
        svgShape = commonSvg.pinFunColour + ` fill='` + funColor + `'/>`;
        svgBG = commonSvg.pinFunBg;
        shadowFile += commonSvg.pinShadow;
      } else {
        svgBorder = commonSvg.border;
        svgShape = commonSvg.funColour + funColor + `'/>`;
        shadowFile += commonSvg.shadow;
        svgBG = commonSvg.funBg;
      }
    }

    // inner
    let svgInnerDesign = '';
    let imgIcon = '';
    const conf = (selected)
      ? this.config.markers.size.selected
      : ((marker.shape.type === markerType.circle)
            ? this.config.markers.size.unselectedCircle
            : this.config.markers.size.unselectedSquare);

    if (marker.inner) {
      const innerColor = (marker.status !== undefined)
        ? this.config.markerStatus[marker.status].innerColor
        : ((marker.inner.color !== undefined) ? marker.inner.color : this.config.markers.default.innerColor);

      if (marker.inner.icon) {  // icon
        const iconClass = (selected) ? ' iconSelected' : ' iconUnselected';
        imgIcon = `<span class="` + marker.inner.icon + iconClass + ` " style="color: ` + innerColor + `" />`;

      } else if (marker.inner.label) {  // label
        const labelClass = (selected) ? ' labelSelected' : ' labelUnselected';
        imgIcon = `<span class="` + labelClass + ` " style="color: ` + innerColor + `" >` + marker.inner.label[0] + `</span>`;
      }
    }

    // state / gauge
    if (marker.shape.percent && marker.shape.type === markerType.circle) {
      const gaugeColor = (marker.status !== undefined) ? this.config.markerStatus[marker.status].stateColor : marker.shape.color;

      const perimeter = 2 * 3.14 * conf.gaugeRadius;
      const arc = marker.shape.percent * perimeter / 100;
      svgGauge = commonSvg.gauge
        + ` r=` + conf.gaugeRadius
        + ` stroke-width=` + conf.gaugeWidth
        + ` stroke='` + gaugeColor
        + `' stroke-dasharray='` + arc + `, ` + perimeter
        + `' transform='rotate(-90 50 50)'/>`;
    }

    // shadow
    const shadowClass = (selected) ? 'shadowSelected' : 'shadowUnselected';
    const imgShadow = `<img class='` + shadowClass + `' src='` + shadowFile + `'/>`;


    // result
    return  `<div class='container'>`
              + imgShadow
              + `<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'>`
                + svgBorder + svgShape + svgBG /*+ svgInnerDesign*/ + svgGauge
              + `</svg>`
              + imgIcon
          + `</div>`;

  }
}
