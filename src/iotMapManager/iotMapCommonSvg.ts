/*
* Software Name: IotMapManager
* Version: 0.4.1
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

export class IotMapCommonSvg {
// tslint:disable:max-line-length
// clusters
  static cluster: any = {
    svgDefinitionStart: `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'>`,
    svgDefinitionEnd: `</svg>`,
    gauge: `<circle cx='100' cy='100' stroke-width='18' stroke-linecap='butt' fill='none'`,
    clusterBG: `<circle r='75' cx='100' cy='100' fill='white'/>`, // fill-opacity='0.5'/>`
    shadow: `CLU_Shadow.png`,
  };


// circle
  static circle: any = {
    gauge: `<circle cx='50' cy='50' stroke-linecap='butt' fill='none'`,

    stdColour: `<circle r='21' cx='50' cy='50' `,
    funColour: `<circle r='19' cx='50' cy='50' fill='none' stroke-width='4' stroke='`,

// circle pin
    pinStdColour: `<path d='M50,29a21.063,21.063,0,0,1,6.733,41L50,79l-6.733-9A21.063,21.063,0,0,1,50,29'`,
    pinFunColour: `<path fill='white' r='19' cx='50' cy='50'/><path d='M50,29a21.063,21.063,0,0,1,6.733,41L50,79l-6.733-9A21.063,21.063,0,0,1,50,29'`,

// circle pin selected
    selStdColour: `<path d='M83,49.951A33,33,0,1,0,41.175,81.711a6.832,6.832,0,0,1,3.281,2.052L50,90l5.544-6.237a6.832,6.832,0,0,1,3.281-2.052A32.973,32.973,0,0,0,83,49.951Z'`,
    selFunColour: `<path fill='white' r='19' cx='50' cy='50'/><path d='M83,49.951A33,33,0,1,0,41.175,81.711a6.832,6.832,0,0,1,3.281,2.052L50,90l5.544-6.237a6.832,6.832,0,0,1,3.281-2.052A32.973,32.973,0,0,0,83,49.951Z'`,


// borders
    pinBorder: ` <path fill='white' d="M49.975,28.6A21.267,21.267,0,0,1,56.827,70.03l-6.852,9.1-6.852-9.1A21.267,21.267,0,0,1,49.975,28.6m0-1.6A22.985,22.985,0,0,0,28.806,40.968a22.816,22.816,0,0,0,2.6,22.368,23.022,23.022,0,0,0,10.73,8.039l6.56,8.708,1.282,1.7,1.282-1.7,6.56-8.708a23.022,23.022,0,0,0,10.73-8.039A22.783,22.783,0,0,0,66.22,33.7,22.959,22.959,0,0,0,49.975,27h0Z"/>`,
    border: `<path fill='white' d="M50,27A23,23,0,1,1,27,50,23,23,0,0,1,50,27Zm0,2A21,21,0,1,1,29,50,21,21,0,0,1,50,29Z"/>`,

// backgrounds
    funBg: `<circle fill='white' r='16' cx='50' cy='50'/>`,
    pinFunBg: ``,
    selFunBg: ``,

// shadows
    shadow: `MOB_CIR_Shadow.png`,
    pinShadow: `MOB_CIR_PIN_Shadow.png`,
    selShadow: `MOB_CIR_SEL_Shadow.png`
  };

// square
  static square: any = {
    gauge: `<rect x='32' y='32' width='36' height='36' rx='2' ry='2' stroke-width='5' stroke-linecap='butt' fill='none'`,

    stdColour: `<rect fill-rule='evenodd' x='30' y='30' width='40' height='40' rx='5.25' ry='5.25'`,
    funColour: `<rect fill-rule='evenodd' x='30' y='30' width='40' height='40' rx='5.25' ry='5.25' fill='`,

// square pin
    pinStdColour: `<path fill-rule='evenodd' d='M65,70H57.675a5,5,0,0,0-4.159,2.226L50,77.5l-3.516-5.274A5,5,0,0,0,42.325,70H35a5.015,5.015,0,0,1-5-5V35a5.015,5.015,0,0,1,5-5H65a5.015,5.015,0,0,1,5,5V65A5.015,5.015,0,0,1,65,70Z'`,
    pinFunColour: `<path fill-rule='evenodd' d='M65,70H57.675a5,5,0,0,0-4.159,2.226L50,77.5l-3.516-5.274A5,5,0,0,0,42.325,70H35a5.015,5.015,0,0,1-5-5V35a5.015,5.015,0,0,1,5-5H65a5.015,5.015,0,0,1,5,5V65A5.015,5.015,0,0,1,65,70Zm-2.5-5h-25A2.5,2.5,0,0,1,35,62.5v-25A2.5,2.5,0,0,1,37.5,35h25A2.5,2.5,0,0,1,65,37.5v25A2.5,2.5,0,0,1,62.5,65Z'`,

// square pin selected
    selStdColour: `<path fill-rule='evenodd' d='M74,18H26a8.192,8.192,0,0,0-8,8V74a8.192,8.192,0,0,0,8,8H41a6.682,6.682,0,0,1,4.707,2.037L50,90l4.3-5.963A6.661,6.661,0,0,1,59,82H74a7.947,7.947,0,0,0,8.025-7.691L82,26A8.192,8.192,0,0,0,74,18Z'`,
    selFunColour: `<path fill-rule='evenodd' d='M74,18H26a8.192,8.192,0,0,0-8,8V74a8.192,8.192,0,0,0,8,8H41a6.682,6.682,0,0,1,4.707,2.037L50,90l4.3-5.963A6.661,6.661,0,0,1,59,82H74a7.947,7.947,0,0,0,8.025-7.691L82,26A8.192,8.192,0,0,0,74,18ZM71.875,75H28.125A3.125,3.125,0,0,1,25,71.875V28.125A3.125,3.125,0,0,1,28.125,25h43.75A3.125,3.125,0,0,1,75,28.125v43.75A3.125,3.125,0,0,1,71.875,75Z'`,


// borders
    pinBorder: `<path fill='white' d='M65,70H57.675a5,5,0,0,0-4.159,2.226L50,77.5l-3.516-5.274A5,5,0,0,0,42.325,70H35a5.015,5.015,0,0,1-5-5V35a5.015,5.015,0,0,1,5-5H65a5.015,5.015,0,0,1,5,5V65A5.015,5.015,0,0,1,65,70ZM64.728,28.007H35.346A7.38,7.38,0,0,0,28,35.4V64.991A6.768,6.768,0,0,0,35,72h7a3.891,3.891,0,0,1,2.556,1.485L48,78.687,50,82l2.074-3.314,3.444-5.2A3.735,3.735,0,0,1,58,72h7a6.828,6.828,0,0,0,7.073-7.009V35.4a7.38,7.38,0,0,0-7.345-7.4h0Z'/>`,
    border: `<path fill='white' d='M34,28H66a6,6,0,0,1,6,6V66a6,6,0,0,1-6,6H34a6,6,0,0,1-6-6V34A6,6,0,0,1,34,28Zm1,2H65a5,5,0,0,1,5,5V65a5,5,0,0,1-5,5H35a5,5,0,0,1-5-5V35A5,5,0,0,1,35,30Z'/>`,

// backgrounds
    funBg: `<rect fill='white' x='35' y='35' width='30' height='30' rx='3.125' ry='3.125'/>`,
    pinFunBg: `<rect fill='white' x='35' y='35' width='30' height='30' rx='3.125' ry='3.125'/>`,
    selFunBg: `<rect fill='white' x='25' y='25' width='50' height='50' rx='3.125' ry='3.125'/>`,

// shadows
    shadow: `POI_SQR_Shadow.png`,
    pinShadow: `POI_SQR_PIN_Shadow.png`,
    selShadow: `POI_SQR_SEL_Shadow.png`
  };

// tslint:enable:max-line-length
}
