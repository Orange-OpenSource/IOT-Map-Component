/*
* Software Name : IotMapManager
* Version: 0.1.1
* SPDX-FileCopyrightText: Copyright (c) 2020 Orange Business Services
* SPDX-License-Identifier: MIT
*
* This software is distributed under the MIT License,
* the text of which is available at <license-url>
* or see the "license.txt" file for more details.
*
* Author: S. Gateau
* Software description: provide markers, tabs, clusters and paths dedicated to iot projects using mapping
*/

import * as commonSvg from "./iotMapCommonSvg";
import * as config from "../iotMapManager.json";
export class iotSquareMarker {

  backGroundColor : string = "";
  borderColor : string = "";
  svgIcon : string = "";
  svgLabel : string = "";
  width : string = "0";
  height : string = "0";

  getSvg (marker) {
    // reinit
    this.backGroundColor = "";
    this.borderColor = "";
    this.svgIcon = "";
    this.svgLabel = "";

    // sizing
    this.width = (marker.selected) ? config.markers.size.selected.width : config.markers.size.unselected.width;
    this.height = (marker.selected) ? config.markers.size.selected.height : config.markers.size.unselected.height;

    // border color
    this.borderColor = (marker.selected) ? marker.color : config.markers.square.borderColor;

    // background color
    this.backGroundColor = (marker.shape == 'poi' || marker.plain) ? marker.color : config.markers.square.backgroundColor;

    // label
    // todo : a revoir pour bien centrer
    this.svgLabel = (marker.label != undefined) ? `<text font-size="250" fill="` + marker.labelColor + `" stroke="#003366" stroke-width="1px" x="135" y="305" font-family="Arial">`+ marker.label + `</text>` : "";

    // icon
    // todo : import des icones solaris
    if (marker.icon == 'temp') {
      this.svgIcon = `<path fill="`+ marker.iconColor + `" d="M216 103.52c26.69-4.23 45.96 11.06 46 38.48v113c.02 12.33 3.89 11.02 9.02 21 3.8 7.4 4.97 13.79 4.98 22v6c-.24 19.8-14.61 37.89-33 44.45-8.1 2.9-13.64 2.64-22 2.55-19.88-.24-37.87-14.54-44.45-33-2.9-8.1-2.64-13.64-2.55-22 .09-7.31 1.96-14.59 5.51-21 5.26-9.49 8.47-8.17 8.49-20V140c.21-17.92 10.56-31.8 28-36.48zm-12 80.32V262c-.03 12.59-4.14 9.61-10.12 20-4.99 8.68-6.01 18.4-3.39 28 9 32.97 55.73 34.79 68.04 3 3.9-10.06 2.96-21.66-2.41-31-5.98-10.39-10.09-7.41-10.12-20V142c-.01-5.76-.11-10.06-3.65-14.99-7.91-11.02-23.97-11.85-33.14-1.92-5.94 6.44-5.21 12.89-5.21 21.07 2.01-.16 7.31-.28 8.98 0 4.27 1.27 5.85 5.26 1.87 7.67-2.52 1.52-7.87 1.17-10.85 1.17v6c2.42 0 8.92-.25 10.85.6 2.94 1.29 3.47 4.58.83 6.38-2.11 1.43-8.94 1.02-11.68 1.02v6c2.98 0 8.33-.35 10.85 1.17 3.98 2.41 2.4 6.4-1.87 7.67-1.67.28-6.97.16-8.98 0zm19 13.73c11.08-.93 13.89 7.02 14 16.43v58c.03 15.93 9.99 10.67 9.99 28 0 10.24-5.6 19.07-15.99 21.47-17.48 4.04-31.51-9.99-27.47-27.47 2.71-11.75 9.44-7.72 9.47-22v-40c0-7.21-1.24-24.38 2.72-29.89 2.04-2.84 4.12-3.58 7.28-4.54z"/>
        `;
    }
    if (marker.icon == 'bat') {
      this.svgIcon = `<path fill="`+ marker.iconColor + `" d="M133 168v-8c0-2.27-.22-5.66 1.02-7.61 1.77-2.78 13.36-7.38 16.98-9.13l51-23.52c4.9-2.36 19.34-9.93 24-9.49 3.19.31 11.45 4.62 15 6.17l36 16.8 27 12.47c3.18 1.46 10.15 3.83 11.98 6.7 1.59 2.49 1.02 12.24 1.02 15.61h50v17h-8v141h8v8h8v9H75v-9h8v-8h8V185h-8v-17h50zm138-18l-30-13.78-15-6.38-14 4.92L179 151h63c6.26 0 24.17.91 29-1zm-96 35h-16v133h16V185zm33 0h-16v133h16V185zm50 0h-16v133h16V185zm33 0h-16v133h16V185zm-150 17h-32v41h32v-41zm200 0h-32v41h32v-41zm-200 59h-32v40h32v-40zm200 0h-32v40h32v-40z"/>
        `;
    }

    // select right shape
    let svgToReturn = (marker.anchored) ? this.getSqrAnchoredSvg(marker) : this.getSqrSvg(marker);

    // result
    return  `<svg xmlns="http://www.w3.org/2000/svg" width="`+ this.width + `" height="`+ this.height + `" viewBox="0 0 450 545">`
            + svgToReturn
            + `</svg>`;
  }

  getSqrAnchoredSvg(marker) {
    let border = `<path fill="`+ this.borderColor + `" ` + commonSvg.sqr_anchored_border +`/>`;
    let inner_color = `<path fill="`+ marker.color + `" `+ commonSvg.sqr_anchored_inner_color +`/>`;
    let inner_shape = `<path fill="`+ this.backGroundColor + `" ` + commonSvg.sqr_anchored_inner_shape +`/>`;

    return border + inner_shape + inner_color + this.svgIcon + this.svgLabel;

  }

  getSqrSvg(marker) {
    let border = `<path fill="`+ this.borderColor + `" ` + commonSvg.sqr_border + `/>`;
    let inner_color = `<path fill="`+ marker.color + `" ` + commonSvg.sqr_inner_color + `/>`;
    let inner_shape =`<path fill="`+ this.backGroundColor + `" ` + commonSvg.sqr_inner_shape + `/>`;

    return border + inner_color + inner_shape + this.svgIcon + this.svgLabel;
  }

}
