import * as L from 'leaflet';
import {Injectable} from "@angular/core";
import { IotMapMarkers } from '../IotMapMarkers/iopMapMarkers';


@Injectable()
export class CommonIotMap {
  static readonly DEFAULT_COORDINATES: number[] = [46.603354, 1.8883335];
  static readonly DEFAULT_ZOOM_LEVEL: number = 5;

  map: any;
  iotMapMarkers : IotMapMarkers;

  baseLayers: { Satellite: any; Standard: any };
  //marker: any;

  constructor() {
    this.iotMapMarkers = new IotMapMarkers();
  }

  init(selector) {
    this.map = L.map(selector).setView([44.8888929,4.8849108], 15);

    const defaultLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    const geoportailLayer = L.tileLayer('https://wxs.ign.fr/{apikey}/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}', {
      attribution: '<a target="_blank" href="https://www.geoportail.gouv.fr/">Geoportail France</a>',
      apikey: 'choisirgeoportail',
      format: 'image/jpeg',
      style: 'normal'
    });

    this.baseLayers = {
      Standard: defaultLayer,
      Satellite: geoportailLayer
    }
  };

  addMarkers(markerList: any) {
    let map = this.map;
    markerList.forEach(mark => {
      let marker =  null;
      if (mark.shape == 'square') {
        marker = this.iotMapMarkers.getSquareMarker(mark.color);
      } else if (mark.shape == 'poi') {
        marker = this.iotMapMarkers.getPoiMarker(mark.color);
      } else if (mark.shape == 'circle') {
        marker = this.iotMapMarkers.getCircleMarker(mark.color);
      }
      L.marker(mark.position, {icon: marker}).addTo(map);
    });
  }
}
