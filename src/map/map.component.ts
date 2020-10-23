import {
  Component,
  AfterViewInit
} from '@angular/core';

import { IotMapManager } from '../iotMapManager/iotMapManager';

@Component({
  selector: 'map-component',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements AfterViewInit {
  commonIotMap : IotMapManager;
  title ="IotMap";
  markersList = [
    //square
    {
      id: "s1",
      location: [44.895,4.870],
      shape: {
        shape: 'square',
        color: '#FFCC00',
        anchored: false
      },
      inner : {
        icon : "A",
        color: "green"
      },
    },
    {
      id: "s2",
      location: [44.895,4.875],
      shape: {
        shape : 'square',
        color: '#32C832',
        anchored: true,
        plain : true
      },
    },
    {
      id: "s3",
      location: [44.895,4.88],
      shape: {
        shape : 'square',
        color: '#527EDB',
        anchored: true
      },
    },
    {
      id: "s4",
      location: [44.895,4.885],
      shape: {
        shape : 'square',
        color: '#CCCCCC',
        anchored: false
      },
      inner: {
        icon: 'bat',
        color: 'black'
      },
    },
    {
      id: "s5",
      location: [44.895,4.890],
      shape: {
        shape : 'square',
        color: '#000000',
        anchored: true
      },
      inner: {
        icon: 'temp',
        color: 'green'
      },
    },
    {
      id: "s6",
      location: [44.895,4.895],

      shape: {
        shape : 'square',
        color: '#CD3C14',
        anchored: false
      },
      inner: {
        icon: 'bat',
        color: 'black'
      },
    },

    // POI
    {
      id: "p1",
      location: [44.890,4.870],
      shape: {
        shape : 'poi',
        color: '#008080',
        anchored: false
      },
    },
    {
      id: "p2",
      location: [44.890,4.875],
      shape: {
        shape : 'poi',
        color: '#cc6600',
        anchored: true
      },
    },
    {
      id: "p3",
      location: [44.888798,4.885407],
      shape: {
        shape : 'poi',
        color: '#d24d50',
        anchored: true
      },
    },
    {
      id: "p4",
      location: [44.890,4.885],
      shape: {
        shape : 'poi',
        color: '#008080',
        anchored: false
      },
      inner: {
        icon: 'bat',
        color: 'black'
      },
    },
    {
      id: "p5",
      location: [44.890,4.890],
      shape: {
        shape : 'poi',
        color: '#cc6600',
        anchored: true
      },
      inner: {
        icon: 'temp',
        color: 'white'
      },
    },
    {
      id: "p6",
      location: [44.890,4.895],
      shape: {
        shape : 'poi',
        color: '#d24d50',
        anchored: false
      },
      inner: {
        icon: 'bat',
        color: 'white'
      },
    },

    // circle
    {
      id: "c1",
      location: [44.885,4.870],
      shape: {
        shape : 'circle',
        color: '#CD3C14',
        anchored: false
      },
      inner : {
        label: "H",
        color: "black"
      },
    },
    {
      id: "c2",
      location: [44.885,4.875],
      shape: {
        shape : 'circle',
        color: '#000000',
        anchored: true,
        plain : true
      },
    },
    {
      id: "c3",
      location: [44.885,4.88],
      shape: {
        shape : 'circle',
        color: '#CC6600',
        anchored: true
      },
      inner: {
        icon: 'temp',
        color: 'black'
      },
    },
    {
      id: "c4",
      location: [44.885,4.885],
      shape: {
        shape : 'circle',
        color: '#527EDB',
        anchored: false
      },
      inner: {
        icon: 'bat',
        color: 'black'
      },
    },
    {
      id: "c5",
      location: [44.885,4.890],
      shape: {
        shape : 'circle',
        color: '#32C832',
        anchored: true
      },
      inner: {
        icon : 'temp',
        color: 'green'
      },
    },
    {
      id: "c6",
      location: [44.885, 4.895],
      shape: {
        shape: 'circle',
        color: '#FFCC00',
        anchored: false
      },
      inner: {
        label: "A",
        color: "black",
        icon: 'temp',
      }
    }];

  markersIdToRemove = ["p4", "s2", "z2"];

  markerToAdd = {
    id: "toAdd",
    location: [44.886, 4.895],
    shape: {
      shape : 'circle',
      color: 'purple',
      anchored: true
    },
    inner: {
      icon: '../assets/4g.svg',
      color: 'blue'
    }
  };

  markerToUpdate = {
    id: "toUpdate",
    location: [44.887, 4.895],
    shape : {
      shape: 'circle',
      color: 'green',
      anchored: true
    },
    gauge: {
      color : 'red',
      percent: '10'
    }
  }

  constructor() {
    this.commonIotMap = new IotMapManager();
  }

  ngAfterViewInit(): void {
    this.commonIotMap.init('iotMap');

    this.commonIotMap.addMarker(this.markerToAdd);
    this.commonIotMap.removeMarker("toRemove"); // unknown marker

    this.commonIotMap.addMarkers(this.markersList);
    this.commonIotMap.removeMarkers(this.markersIdToRemove);
    this.commonIotMap.addMarker(this.markerToUpdate);

    // update marker
    this.commonIotMap.updateMarker("s3", {inner: {icon:'temp', color:'blue'}});
    setTimeout(() => { this.commonIotMap.updateMarker(this.markerToUpdate.id, {location: [44.887, 4.898], shape : {color: 'blue'}, gauge :{percent: '40'}}) }, 2000);
    setTimeout(() => { this.commonIotMap.updateMarker(this.markerToAdd.id, {shape : {shape : 'square', color : 'green'}}) }, 4000);
    setTimeout(() => { this.commonIotMap.updateMarker("s3", {inner: {label:'green'}})}, 6000);
    setTimeout(() => { this.commonIotMap.updateMarker(this.markerToUpdate.id, {gauge :{color: 'green'}}) }, 6000);



    //
  }
}

