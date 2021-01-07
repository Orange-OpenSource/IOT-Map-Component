import {AfterViewInit, Component} from '@angular/core';

import { IotMapManager } from 'iotmapmanager/iotMapManager';
import {IotCluster, IotMarker, IotUserMarker, markerType} from 'iotmapmanager/iotMapManagerTypes';
import { IotMapManagerConfig, Status } from 'iotmapmanager/iotMapManagerConfig';

@Component({
  selector: 'map-component',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})



export class MapComponent implements AfterViewInit {
  commonIotMap: IotMapManager = new IotMapManager();
  conf: IotMapManagerConfig = IotMapManagerConfig.getConfig();
  title = 'IotMap';

  markersList: IotMarker[] = [
    // square
    {
      id: 's1',
      location: {
        lat: 44.895,
        lng: 4.870
      },
      shape: {
        type: markerType.square,
        anchored: false,
        plain : false
      },
      layer: 'Monuments',
      status : 'Positive',
      inner : {
        label : 'H',
        color: 'green'
      },
    },
    {
      id: 's2',
      location: {
        lat: 44.895,
        lng: 4.875
      },
      shape: {
        type : markerType.square,
        anchored: true,
        plain : false
      },
      popup: `Ecole Jean Rostand : <a href='https://bv.ac-grenoble.fr/carteforpub/uai/0260969M'>ici</a>`,
      inner: {
        icon: 'School.svg',
        color: 'green'
      },
      layer: 'Etablissements',
      status : 'Neutral',
    },
    {
      id: 's3',
      location: {
        lat: 44.895,
        lng: 4.88
      },
      popup: `<img src='assets/icons/School.svg'/> Collège Debussy`,
      shape: {
        type : markerType.square,
        plain : false,
        anchored: true
      },
      layer: 'Etablissements',
      inner: {
        color: 'white',
        label: 'A'
      },
      status : 'Warning',
    },
    {
      id: 's4',
      location: {
        lat: 44.895,
        lng: 4.885
      },
      shape: {
        type : markerType.square,
        anchored: false,
        plain: false
      },
      inner: {
        icon: 'accessibility_hearing.svg',
        color: 'black'
      },
      layer: 'Monuments',
      status: 'Alert',
    },
    {
      id: 's5',
      location: {
        lat: 44.895,
        lng: 4.890
      },
      shape: {
        type : markerType.square,
        anchored: true,
        plain: false,
        accuracy: 200
      },
      inner: {
        icon: 'bluetooth.svg',
        color: 'green'
      },
      layer: 'Etablissements',
      status: 'Inactive',
    },
    {
      id: 's6',
      location: {
        lat: 44.895,
        lng: 4.895
      },

      shape: {
        type : markerType.square,
        anchored: false,
        plain: false
      },
      inner: {
        icon: 'family_place.svg',
        color: 'black'
      },
      layer: 'Monuments'
    },

    // POI
    {
      id: 'p1',
      location: {
        lat: 44.890,
        lng: 4.870
      },
      shape: {
        type : markerType.poi,
        anchored: false,
        plain: false
      },
      layer: 'Etablissements',
      inner: {
        icon: 'School.svg',
        color: 'blue'
      },
      status: 'Positive'
    },
    {
      id: 'p2',
      location: {
        lat: 44.890,
        lng: 4.875
      },
      popup: 'Ecole Simone Veil',
      shape: {
        type : markerType.poi,
        anchored: true
      },
      inner: {
        icon: 'School.svg',
        color: 'navyblue'
      },
      layer: 'Etablissements',
      status: 'Neutral'
    },
    {
      id: 'p3',
      location: {
        lat: 44.890,
        lng: 4.880
      },
      shape: {
        type : markerType.poi,
        anchored: true
      },
      layer: 'Monuments',
      status: 'Warning'
    },
    {
      id: 'p4',
      location: {
        lat: 44.890,
        lng: 4.885
      },
      shape: {
        type : markerType.poi,
        anchored: false
      },
      layer: 'Monuments',
      inner: {
        icon: 'games.svg',
        color: 'black'
      },
      status: 'Alert'
    },
    {
      id: 'p5',
      location: {
        lat: 44.890,
        lng: 4.890
      },
      shape: {
        type : markerType.poi,
        anchored: true,
        accuracy: 300
      },
      layer: 'Etablissements',
      inner: {
        icon: 'hospital.svg',
        color: 'white'
      },
      status: 'Inactive'
    },
    {
      id: 'p6',
      location: {
        lat: 44.890,
        lng: 4.895
      },
      shape: {
        type : markerType.poi,
        anchored: false
      },
      layer: 'Etablissements',
      inner: {
        icon: 'map_pin.svg',
        color: 'white'
      }
    },


    // circle
    {
      id: 'c1',
      layer: 'circles',
      location: {
        lat: 44.885,
        lng: 4.870
      },
      shape: {
        type : markerType.circle,
        anchored: false,
        percent: 100,
        accuracy: 500
      },
      inner: {
        icon: 'Car_pooling.svg',
        color: 'black'
      },
      status: 'Positive'
    },
    {
      id: 'c2',
      layer: 'circles',
      location: {
        lat: 44.885,
        lng: 4.875
      },
      shape: {
        type : markerType.circle,
        anchored: true,
        plain : true
      },
      status: 'Neutral',
      inner: {
        icon: 'Car_pooling.svg',
        color: 'black'
      }
    },
    {
      id: 'c3',
      layer: 'circles',
      location: {
        lat: 44.885,
        lng: 4.88
      },
      shape: {
        type : markerType.circle,
        anchored: true,
        percent: 75
      },
      inner: {
        icon: 'Car_pooling.svg',
        color: 'black'
      },
      status: 'Warning'
    },
    {
      id: 'c4',
      layer: 'circles',
      location: {
        lat: 44.885,
        lng: 4.885
      },
      shape: {
        type : markerType.circle,
        anchored: false
      },
      inner: {
        icon: 'Car_pooling.svg',
        color: 'black'
      },
      status: 'Alert'
    },
    {
      id: 'c5',
      layer: 'circles',
      location: {
        lat: 44.885,
        lng: 4.890
      },

      shape: {
        type : markerType.circle,
        anchored: false,
        plain: false
      },
      inner: {
        label: 'A',
        color: 'black'
      },
      status: 'Inactive'
    },
    {
      id: 'c6',
      layer: 'circles',
      location: {
        lat: 44.885,
        lng: 4.895
      },
      popup: `<img src='../assets/icons/temperature.svg'><br>La <i>température</i><br><b>de 18°C</b>`,
      shape: {
        type: markerType.circle,
        anchored: false,
        percent: 45
      },
      inner: {
        icon : 'temperature.svg',
        color: 'green'
      }
    }];
  /*
    markersIdToRemove = ['p4', 's2', 'z2'];

    markerToAdd: IotMarker = {
      id: 'toAdd',
      location: {
        lat: 44.886,
        lng: 4.895
      },
      layer: 'circles',
      shape: {
        type : markerType.circle,
        anchored: false
      },
      inner: {
        icon: '4g.svg',
        color: 'blue'
      },

    };

    markerToUpdate: IotMarker = {
      id: 'toUpdate',
      layer: 'circles',
      location: {
        lat: 44.887,
        lng: 4.895
      },
      shape : {
        type: markerType.circle,
        anchored: true
      },
      status: 'Warning',
      inner: {
        label: 'X',
        color: 'gray'
      }
    };
  */
  clustersList: IotCluster[] = [
    {
      id: 'cluster1',
      location: {
        lat: 44.89,
        lng: 4.895
      },
      contentLabel: 'clésCluster1',
      childCount: 40,
      aggregation: [
        {
          singularState: 'cleRouge',
          pluralState: 'cleRouges',
          count: 20,
          color: 'red'
        },
        {
          singularState: 'cleVerte',
          pluralState: 'cleVertes',
          count: 15,
          color: 'green'
        },
        {
          singularState: 'clebleue',
          pluralState: 'clebleues',
          count: 5,
          color: 'blue'
        }]
    },
    {
      id: 'cluster2',
      location: {
        lat: 44.89,
        lng: 4.89
      },
      contentLabel: 'clésCluster2',
      childCount: 90,
      aggregation: [
        {
          singularState: 'cleRouge',
          pluralState: 'cleRouges',
          count: 15,
          color: 'red'
        },
        {
          singularState: 'cleVerte',
          pluralState: 'cleVertes',
          count: 60,
          color: 'green'
        },
        {
          singularState: 'clebleue',
          pluralState: 'clebleues',
          count: 15,
          color: 'blue'
        }]
    }
  ];
  userMarker: any = {
    location: {
      lat: 44.890,
      lng: 4.870
    },
    accuracy: 500,
    direction: 45
  }

  userMarker2: any = {
    direction: 60
  }

  userMarker3: any = {
    accuracy: 250
  }

  userMarker4: any = {
    direction: -90,
    accuracy: null
  }

  userMarker5: any = {
    location: {
      lat: 44.890,
      lng: 4.875
    }
  }



  ngAfterViewInit(): void {
   /*IotMapManagerConfig.setConfig({
      map: {
        externalClustering: true
      }
    });*/

    this.commonIotMap.onMove = () => {
      const coord = this.commonIotMap.getBounds();
      console.log('map bounds changed: [' + coord.getNorthEast().lat + ', ' + coord.getNorthEast().lng
                                    + '] / [' + coord.getSouthWest().lat + ', ' + coord.getSouthWest().lng + ']');
    };

    this.commonIotMap.init('iotMap');


    this.commonIotMap.addMarkers(this.markersList);


    this.commonIotMap.addClusters(this.clustersList);



    this.commonIotMap.addUserMarker(this.userMarker);
    setTimeout (() => { this.commonIotMap.updateUserMarker(this.userMarker2);}, 2000);
    setTimeout (() => { this.commonIotMap.updateUserMarker(this.userMarker3);}, 3000);
    setTimeout (() => { this.commonIotMap.updateUserMarker(this.userMarker4);}, 4000);
    setTimeout (() => { this.commonIotMap.updateUserMarker(this.userMarker5);}, 5000);


setTimeout(() => { this.commonIotMap.updateMarker("c1", {shape: { accuracy: null}});}, 3000);
/*

    setTimeout  (() => { IotMapManagerConfig.setConfig({
      markerStatus: {
        'Neutral': {
          singularState : 'hello !',
          pluralState: 'Oranges !',
          stateColor: 'purple',
          innerColor: 'yellow'
        }
      }
    }); }, 5000);

    setTimeout (() => { this.commonIotMap.redrawAll(); }, 8000);*/
  }
}

