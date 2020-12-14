import {AfterViewInit, Component} from '@angular/core';

import { IotMapManager } from 'iotmapmanager/iotMapManager';
import { IotCluster, IotMarker, markerType } from 'iotmapmanager/iotMapManagerTypes';
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
        lon: 4.870
      },
      shape: {
        type: markerType.square,
        anchored: false,
        plain : false
      },
      layer: 'Monuments',
      status : 'toto',
      inner : {
        label : 'H',
        color: 'green'
      },
    },
    {
      id: 's2',
      location: {
        lat: 44.895,
        lon: 4.875
      },
      shape: {
        type : markerType.square,
        anchored: true
      },
      popup: `Ecole Jean Rostand : <a href='https://bv.ac-grenoble.fr/carteforpub/uai/0260969M'>ici</a>`,
      inner: {
        icon: 'School.svg',
        color: 'green'
      },
      layer: 'Etablissements',
      status : 'Positive',
    },
    {
      id: 's3',
      location: {
        lat: 44.895,
        lon: 4.88
      },
      popup: `<img src='assets/icons/School.svg'/> Collège Debussy`,
      shape: {
        type : markerType.square,
        plain: true,
        anchored: true
      },
      layer: 'Etablissements',
      inner: {
        color: 'white',
        label: 'A'
      },
      status : 'Positive',
    },
    {
      id: 's4',
      location: {
        lat: 44.895,
        lon: 4.885
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
        lon: 4.890
      },
      shape: {
        type : markerType.square,
        anchored: true,
        plain: false
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
        lon: 4.895
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
      layer: 'Monuments',
      status : 'Warning',
    },

    // POI
    {
      id: 'p1',
      location: {
        lat: 44.890,
        lon: 4.870
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
      }
    },
    {
      id: 'p2',
      location: {
        lat: 44.890,
        lon: 4.875
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
      layer: 'Etablissements'
    },
    {
      id: 'p3',
      location: {
        lat: 44.888793,
        lon: 4.885409
      },
      shape: {
        type : markerType.poi,
        anchored: true
      },
      layer: 'Monuments'
    },
    {
      id: 'p4',
      location: {
        lat: 44.890,
        lon: 4.885
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
    },
    {
      id: 'p5',
      location: {
        lat: 44.885,
        lon: 4.9
      },
      shape: {
        type : markerType.poi,
        anchored: true
      },
      layer: 'Etablissements',
      inner: {
        icon: 'hospital.svg',
        color: 'white'
      },
    },
    {
      id: 'p6',
      location: {
        lat: 44.890,
        lon: 4.895
      },
      shape: {
        type : markerType.poi,
        anchored: false
      },
      layer: 'Etablissements',
      inner: {
        icon: 'map_pin.svg',
        color: 'white'
      },
    },


    // circle
    {
      id: 'c1',
      layer: 'circles',
      location: {
        lat: 44.885,
        lon: 4.870
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
      status: 'Neutral'
    },
    {
      id: 'c2',
      layer: 'circles',
      location: {
        lat: 44.885,
        lon: 4.875
      },
      shape: {
        type : markerType.circle,
        anchored: true,
        plain : true,
        accuracy: 200
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
        lon: 4.88
      },
      shape: {
        type : markerType.circle,
        anchored: true,
        percent: 95,
        accuracy: 200
      },
      inner: {
        icon: 'Car_pooling.svg',
        color: 'black'
      }
    },
    {
      id: 'c4',
      layer: 'circles',
      location: {
        lat: 44.885,
        lon: 4.885
      },
      shape: {
        type : markerType.circle,
        anchored: false,
        percent: 75
      },
      inner: {
        icon: 'Car_pooling.svg',
        color: 'black'
      },
      status: 'Positive'
    },
    {
      id: 'c5',
      layer: 'circles',
      location: {
        lat: 44.885,
        lon: 4.890
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
      status: 'Alert'
    },
    {
      id: 'c6',
      layer: 'circles',
      location: {
        lat: 44.885,
        lon: 4.895
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
      },
      status: 'Warning'
    }];

  markersIdToRemove = ['p4', 's2', 'z2'];

  markerToAdd: IotMarker = {
    id: 'toAdd',
    location: {
      lat: 44.886,
      lon: 4.895
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
      lon: 4.895
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

  clustersList: IotCluster[] = [
    {
      id: 'cluster1',
      location: {
        lat: 44.89,
        lon: 4.895
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
        lon: 4.89
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


  ngAfterViewInit(): void {
 /*  IotMapManagerConfig.setConfig({
      markerStatus: {
        'Alert': {
            singularState : 'hello !',
            pluralState: 'Oranges !',
            stateColor: 'purple',
            innerColor: 'yellow'
        }
      },
      map: {
        defaultLon: 4.95,
        layerControl: false
      }
    });
*/
    this.commonIotMap.onMove = () => {
      const coord = this.commonIotMap.getBounds();
      console.log('map bounds changed: [' + coord._northEast.lat + ', ' + coord._northEast.lng
                                    + '] / [' + coord._southWest.lat + ', ' + coord._southWest.lng + ']');
    };

    this.commonIotMap.init('iotMap');


    this.commonIotMap.addMarker(this.markerToAdd);
    this.commonIotMap.removeMarker('toRemove'); // unknown marker

    this.commonIotMap.addMarkers(this.markersList);
    setTimeout  (() => { this.commonIotMap.updateMarker('c2', {shape: {percent: 35, accuracy: 800}}); }, 3000);



    this.commonIotMap.removeMarkers(this.markersIdToRemove);
    this.commonIotMap.addMarker(this.markerToUpdate);

    // update marker
    this.commonIotMap.updateMarker('s3', {inner: {icon: 'Orange_garden.svg', color: 'blue'}});
    setTimeout(() => { this.commonIotMap.updateMarker(this.markerToUpdate.id,
      {gauge : {color: 'red', percent: '90'}
      });
    }, 2000);
   setTimeout(() => { this.commonIotMap.updateMarker(this.markerToAdd.id,
     {shape: {type: markerType.square, color: 'green'}});
    }, 4000);
    setTimeout(() => { this.commonIotMap.updateMarker('s3',
      {inner: {label: 'Debussy'}});
    }, 6000);
    setTimeout(() => { this.commonIotMap.updateMarker(this.markerToUpdate.id,
      {gauge: {color: 'green'}});
    }, 6000);

    this.commonIotMap.addClusters(this.clustersList);
    setTimeout(() => { this.commonIotMap.removeCluster('cluster1'); }, 3000);
    setTimeout(() => { this.commonIotMap.updateMarker('c3', {shape: {accuracy: 0}}); }, 6000);


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

    setTimeout (() => { this.commonIotMap.redrawAll(); }, 8000);
  }
}

