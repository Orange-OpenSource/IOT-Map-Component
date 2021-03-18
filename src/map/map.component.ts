import {AfterViewInit, Component} from '@angular/core';

import {
  IotMapManager,
  IotCluster,
  IotMarker,
  IotUserMarker,
  IotPath,
  ShapeType,
  IotMapConfig,
  TabType,
  IotMapMarkerManager,
  IotMapClusterManager,
  IotMapUserMarkerManager,
  IotMapPathManager
} from 'iotmapmanager'

@Component({
  selector: 'map-component',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements AfterViewInit {
  conf: IotMapConfig = new IotMapConfig();
  commonIotMap: IotMapManager = new IotMapManager(this.conf)
  iotMapMarkerManager: IotMapMarkerManager = new IotMapMarkerManager(this.commonIotMap, this.conf)
  iotMapClusterManager: IotMapClusterManager = new IotMapClusterManager(this.commonIotMap, this.conf)
  iotMapUserMarkerManager: IotMapUserMarkerManager = new IotMapUserMarkerManager(this.commonIotMap, this.conf)
  iotMapPathManager: IotMapPathManager = new IotMapPathManager(this.commonIotMap, this.conf)
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
   /* {
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
    },*/
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

  userMarker: IotUserMarker = {
    location: { lat: 44.897, lng: 4.8813 }/*{
      lat: 44.9,
      lng: 4.8818
    }*/,
    accuracy: 150,
    direction: 180
  }

  chemin: IotPath = {
    id: 'chemin',
    points: [
      { lat: 44.9, lng: 4.8818 },
      { lat: 44.899, lng: 4.8816 },
      { lat: 44.898, lng: 4.8814 },
      { lat: 44.897, lng: 4.8813 },
      { lat: 44.896, lng: 4.8811 },
      { lat: 44.895, lng: 4.8809 },
      { lat: 44.894, lng: 4.8807 },
      { lat: 44.893, lng: 4.8807 },
      { lat: 44.893, lng: 4.8810 },
      { lat: 44.8929, lng: 4.882 },
      { lat: 44.8929, lng: 4.883 },
      { lat: 44.8929, lng: 4.884 },
      { lat: 44.8925, lng: 4.884 },
      { lat: 44.892, lng: 4.884 }],
    intermediatePos: [
      { lat: 44.896, lng: 4.8811 },
      { lat: 44.8929, lng: 4.884 }],
    // sidePath: [
    //   {
    //     line: 1,
    //     color: '#CD3C14',
    //     points: [
    //       {lat: 44.9, lng: 4.8818},
    //       {lat: 44.899, lng: 4.8816},
    //       {lat: 44.898, lng: 4.8814},
    //       {lat: 44.897, lng: 4.8813},
    //       {lat: 44.896, lng: 4.8811},
    //       {lat: 44.895, lng: 4.8809}]
    //   },
    //   {
    //     line: 1,
    //     color: '#CD3C14',
    //     points: [
    //       { lat: 44.8929, lng: 4.883 },
    //       { lat: 44.8929, lng: 4.884 },
    //       { lat: 44.8925, lng: 4.884 },
    //       { lat: 44.892, lng: 4.884 }]
    //   },
    //   {
    //     line: 2,
    //     color: '#FFCC00',
    //     points: [
    //
    //       {lat: 44.897, lng: 4.8813},
    //       {lat: 44.896, lng: 4.8811},
    //       {lat: 44.895, lng: 4.8809},
    //       {lat: 44.894, lng: 4.8807},
    //       {lat: 44.893, lng: 4.8807},
    //       {lat: 44.893, lng: 4.8810},
    //       {lat: 44.8929, lng: 4.882}]
    //   },
    //   {
    //     line: 2,
    //     color: '#FFCC00',
    //     points: [
    //       { lat: 44.8925, lng: 4.884 },
    //       { lat: 44.892, lng: 4.884 }]
    //   },
    //   {
    //     line: 3,
    //     color: '#32C832',
    //     points: [
    //       {lat: 44.9, lng: 4.8818},
    //       {lat: 44.899, lng: 4.8816},
    //       {lat: 44.898, lng: 4.8814},
    //       {lat: 44.897, lng: 4.8813},
    //       {lat: 44.896, lng: 4.8811}]
    //   },
    //   {
    //     line: 3,
    //     color: '#32C832',
    //     points: [
    //       { lat: 44.895, lng: 4.8809 },
    //       { lat: 44.894, lng: 4.8807 },
    //       { lat: 44.893, lng: 4.8807 },
    //       { lat: 44.893, lng: 4.8810 },
    //       { lat: 44.8929, lng: 4.882 },
    //       { lat: 44.8929, lng: 4.883 },
    //       { lat: 44.8929, lng: 4.884 },
    //       { lat: 44.8925, lng: 4.884 },
    //       { lat: 44.892, lng: 4.884 }]
    //   },
    //   {
    //     line: 4,
    //     color: 'black',//'#CCCCCC',
    //     points: [
    //       { lat: 44.897, lng: 4.8813 },
    //       { lat: 44.896, lng: 4.8811 },
    //       { lat: 44.895, lng: 4.8809 },
    //       { lat: 44.894, lng: 4.8807 },
    //       { lat: 44.893, lng: 4.8807 },
    //       { lat: 44.893, lng: 4.8810 },
    //       { lat: 44.8929, lng: 4.882 },
    //       { lat: 44.8929, lng: 4.883 },
    //       { lat: 44.8929, lng: 4.884 },
    //       { lat: 44.8925, lng: 4.884 },
    //       { lat: 44.892, lng: 4.884 }]
    //   }
    // ]
  }

  ngAfterViewInit(): void {
    this.conf.setConfig({
     markerTemplates: {
       'vehicle': {
         layer: 'vehicle',
         shape: {
           type: ShapeType.circle,
           anchored: true,
           plain: true,
           accuracy: 800
         },
         inner: {
           icon: 'iotmap-icons-vehicle'
         }
       }
     },
     map: {
       externalClustering: false,
     },
     layerTemplates: {
       'etablissements': {
         content: `<span class='iotmap-icons-School'></span>`,
         type: TabType.normal
       }
     }
   });
    this.commonIotMap.onMove = () => {
      const coord = this.commonIotMap.getIotMap().getBounds()
      console.log('map bounds changed: [' + coord.getNorthEast().lat + ', ' + coord.getNorthEast().lng
                                    + '] / [' + coord.getSouthWest().lat + ', ' + coord.getSouthWest().lng + ']')
    }

    this.commonIotMap.init('iotMap')
    this.iotMapMarkerManager.addMarkers(this.markersList)
    this.iotMapClusterManager.addClusters(this.clustersList)
    this.iotMapUserMarkerManager.addUserMarker(this.userMarker)
    this.iotMapPathManager.addPath(this.chemin)

    setTimeout(() => { this.iotMapMarkerManager.updateMarker('s1', {shape: {accuracy: 600}})}, 3000)
    setTimeout(() => { this.iotMapMarkerManager.removeMarker('s1')}, 5000)
    setTimeout(() => { this.iotMapMarkerManager.updateMarker('s5', {shape : { accuracy: undefined}})}, 5000)
  }
}

