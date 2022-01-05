/*
* Software Name: IotMapManager
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
/* eslint-disable quotes */

// clusters
export const cluster = {
  svgDefinitionStart: `<svg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 50 50' class='iotmap-clusteropacity'>`,
  svgDefinitionEnd: `</svg>`,
  gauge: `fill-opacity='1' cx='25' cy='25' stroke-width='6' stroke-linecap='butt' fill='none'`,
  clusterBG: `<circle  r='25' cx='25' cy='25' fill='white'/>`,
  shadow: `CLU_Shadow.png`
}

// circle
export const circle = {
  gauge: `cx='50' cy='50' stroke-linecap='butt' fill='none'`,

  stdColour: `r='21' cx='50' cy='50' `,
  funColour: `r='19' cx='50' cy='50' fill='none' stroke-width='4' stroke='`,

  // circle pin
  pinStdColour: `d='M50,29a21.063,21.063,0,0,1,6.733,41L50,79l-6.733-9A21.063,21.063,0,0,1,50,29'`,
  pinFunColour: `fill='white' r='19' cx='50' cy='50'/><path d='M50,29a21.063,21.063,0,0,1,6.733,41L50,79l-6.733-9A21.063,21.063,0,0,1,50,29'`,

  // circle pin selected
  selStdColour: `d='M83,49.951A33,33,0,1,0,41.175,81.711a6.832,6.832,0,0,1,3.281,2.052L50,90l5.544-6.237a6.832,6.832,0,0,1,3.281-2.052A32.973,32.973,0,0,0,83,49.951Z'`,
  selFunColour: `fill='white' r='19' cx='50' cy='50'/><path d='M83,49.951A33,33,0,1,0,41.175,81.711a6.832,6.832,0,0,1,3.281,2.052L50,90l5.544-6.237a6.832,6.832,0,0,1,3.281-2.052A32.973,32.973,0,0,0,83,49.951Z'`,

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
  selShadow: `MOB_CIR_SEL_Shadow.png`,

  // direction
  dirArrow: `d="M8 1l7 16c-7.18-4.3-6.9-4.49-14 0L8 1z"`
}

// square
export const square = {
  gauge: `<rect x='32' y='32' width='36' height='36' rx='2' ry='2' stroke-width='5' stroke-linecap='butt' fill='none'`,

  stdColour: `fill-rule='evenodd' x='30' y='30' width='40' height='40' rx='5.25' ry='5.25'`,
  funColour: `fill-rule='evenodd' x='30' y='30' width='40' height='40' rx='5.25' ry='5.25'`,

  // square pin
  pinStdColour: `fill-rule='evenodd' d='M65,70H57.675a5,5,0,0,0-4.159,2.226L50,77.5l-3.516-5.274A5,5,0,0,0,42.325,70H35a5.015,5.015,0,0,1-5-5V35a5.015,5.015,0,0,1,5-5H65a5.015,5.015,0,0,1,5,5V65A5.015,5.015,0,0,1,65,70Z'`,
  pinFunColour: `fill-rule='evenodd' d='M65,70H57.675a5,5,0,0,0-4.159,2.226L50,77.5l-3.516-5.274A5,5,0,0,0,42.325,70H35a5.015,5.015,0,0,1-5-5V35a5.015,5.015,0,0,1,5-5H65a5.015,5.015,0,0,1,5,5V65A5.015,5.015,0,0,1,65,70Zm-2.5-5h-25A2.5,2.5,0,0,1,35,62.5v-25A2.5,2.5,0,0,1,37.5,35h25A2.5,2.5,0,0,1,65,37.5v25A2.5,2.5,0,0,1,62.5,65Z'`,

  // square pin selected
  selStdColour: `fill-rule='evenodd' d='M74,18H26a8.192,8.192,0,0,0-8,8V74a8.192,8.192,0,0,0,8,8H41a6.682,6.682,0,0,1,4.707,2.037L50,90l4.3-5.963A6.661,6.661,0,0,1,59,82H74a7.947,7.947,0,0,0,8.025-7.691L82,26A8.192,8.192,0,0,0,74,18Z'`,
  selFunColour: `fill-rule='evenodd' d='M74,18H26a8.192,8.192,0,0,0-8,8V74a8.192,8.192,0,0,0,8,8H41a6.682,6.682,0,0,1,4.707,2.037L50,90l4.3-5.963A6.661,6.661,0,0,1,59,82H74a7.947,7.947,0,0,0,8.025-7.691L82,26A8.192,8.192,0,0,0,74,18ZM71.875,75H28.125A3.125,3.125,0,0,1,25,71.875V28.125A3.125,3.125,0,0,1,28.125,25h43.75A3.125,3.125,0,0,1,75,28.125v43.75A3.125,3.125,0,0,1,71.875,75Z'`,

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
}

export const user = {
  border: `<circle r='11' cx='11' cy='11' fill='white'/>`,
  inner: `<circle r='8' cx='11' cy='11' fill='#527EDB'/>`,
  arrow: `fill='#527EDB' d="M15.194 2.416c-0.003 0.003-0.147 0.019-0.314 0.029-0.166 0.013-0.333 0.029-0.368 0.035s-0.134 0.022-0.224 0.032c-0.211 0.022-0.342 0.045-0.832 0.125-0.035 0.003-0.099 0.019-0.144 0.029s-0.218 0.051-0.384 0.086c-0.592 0.131-1.597 0.445-2 0.624-0.051 0.026-0.189 0.083-0.304 0.128-0.307 0.128-1.117 0.534-1.469 0.742-1.024 0.602-1.907 1.283-2.752 2.122-1.437 1.43-2.534 3.162-3.226 5.088-0.24 0.675-0.493 1.648-0.586 2.266-0.080 0.509-0.093 0.611-0.112 0.822-0.013 0.122-0.029 0.266-0.038 0.32-0.029 0.182-0.035 1.795-0.010 2.112 0.032 0.368 0.096 0.963 0.115 1.056 0.010 0.035 0.045 0.23 0.080 0.432 0.301 1.725 1.005 3.475 2.010 5.008 0.115 0.176 0.221 0.333 0.237 0.352 0.013 0.016 0.125 0.17 0.25 0.336 0.762 1.018 1.658 1.914 2.669 2.678 0.806 0.605 1.299 0.912 2.195 1.36 1.203 0.598 2.765 1.088 4.013 1.254 0.070 0.010 0.23 0.032 0.352 0.048 0.611 0.083 2.118 0.115 2.736 0.058 1.494-0.138 2.755-0.438 4.048-0.963 0.662-0.272 1.507-0.701 2.032-1.037 0.522-0.333 1.107-0.749 1.379-0.979 0.064-0.054 0.186-0.157 0.272-0.227s0.256-0.221 0.381-0.336c2.144-1.997 3.552-4.49 4.122-7.296 0.102-0.493 0.176-0.963 0.202-1.28 0.010-0.131 0.026-0.275 0.035-0.32 0.029-0.144 0.035-1.798 0.006-2.112-0.035-0.435-0.093-0.918-0.125-1.104-0.016-0.090-0.045-0.253-0.064-0.368-0.262-1.485-0.89-3.165-1.667-4.454-0.189-0.31-0.525-0.835-0.582-0.906-0.013-0.019-0.131-0.176-0.266-0.352-1.642-2.195-3.955-3.859-6.589-4.736-0.874-0.291-1.99-0.531-2.832-0.611-0.115-0.010-0.25-0.026-0.304-0.035-0.106-0.016-1.923-0.042-1.942-0.026zM23.037 9.443c-0.221 0.448-1.008 2.054-1.325 2.701-0.163 0.333-0.48 0.982-0.704 1.44s-0.557 1.133-0.736 1.504c-0.179 0.368-0.512 1.046-0.736 1.504s-0.557 1.133-0.736 1.504c-0.179 0.368-0.512 1.046-0.736 1.504s-0.544 1.11-0.71 1.453c-0.166 0.342-0.573 1.171-0.902 1.84-0.33 0.672-0.627 1.28-0.659 1.357-0.032 0.074-0.070 0.134-0.080 0.134-0.016 0-0.202-0.656-0.678-2.416-0.035-0.125-0.083-0.298-0.106-0.384-0.099-0.358-0.278-1.018-0.4-1.472-0.077-0.291-0.272-1.002-0.32-1.168-0.016-0.061-0.070-0.256-0.118-0.429l-0.090-0.317-1.28-0.349c-0.704-0.192-1.638-0.445-2.080-0.566-0.438-0.122-1.238-0.336-1.776-0.483-0.538-0.144-0.998-0.269-1.024-0.278-0.048-0.016 0.144-0.115 1.088-0.566 0.563-0.269 1.315-0.63 1.856-0.89 0.221-0.106 0.544-0.262 0.72-0.346s0.515-0.246 0.752-0.362c0.237-0.112 0.576-0.275 0.752-0.358s0.614-0.294 0.973-0.467c0.358-0.176 0.656-0.317 0.659-0.317 0.006 0 0.31-0.147 0.675-0.323 0.368-0.179 0.8-0.384 0.957-0.461 0.16-0.074 0.426-0.202 0.592-0.282s0.534-0.256 0.816-0.39c0.282-0.138 0.672-0.323 0.864-0.416 1.318-0.63 1.779-0.851 2.336-1.12 0.282-0.134 0.614-0.294 0.736-0.352 0.512-0.24 1.382-0.659 1.456-0.704 0.045-0.022 0.083-0.032 0.090-0.019 0.003 0.013-0.051 0.147-0.125 0.294z" `,
  shadow: `USR_Shadow.png`
}

export const path = {
  start: `<circle r='12' cx='12' cy='12' fill='white'/><circle r='8' cx='12' cy='12' fill='#32C832'/>`,
  end: `<circle r='12' cx='12' cy='12' fill='white'/><circle r='8' cx='12' cy='12' fill='#CD3C14'/><circle r='3' cx='12' cy='12' fill='white'/>`,
  mid: `<circle r='12' cx='12' cy='12' fill='#527EDB'/><circle r='8' cx='12' cy='12' fill='white'/>`
}

/* eslint-enable quotes */
