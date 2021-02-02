import {AfterViewInit, Component} from '@angular/core';

import { IotMapManager, IotCluster, IotMarker, IotUserMarker, ShapeType, IotMapManagerConfig, MarkerStatus } from 'iotmapmanager';


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
      template: 'square',
      status : 'positive'
    },
    {
      id: 's2',
    location: {
        lat: 44.895,
        lng: 4.875
      },
      popup: {
        title: 'Ecole Jean Rostand : ',
        body: `<a href='https://bv.ac-grenoble.fr/carteforpub/uai/0260969M'>ici</a>`
      },
      template: 'square',
      status : 'neutral',
    },
    {
      id: 's3',
    location: {
        lat: 44.895,
        lng: 4.88
      },
      popup: {
        title: `<img src='assets/icons/School.svg'/>`,
        body: 'Collège Debussy'
      },
      template: 'square',
      status : 'warning',
    },
    {
      id: 's4',
    location: {
        lat: 44.895,
        lng: 4.885
      },
      template: 'square',
      status: 'alert',
    },
    {
      id: 's5',
    location: {
        lat: 44.895,
        lng: 4.890
      },
      shape: {
        type : ShapeType.square,
        anchored: true,
        plain: false,
        accuracy: 200
      },
      inner: {
        icon: 'iotmap-icons-bluetooth',
        color: 'green'
      },
      layer: 'Etablissements',
      status: 'inactive',
    },
    {
      id: 's6',
      location: {
        lat: 44.895,
        lng: 4.895
      },
      template: 'square',
    },

    // POI
    {
      id: 'p1',
      location: {
        lat: 44.890,
        lng: 4.870
      },
      shape: {
        type : ShapeType.square,
        anchored: false,
        plain: false
      },
      layer: 'Etablissements',
      inner: {
        icon: 'iotmap-icons-School',
        color: 'blue'
      },
      status: 'positive'
    },
    {
      id: 'p2',
    location: {
        lat: 44.890,
        lng: 4.875
      },
      popup: {
        title: 'Title',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.'
      },
      shape: {
        type : ShapeType.square,
        anchored: true,
        plain: true
      },
      inner: {
        icon: 'iotmap-icons-School',
        color: 'navyblue'
      },
      layer: 'Etablissements',
      status: 'neutral'
    },
    {
      id: 'p3',
    location: {
        lat: 44.890,
        lng: 4.880
      },
      template: 'monument',
      status: 'warning'
    },
    {
      id: 'p4',
    location: {
        lat: 44.890,
        lng: 4.885
      },
      template: 'monument',
      status: 'alert'
    },
    {
      id: 'p5',
    location: {
        lat: 44.890,
        lng: 4.890
      },
      shape: {
        type : ShapeType.square,
        anchored: true,
        plain: true,
        accuracy: 300
      },
      layer: 'Etablissements',
      inner: {
        icon: 'iotmap-icons-hospital',
        color: 'white'
      },
      status: 'inactive'
    },
    {
      id: 'p6',
    location: {
        lat: 44.890,
        lng: 4.895
      },
      shape: {
        type : ShapeType.square,
        plain: true,
        anchored: false
      },
      layer: 'Etablissements',
      inner: {
        icon: 'iotmap-icons-map_pin',
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
        type: ShapeType.circle,
        percent: 75,
        anchored: false
      },
      status: 'positive',
      inner: {
        icon: 'iotmap-icons-vehicle',
        color: 'black'
      },
      template: 'vehicle'
    },
    {
      id: 'c2',
      layer: 'circles',
      location: {
        lat: 44.885,
        lng: 4.875
      },
      template: 'vehicle',
      status: 'neutral',
    },
    {
      id: 'c3',
      layer: 'circles',
    location: {
        lat: 44.885,
        lng: 4.88
      },
      template: 'vehicle',
      status: 'warning'
    },
    {
      id: 'c4',
      layer: 'circles',
    location: {
        lat: 44.885,
        lng: 4.885
      },
      template: 'vehicle',
      status: 'alert'
    },
    {
      id: 'c5',
      layer: 'circles',
    location: {
        lat: 44.885,
        lng: 4.890
      },
      template: 'vehicle',
      status: 'inactive'
    },
    {
      id: 'c6',
      location: {
        lat: 44.885,
        lng: 4.895
      },
      popup: {
        title: `<img src='../assets/icons/temperature.svg'><br>`,
        body: `La <i>température</i><br><b>de 18°C</b>`,
      },
      template: 'square',
      status: 'warning',
      inner: {
        label: "H",
        color: 'black'
      }
    }];

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
      lat: 44.9,
      lng: 4.8818
    },
    accuracy: 150,
    direction: 180
  }
/*
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
*/


  ngAfterViewInit(): void {
   IotMapManagerConfig.setConfig({
     markerTemplates: {

       'vehicle': {
         layer: 'Vehicles',
         shape: {
           type: ShapeType.circle,
           anchored: true,
           plain: true
         },
         inner: {
           icon: 'iotmap-icons-vehicle'
         }
       }
     }
    });
    this.commonIotMap.onMove = () => {
      const coord = this.commonIotMap.getBounds();
      console.log('map bounds changed: [' + coord.getNorthEast().lat + ', ' + coord.getNorthEast().lng
                                    + '] / [' + coord.getSouthWest().lat + ', ' + coord.getSouthWest().lng + ']');
    };

    this.commonIotMap.init('iotMap');


    this.commonIotMap.addMarkers(this.markersList);


    this.commonIotMap.addClusters(this.clustersList);



    this.commonIotMap.addUserMarker(this.userMarker);

    setTimeout(() => { this.commonIotMap.updateMarker('s6', {template : 'Temperature'});}, 3000);


// setBounds


    /*setTimeout(() => {
      const currentCoord = this.commonIotMap.getBounds();
      let southWest = L.latLng(currentCoord.getSouth() + 0.02, currentCoord.getWest() + 0.02);
      let northEast = L.latLng(currentCoord.getNorth() + 0.02, currentCoord.getEast() + 0.02);
      let newCoord = L.latLngBounds(southWest, northEast);
      this.commonIotMap.setBounds(newCoord);
      }, 5000);*/

    setTimeout (() => { this.commonIotMap.updateUserMarker({ location: { lat: 44.9, lng: 4.8818 }, direction: 180});}, 1000);
    setTimeout (() => { this.commonIotMap.updateUserMarker({ location: { lat: 44.899, lng: 4.8816 }, direction: 180});}, 1500);
    setTimeout (() => { this.commonIotMap.updateUserMarker({ location: { lat: 44.898, lng: 4.8814 }, direction: 180});}, 2000);
    setTimeout (() => { this.commonIotMap.updateUserMarker({ location: { lat: 44.897, lng: 4.8813 }, direction: 180});}, 2500);
    setTimeout (() => { this.commonIotMap.updateUserMarker({ location: { lat: 44.896, lng: 4.8811 }, direction: 180});}, 3000);
    setTimeout (() => { this.commonIotMap.updateUserMarker({ location: { lat: 44.895, lng: 4.8809 }, direction: 180});}, 3500);
    setTimeout (() => { this.commonIotMap.updateUserMarker({ location: { lat: 44.894, lng: 4.8807 }, direction: 180});}, 4000);
    setTimeout (() => { this.commonIotMap.updateUserMarker({ location: { lat: 44.893, lng: 4.8807 }, direction: 120});}, 4500);
    setTimeout (() => { this.commonIotMap.updateUserMarker({ location: { lat: 44.893, lng: 4.8810 }, direction: 90});}, 5000);
    setTimeout (() => { this.commonIotMap.updateUserMarker({ location: { lat: 44.8929, lng: 4.882 }, direction: 90});}, 5500);
    setTimeout (() => { this.commonIotMap.updateUserMarker({ location: { lat: 44.8929, lng: 4.883 }, direction: 90});}, 6000);
    setTimeout (() => { this.commonIotMap.updateUserMarker({ location: { lat: 44.8929, lng: 4.884 }, direction: 120});}, 6500);
    setTimeout (() => { this.commonIotMap.updateUserMarker({ location: { lat: 44.8925, lng: 4.884 }, direction: 180});}, 7000);
    setTimeout (() => { this.commonIotMap.updateUserMarker({ location: { lat: 44.892, lng: 4.884 }, direction: 180});}, 7500);
    setTimeout (() => { this.commonIotMap.updateUserMarker({ location: { lat: 44.891, lng: 4.8845 }, direction: 180});}, 8000);
    setTimeout (() => { this.commonIotMap.updateUserMarker({ location: { lat: 44.890, lng: 4.885 }, direction: 190});}, 8500);


    setTimeout (() => { this.commonIotMap.updateUserMarker({ direction: 200});}, 8700);
    setTimeout (() => { this.commonIotMap.updateUserMarker({ direction: 210});}, 8800);
    setTimeout (() => { this.commonIotMap.updateUserMarker({ direction: 220});}, 8900);
    setTimeout (() => { this.commonIotMap.updateUserMarker({ direction: 230});}, 9000);
    setTimeout (() => { this.commonIotMap.updateUserMarker({ direction: 240});}, 9100);
    setTimeout (() => { this.commonIotMap.updateUserMarker({ direction: 250});}, 9200);
    setTimeout (() => { this.commonIotMap.updateUserMarker({ direction: 260});}, 9300);
    setTimeout (() => { this.commonIotMap.updateUserMarker({ direction: 270});}, 9400);
    setTimeout (() => { this.commonIotMap.updateUserMarker({ direction: 280});}, 9500);
    setTimeout (() => { this.commonIotMap.updateUserMarker({ direction: 280});}, 9600);
    setTimeout (() => { this.commonIotMap.updateUserMarker({ direction: 290});}, 9700);
    setTimeout (() => { this.commonIotMap.updateUserMarker({ direction: 300});}, 9800);
    setTimeout (() => { this.commonIotMap.updateUserMarker({ direction: 310});}, 9900);
    setTimeout (() => { this.commonIotMap.updateUserMarker({ direction: 320});}, 10000);
    setTimeout (() => { this.commonIotMap.updateUserMarker({ direction: 330});}, 10100);
    setTimeout (() => { this.commonIotMap.updateUserMarker({ direction: 340});}, 10200);
    setTimeout (() => { this.commonIotMap.updateUserMarker({ direction: 350});}, 10300);
    setTimeout (() => { this.commonIotMap.updateUserMarker({ direction: 0});}, 10400);


































//setTimeout(() => { this.commonIotMap.updateMarker(c1, {shape: { accuracy: null}});}, 3000);
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

