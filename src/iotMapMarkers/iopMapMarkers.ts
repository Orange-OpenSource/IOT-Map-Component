import * as L from 'leaflet';
import {Injectable} from "@angular/core";

@Injectable()
export class IotMapMarkers {
  borderSquare = `
       position: absolute;
       width: 3rem;
       height: 3rem;
       left: -1.5rem;
       top: -1.5rem;
       border-radius: 0.5rem;
   `;

  middleSquare = `
       width: 2rem;
      height: 2rem;
      left: 0.5rem;
      top: 0.5rem;
      position: absolute;
      background-color: white;
      border-radius: 0.25rem;
      `;

  borderCircle = `
      width: 3rem;
      height: 3rem;
      left: 0rem;
      top: 1.5rem;
      position: absolute;
      border-radius: 3rem;
      `;

  middleCircle = `
      width: 2rem;
      height: 2rem;
      left: 0.5rem;
      top: 0.5rem;
      position: absolute;
      background-color: white;
      border-radius: 2rem;
      `;

  pin1 = `
      position: absolute;
      width: 0;
      height: 0;
      top: 2.9rem;
      left: 0.9rem;
      border-left: 0.6rem solid transparent;
      border-right: 0.6rem solid transparent;
    `;


  pin2 = `
       position: absolute;
      width: 0;
      height: 0;
      top: 2.4rem;
      left: 0.45rem;
      border-left: 0.6rem solid transparent;
      border-right: 0.6rem solid transparent;
       `;


  tab = `
    position: absolute;
    width: 3rem;
    height: 3rem;
    left: -1.5rem;
    top: -3rem;
    border-radius: 0.5rem;
    background-color: white;
  `;


  getCircleMarker(color) {
    return L.divIcon({
      className: "my-custom-pin",
      iconAnchor: [0, 24],
      labelAnchor: [30, 42],
      popupAnchor: [15, 42],
      html: `<div style="${this.tab}"/>
             <div style="${this.borderCircle} background-color:${color};" />
             <div style="${this.middleCircle}"/>
             <div style="${this.pin2} border-top: 0.75rem solid ${color};" />

        `
    });
  };

  getSquareMarker(color) {
    return L.divIcon({
      className: "my-custom-pin",
      iconAnchor: [0, 24],
      labelAnchor: [30, 42],
      popupAnchor: [15, 42],
      html: `<div style="${this.borderSquare} background-color:${color};" />
             <div style="${this.middleSquare}"/>
             <div style="${this.pin2} border-top: 0.75rem solid ${color};" />

        `

    });
  }

  getPoiMarker(color) {
    return L.divIcon({
      className: "my-custom-pin",
      iconAnchor: [0, 24],
      labelAnchor: [30, 42],
      popupAnchor: [15, 42],
      html: `<div style="${this.borderSquare} background-color:${color};" />
             <div style="${this.pin1} border-top: 0.75rem solid ${color};" />
             `
    });
  }
}
