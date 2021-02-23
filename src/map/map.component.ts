import {AfterViewInit, Component} from '@angular/core';

import { IotMapManager, IotCluster, IotMarker, IotUserMarker, ShapeType, IotMapManagerConfig, MarkerStatus, TabType } from 'iotmapmanager';

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
      status: 'warning',
      tab: {
        content: `<span class='iotmap-icons-vehicle'></span>`
      },
      inner: {
        label: "H"
      },
      shape:{
        accuracy: 300
      }
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
      tab: {
        content: 'XXX',
        type: TabType.large
      }
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
      layer: 'etablissements',
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
      layer: 'etablissements',
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
      layer: 'etablissements',
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
      layer: 'etablissements',
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
      layer: 'etablissements',
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
      tab: {
        content: `<span>ABC</span>`,
        type: TabType.large
      }
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
      id: 'services',
      location: {
        lat: 44.882,
        lng: 4.89
      },
      contentLabel: 'Services',
      childCount: 80,
      aggregation: [
        {
          singularState: 'Health',
          pluralState: 'Health',
          count: 15,
          color: '#d24d57'
        },
        {
          singularState: 'Service',
          pluralState: 'Services',
          count: 25,
          color: '#526e91'
        },
        {
          singularState: 'Civil service',
          pluralState: 'Civil services',
          count: 10,
          color: '#874b0e'
        },
        {
          singularState: 'Transport',
          pluralState: 'Transport',
          count: 30,
          color: '#19a0b8'
        }]
    },
    {
      id: 'entertainments',
      location: {
        lat: 44.882,
        lng: 4.885
      },
      layer: 'etablissements',
      contentLabel: 'Entertainment',
      childCount: 60,
      aggregation: [
        {
          singularState: 'food and drink',
          pluralState: 'food and drink',
          count: 15,
          color: '#467e74'
        },
        {
          singularState: 'shopping',
          pluralState: 'shopping',
          count: 20,
          color: '#b8860b'
        },
        {
          singularState: 'entertainment',
          pluralState: 'entertainment',
          count: 15,
          color: '#886288'
        },
        {
          singularState: 'outdoor',
          pluralState: 'outdoor',
          count: 10,
          color: '#176129'
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

  ngAfterViewInit(): void {
   IotMapManagerConfig.setConfig({
     markerTemplates: {
       'vehicle': {
         layer: 'vehicles',
         shape: {
           type: ShapeType.circle,
           anchored: true,
           plain: true
         },
         inner: {
           icon: 'iotmap-icons-vehicle'
         }
       }
     },
     map: {
       externalClustering: true,
     },
     layerTemplates: {
       'etablissements': {
         content: `<span class='iotmap-icons-School'></span>`,
         type: TabType.normal
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


    //this.commonIotMap.fitMapToBounds(this.commonIotMap.getMapBounds());
    setTimeout (() => { this.commonIotMap.selectElement('s3')}, 3000);
    setTimeout (() => { this.commonIotMap.selectElement('services')}, 6000);
    setTimeout (() => { this.commonIotMap.selectElement('p2')}, 9000);



    //setTimeout (() => { this.commonIotMap.updateCluster('entertainments', { layer: 'vehicles'})}, 3000);
    //setTimeout (() => { this.commonIotMap.updateMarker('c2', { tab: {content: null}})}, 3000);
   /* setTimeout(() => {this.commonIotMap.updateMarker('s1',{popup: {title:'bidon'}});}, 2000)
    setTimeout (() => { this.commonIotMap.updateMarker('s2', { tab: {content: 'AAA'}})}, 4000);
    setTimeout (() => { this.commonIotMap.updateMarker('p3', { location: {lat: 44.892, lng: 4.880}, shape: {accuracy: 150}})}, 6000);
*/
// setBounds
/*
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
*/


  }
}

