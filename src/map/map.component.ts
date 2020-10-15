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
      position: [44.895,4.870],
      color: '#FFCC00',
      shape: 'square',
      label : "A",
      labelColor : "green",
      anchored: false,
      selected: false},
    {
      id: "s2",
      position: [44.895,4.875],
      color: '#32C832',
      shape: 'square',
      anchored: true,
      plain : true,
      selected: false},
    {
      id: "s3",
      position: [44.895,4.88],
      color: '#527EDB',
      shape: 'square',
      anchored: true,
      selected: true},
    {
      id: "s4",
      position: [44.895,4.885],
      color: '#CCCCCC',
      shape: 'square',
      icon: 'bat',
      iconColor: 'black',
      anchored: false,
      selected: false},
    {
      id: "s5",
      position: [44.895,4.890],
      color: '#000000',
      shape: 'square',
      icon: 'temp',
      iconColor: 'green',
      anchored: true,
      selected: false},
    {
      id: "s6",
      position: [44.895,4.895],
      color: '#CD3C14',
      shape: 'square',
      icon: 'bat',
      iconColor: 'black',
      anchored: false,
      selected: true},

    // POI
    {
      id: "p1",
      position: [44.890,4.870],
      color: '#008080',
      shape: 'poi',
      anchored: false,
      selected: false},
    {
      id: "p2",
      position: [44.890,4.875],
      color: '#cc6600',
      shape: 'poi',
      anchored: true,
      selected: false},
    {
      id: "p3",
      position: [44.888798,4.885407],
      color: '#d24d50',
      shape: 'poi',
      anchored: true,
      selected: true},
    {
      id: "p4",
      position: [44.890,4.885],
      color: '#008080',
      shape: 'poi',
      icon: 'bat',
      iconColor: 'black',
      anchored: false,
      selected: false},
    {
      id: "p5",
      position: [44.890,4.890],
      color: '#cc6600',
      shape: 'poi',
      icon: 'temp',
      iconColor: 'white',
      anchored: true,
      selected: false},
    {
      id: "p6",
      position: [44.890,4.895],
      color: '#d24d50',
      shape: 'poi',
      icon: 'bat',
      iconColor: 'white',
      anchored: false,
      selected: true},

    // circle
    {
      id: "c1",
      position: [44.885,4.870],
      color: '#CD3C14',
      shape: 'circle',
      anchored: false,
      label: "H",
      selected: false},
    {
      id: "c2",
      position: [44.885,4.875],
      color: '#000000',
      shape: 'circle',
      anchored: true,
      plain : true,
      selected: false},
    {
      id: "c3",
      position: [44.885,4.88],
      color: '#CC6600',
      shape: 'circle',
      icon: 'temp',
      iconColor: 'black',
      anchored: true,
      selected: true},
    {
      id: "c4",
      position: [44.885,4.885],
      color: '#527EDB',
      shape: 'circle',
      icon: 'bat',
      iconColor: 'black',
      anchored: false,
      selected: false},
    {
      id: "c5",
      position: [44.885,4.890],
      color: '#32C832',
      shape: 'circle',
      icon: 'temp',
      iconColor: 'green',
      anchored: true,
      selected: false},
    {
      id: "c6",
      position: [44.885,4.895],
      color: '#FFCC00',
      shape: 'circle',
      anchored: false,
      label: "A",
      selected: true}
      ];

  markersIdToRemove = ["c6", "p4", "s2", "z2"];

  markerToAdd = {
    id: "toAdd",
    position: [44.886, 4.895],
    color: 'purple',
    shape: 'circle',
    anchored: true,
    selected: false
  };

  markerToUpdate1 = {
    id: "toUpdate",
    position: [44.887, 4.895],
    color: 'green',
    shape: 'circle',
    anchored: true,
    selected: true
  }

  markerToUpdate2 = {
    id: "toUpdate",
    position: [44.887, 4.895],
    color: 'blue',
    shape: 'circle',
    anchored: true,
    selected: true
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

    this.commonIotMap.addMarker(this.markerToUpdate1);
    this.commonIotMap.updateMarker(this.markerToUpdate2);
  }
}

