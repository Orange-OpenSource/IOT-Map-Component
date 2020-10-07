import {
  Component,
  AfterViewInit
} from '@angular/core';

import { CommonIotMap } from '../commonIotMap/commonIotMap';

@Component({
  selector: 'map-component',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements AfterViewInit {
  commonIotMap : CommonIotMap;
  title ="IotMap";

  constructor() {
    this.commonIotMap = new CommonIotMap();
  }

  ngAfterViewInit(): void {
    this.commonIotMap.init('iotMap');

    let markersList = [
      {
        position: [44.8888929,4.883],
        color: 'red',
        shape: 'square'},
      {
        position: [44.89,4.884],
        color: 'yellow',
        shape: 'square'},
      {
        position: [44.886,4.883],
        color: 'black',
        shape: 'circle'},
      {
        position: [44.887,4.886],
        color: 'green',
        shape: 'poi'}];

    this.commonIotMap.addMarkers(markersList);
  }
}

