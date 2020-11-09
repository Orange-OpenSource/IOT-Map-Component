/*
* Software Name : IotMapManager
* Version: 0.2.1
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

import * as commonSvg from './iotMapCommonSvg';
import * as config from '../iotMapManager.json';

export class IotCircleMarker {

  // ---------------------------------------
  // getSvg
  // return svg for circle marker according to parameters
  // ---------------------------------------
  getSvg(marker, selected = false) {
    let svgInnerDesign = '';
    let svgGauge = '';

    // sizing
    const width = (selected) ? config.markers.size.selected.width : config.markers.size.unselected.width;
    const height = (selected) ? config.markers.size.selected.height : config.markers.size.unselected.height;

    // border color
    const borderColor = (selected) ? marker.shape.color : config.markers.circles.borderColor;

    // center color
    const svgCenter = (marker.shape.plain) ? `<path fill='` + marker.shape.color + `' ` + commonSvg.circle_center + `/>`
                                    : `<path fill='` + config.markers.circles.backgroundColor + `' ` + commonSvg.circle_center + `/>`;

    if (marker.inner) {
      // label
      // todo : a revoir pour bien centrer
      svgInnerDesign = (marker.inner.label) ? `<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
                                                font-size="160" font-family='Arial' fill='` + marker.inner.color + `'>`
                                                + marker.inner.label[0] + `</text>` : "";

      // icon
      // todo : import des icones solaris
      /*fetch(marker.icon.svg)
        .then(response => response.text())
        .then((fileContent) => {
          let start = fileContent.search('<path');
          let fileLength = fileContent.length;
          svgIcon = fileContent.substring(start, fileLength - 7);
          alert(svgIcon)
        })*/

      if (marker.inner.icon === 'temp') {
        svgInnerDesign = `<path fill='` + marker.inner.color + `' d='M216 103.52c26.69-4.23 45.96 11.06 46 38.48v113c.02 12.33 3.89 11.02 9.02 21 3.8 7.4 4.97 13.79 4.98 22v6c-.24 19.8-14.61 37.89-33 44.45-8.1 2.9-13.64 2.64-22 2.55-19.88-.24-37.87-14.54-44.45-33-2.9-8.1-2.64-13.64-2.55-22 .09-7.31 1.96-14.59 5.51-21 5.26-9.49 8.47-8.17 8.49-20V140c.21-17.92 10.56-31.8 28-36.48zm-12 80.32V262c-.03 12.59-4.14 9.61-10.12 20-4.99 8.68-6.01 18.4-3.39 28 9 32.97 55.73 34.79 68.04 3 3.9-10.06 2.96-21.66-2.41-31-5.98-10.39-10.09-7.41-10.12-20V142c-.01-5.76-.11-10.06-3.65-14.99-7.91-11.02-23.97-11.85-33.14-1.92-5.94 6.44-5.21 12.89-5.21 21.07 2.01-.16 7.31-.28 8.98 0 4.27 1.27 5.85 5.26 1.87 7.67-2.52 1.52-7.87 1.17-10.85 1.17v6c2.42 0 8.92-.25 10.85.6 2.94 1.29 3.47 4.58.83 6.38-2.11 1.43-8.94 1.02-11.68 1.02v6c2.98 0 8.33-.35 10.85 1.17 3.98 2.41 2.4 6.4-1.87 7.67-1.67.28-6.97.16-8.98 0zm19 13.73c11.08-.93 13.89 7.02 14 16.43v58c.03 15.93 9.99 10.67 9.99 28 0 10.24-5.6 19.07-15.99 21.47-17.48 4.04-31.51-9.99-27.47-27.47 2.71-11.75 9.44-7.72 9.47-22v-40c0-7.21-1.24-24.38 2.72-29.89 2.04-2.84 4.12-3.58 7.28-4.54z'/>
          `;
      }
      if (marker.inner.icon === 'bat') {
        svgInnerDesign = `<path fill='` + marker.inner.color + `' d='M133 168v-8c0-2.27-.22-5.66 1.02-7.61 1.77-2.78 13.36-7.38 16.98-9.13l51-23.52c4.9-2.36 19.34-9.93 24-9.49 3.19.31 11.45 4.62 15 6.17l36 16.8 27 12.47c3.18 1.46 10.15 3.83 11.98 6.7 1.59 2.49 1.02 12.24 1.02 15.61h50v17h-8v141h8v8h8v9H75v-9h8v-8h8V185h-8v-17h50zm138-18l-30-13.78-15-6.38-14 4.92L179 151h63c6.26 0 24.17.91 29-1zm-96 35h-16v133h16V185zm33 0h-16v133h16V185zm50 0h-16v133h16V185zm33 0h-16v133h16V185zm-150 17h-32v41h32v-41zm200 0h-32v41h32v-41zm-200 59h-32v40h32v-40zm200 0h-32v40h32v-40z'/>
      `;
      }
    }
    // gauge
    if (marker.gauge) {
      const arc = marker.gauge.percent * 1193 / 100;
      svgGauge = commonSvg.circle_gauge + `stroke='` + marker.gauge.color + `' stroke-dasharray='` + arc + `, 1193' transform='rotate(-90 225 225)'/>`;
    }

    // build shape
    const border = `<path fill='` + borderColor + `' ` + ((marker.shape.anchored) ? commonSvg.circle_anchored_border : commonSvg.circle_border) + `/>`;
    const innerColor = `<path fill='` + marker.shape.color + `' ` + ((marker.shape.anchored) ? commonSvg.circle_anchored_inner_color : commonSvg.circle_inner_color) + `/>`;

    // result
    return `<svg xmlns='http://www.w3.org/2000/svg' width='` + width + `' height='` + height + `' viewBox='0 0 450 545'>`
      + border + innerColor + svgCenter + svgInnerDesign + svgGauge
      + `</svg>`;
  }
}
