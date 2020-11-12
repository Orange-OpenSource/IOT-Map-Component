/*
* Software Name : IotMapManager
* Version: 0.2.2
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

export class IotSquareMarker {
  getSvg(marker, selected = false) {
    // shape
    let svgShape = '';
    let svgBG = '';
    let svgBorder = '';
    let shadowFile = '';

    if (selected) {
      // todo anchored ?
      if (marker.shape.shape == 'poi' || marker.shape.plain) {  // STD
        svgShape = `<path fill='`+ marker.shape.color + `' fill-rule='evenodd' ` + commonSvg.sqrSelStdColour + `/>`;
      } else {  // FUN
        svgShape = `<path fill='`+ marker.shape.color + `' fill-rule='evenodd' ` + commonSvg.sqrSelFunColour + `/>`;
        svgBG = commonSvg.sqrSelFunBg;
      }
      shadowFile = 'assets/img/POI_SQR_SEL_Shadow.png';
    } else if (marker.shape.shape == 'poi' || marker.shape.plain) {  // STD
      if (marker.shape.anchored) {
        svgBorder = commonSvg.sqrPinBorder;
        svgShape = `<path fill='`+ marker.shape.color + `' fill-rule='evenodd' ` + commonSvg.sqrPinStdColour + `/>`;
        shadowFile = 'assets/img/POI_SQR_PIN_Shadow.png';
      } else {
        svgBorder = commonSvg.sqrBorder;
        svgShape = `<rect  fill='`+ marker.shape.color + `' fill-rule='evenodd' ` + commonSvg.sqrStdColour + `/>`;
        shadowFile = 'assets/img/POI_SQR_Shadow.png';
      }
    } else {  // FUN
      if (marker.shape.anchored) {
        svgBorder = commonSvg.sqrPinBorder;
        svgShape = `<path fill='`+ marker.shape.color + `' fill-rule='evenodd' ` + commonSvg.sqrPinFunColour + `/>`;
        svgBG = `<path fill='white' fill-rule='evenodd' ` + commonSvg.sqrPinFunBg + `/>`;
        shadowFile = 'assets/img/POI_SQR_PIN_Shadow.png';
      } else {
        svgBorder = commonSvg.sqrBorder;
        svgShape = `<path fill='`+ marker.shape.color + `' fill-rule='evenodd' ` + commonSvg.sqrFunColour + `/>`;
        svgBG = commonSvg.sqrFunBg;
        shadowFile = 'assets/img/POI_SQR_Shadow.png';
      }
    }

    // inner
    let svgInnerDesign = '';
    let imgIcon = '';
    if (marker.inner) {
      // todo : à revoir pour bien centrer
      svgInnerDesign = (marker.inner.label) ? `<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
                                                font-size="20" font-family='Arial' fill='` + marker.inner.color + `'>`
                                                + marker.inner.label[0] + `</text>` : '';

      // icon
      if (marker.inner.icon) {
        const iconClass = (selected) ? 'selected' : 'unselected';
        imgIcon = `<img class='` + iconClass + `' src='assets/icons/` + marker.inner.icon + `' />`;
      }
    }

    // shadow
    const shadowClass = (selected) ? 'shadowSelected' : 'shadowUnselected';
    const imgShadow = `<img class='` + shadowClass + `' src='`+ shadowFile + `'/>`;


    // result
    return  `<div class="container">`
                + imgShadow
                + `<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'>`
                    + svgBG + svgBorder + svgShape  + svgInnerDesign
                    + `</svg>`
                + imgIcon + `
             </div>`;
  }
}
