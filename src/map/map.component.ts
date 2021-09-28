import { AfterViewInit, Component } from '@angular/core'
//import { LatLngBounds } from 'leaflet'
import * as L2 from 'leaflet'
import {
  IotMapManager,
  IotCluster,
  IotMarker,
  IotUserMarker,
  IotPath,
  IotArea,
  ShapeType,
  IotMapConfig,
  TabType,
  IotMapMarkerManager,
  IotMapClusterManager,
  IotMapUserMarkerManager,
  IotMapPathManager,
  IotMapAreaManager
// } from 'iotmapmanager'
} from '../iotMapManager/index'

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
  iotMapAreaManager: IotMapAreaManager = new IotMapAreaManager(this.commonIotMap, this.conf)
  title = 'IotMap';


  /*louvre: IotMarker[] = [
    {
      id: 'louvre0',
      location: {
        // 48.860743255641864, 2.334427649553126
        lat: 48.860743255641864,
        lng: 2.334427649553126
      },
      shape: {
        type: ShapeType.circle,
        color: 'green'
      }
    },
    {
      id: 'louvre1',
      location: {
        //48.861085136556426, 2.3380619555947417
        lat: 48.861085136556426,
        lng: 2.3380619555947417
      },
      shape: {
        type: ShapeType.circle,
        color: 'blue'
      }
    },
    {
      id: 'louvre2',
      location: {
        //48.86070879079482, 2.339612689001815
        lat: 48.86070879079482,
        lng: 2.339612689001815
      },
      shape: {
        type: ShapeType.circle,
        color: 'pink'
      }
    },
    {
      id: 'louvre3',
      location: {
        //48.859671980834776, 2.339080338429262
        //48.8596527407599, 2.3390260721760634
        lat: 48.8596527407599,
        lng: 2.3390260721760634
      },
      shape: {
        type: ShapeType.circle,
        color: 'red'
      }
    },
    {
      id: 'louvre4',
      location: {
        //48.86003015712788, 2.3374938944991324
        //48.85999653931958, 2.3374827904733784
        lat: 48.85999653931958,
        lng: 2.3374827904733784
      },
      shape: {
        type: ShapeType.circle,
        color: 'black'
      }
    },
    {
      id: 'louvre5',
      location: {
        //48.86181511023282, 2.3350407456120705
        lat: 48.86181511023282,
        lng: 2.3350407456120705
      },
      shape: {
        type: ShapeType.circle,
        color: 'orange'
      }
    }
  ]

  louvreCentre: IotMarker = {
    id: 'louvreCentre',
    location: {
      //48.860725898553596, 2.337101853987359
      //48.86073553757946, 2.337023713004858
      // lat: 48.86036,
      // lng: 2.33855
      lat: 48.86073553757946,
      lng:  2.337023713004858
    },
    shape: {
      type: ShapeType.square,
      anchored: true,
      color: 'red',
      plain: false
    }
  }

  louvreReference: IotMarker = {
    id: 'reference',
    location: {
      lat: this.louvreCentre.location.lat - 0.0015,
      lng: this.louvreCentre.location.lng - (0.005 / Math.cos(Math.PI * (this.louvreCentre.location.lat - 0.0015) / 180))
      // lat: 48.86036 - 0.0015,
      // lng: 2.33854 - (0.005 / Math.cos(Math.PI * (48.86036 - 0.0015) / 180))
    },
    shape: {
      color: 'purple'
    }
  }*/

/*
  centreBiblio: IotMarker = {
    id: 'biblioCentre',
    location: {
      //48.83358390619775, 2.3757654984848973
      //48.83363, 2.37578
      lat: 48.83363,
      lng: 2.37578
    },
    shape: {
      type: ShapeType.square,
      plain: false,
      color: 'black'
    }
  }

  biblioReference: IotMarker = {
    id: 'ref',
    location: {
      lat: this.centreBiblio.location.lat - 0.0015,
      lng: this.centreBiblio.location.lng - (0.003 / Math.cos(Math.PI * (this.centreBiblio.location.lat - 0.0015) / 180))
    }
  }

  biblio: IotMarker[] = [
    {
      id: 'b1',
      location: {
        //48.83416, 2.37383
        lat: 48.83416,
        lng: 2.37383
      },
      shape: {
        type: ShapeType.circle,
        color: 'blue'
      }
    },
    {
      id: 'b2',
      location: {
        //48.83498, 2.37534
        lat: 48.83498,
        lng: 2.37534
      },
      shape: {
        type: ShapeType.circle,
        color: 'red'
      }
    },
    {
      id: 'b3',
      location: {
        //48.83309, 2.37772
        lat: 48.83309,
        lng: 2.37772
      },
      shape: {
        type: ShapeType.circle,
        color: 'orange'
      }
    },
    {
      id: 'b4',
      location: {
        //48.83226, 2.37622
        lat: 48.83226,
        lng: 2.37622
      },
      shape: {
        type: ShapeType.circle,
        color: 'green'
      }
    },
    {
      id: 'b5',
      location: {
        lat: 48.83414,
        lng: 2.37411
      },
      shape: {
        type: ShapeType.circle,
        color: 'blue'
      }
    },
    {
      id: 'b6',
      location: {
        lat: 48.83411,
        lng: 2.37472
      },
      shape: {
        type: ShapeType.circle,
        color: 'blue'
      }
    }
  ]

*/

  decalLat = 0.001
  decalLng = 0.0056

  gailleton: IotMarker[] = [
    {
      id: 'g1',
      location: {
        //45.75512743341294, 4.834667681878418
        lat: 45.755134,
        lng: 4.834652
      },
      shape: {
        type: ShapeType.circle,
        color: 'blue'
      }
    },
    {
      id: 'g2',
      location: {
        //45.75566928929636, 4.834978641871743
        lat: 45.755659,
        lng: 4.835008
      },
      shape: {
        type: ShapeType.circle,
        color: 'red'
      }
    },
    {
      id: 'g3',
      location: {
        //45.75570139293618, 4.835210829204908
        lat: 45.755696,
        lng: 4.835217
      },
      shape: {
        type: ShapeType.circle,
        color: 'orange'
      }
    },
    {
      id: 'g4',
      location: {
        //45.75508243571907, 4.834834773352696
        // 45.75508251864569, 4.834835319950544
        lat: 45.755085,
        lng: 4.834809
      },
      shape: {
        type: ShapeType.circle,
        color: 'green'
      }
    }
  ]

  gailletonCentre: IotMarker = {
    id: 'gailletonCentre',
    location: {
      //45.755429627783094, 4.834957807600014
      // 45,75541415631009 / 4,834938805301769
      //lat: 45.75541415631009,
      //lng: 4.834938805301769
      lat: (this.gailleton[0].location.lat + this.gailleton[2].location.lat) / 2,
      lng: (this.gailleton[0].location.lng + this.gailleton[2].location.lng) / 2
    },
    shape: {
      type: ShapeType.square,
      plain: false,
      color: 'black'
    },
    inner: {
      img: 'https://c.woopic.com/logo-orange.png'
    }
  }

  demoImg: IotMarker = {
    id: 'demoImg',
    location: {
      // 45.76478072570448, 4.845946665049823
      lat: 45.76478072570448,
      lng: 4.845946665049823
    },
    shape: {
      type: ShapeType.square,
      plain: false,
      color: 'black'
    },
    inner: {
      img: 'https://c.woopic.com/logo-orange.png'
    }
  }

  gailletonReference: IotMarker = {
    id: 'ref',
    location: {
      lat: this.gailletonCentre.location.lat - this.decalLat,
      lng: this.gailletonCentre.location.lng - (this.decalLng / Math.cos(Math.PI * (this.gailletonCentre.location.lat - this.decalLat) / 180))
    }
  }


  markersList: IotMarker[] = [
    // square
    {
      id: 's1',
      location: {
        lat: 44.895,
        lng: 4.870
      },
      template: 'square',
      status: 'test', // 'warning',
      tab: {
        content: '<span class="iotmap-icons-vehicle"></span>'
      },
      inner: {
        label: 'H'
      }
    },
    {
      id: 's2',
      location: {
        lat: 44.895,
        lng: 4.875
      },
      popup: {
        title: 'Ecole Jean Rostand : <a href="http://www.google.fr"> test </a>',
        body: '<a href="https://bv.ac-grenoble.fr/carteforpub/uai/0260969M">ici</a>'
      },
      template: 'square',
      status: 'test', // 'neutral',
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
    }, */
    {
      id: 's5',
      location: {
        lat: 44.895,
        lng: 4.890
      },
      shape: {
        type: ShapeType.square,
        anchored: true,
        plain: false,
        accuracy: 200
      },
      inner: {
        icon: 'iotmap-icons-bluetooth',
        color: 'green'
      },
      layer: 'etablissements',
      status: 'inactive'
    },
    {
      id: 's6',
      location: {
        lat: 44.895,
        lng: 4.895
      },
      template: 'square'
    },
    {
      id: 's7',
      location: {
        lat: 44.895,
        lng: 4.885
      },
      shape: {
        type: ShapeType.square,
        anchored: true,
        plain: false // ,
        // accuracy: 200
      },
      inner: {
        img: 'https://c.woopic.com/logo-orange.png',
        color: 'green'
      },
      layer: 'etablissements',
      status: 'inactive'
    },
    // POI
    {
      id: 'p1',
      location: {
        lat: 44.890,
        lng: 4.870
      },
      shape: {
        type: ShapeType.square,
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
        type: ShapeType.square,
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
        type: ShapeType.square,
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
        type: ShapeType.square,
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
        anchored: false,
        direction: 0
      },
      status: 'positive',
      inner: {
        icon: 'iotmap-icons-vehicle',
        color: 'black'
      }
    },
    {
      id: 'c2',
      layer: 'circles',
      location: {
        lat: 44.885,
        lng: 4.875
      },
      shape: {
        direction: 90
      },
      template: 'vehicle',
      status: 'neutral',
      tab: {
        content: '<span>ABC</span>',
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
      shape: {
        direction: 45
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
      shape: {
        direction: 220
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
      shape: {
        direction: 270
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
      shape: {
        direction: 320
      },
      popup: {
        title: '<img src="../assets/icons/temperature.svg"><br>',
        body: 'La <i>température</i><br><b>de 18°C</b>'
      },
      template: 'square',
      status: 'warning',
      inner: {
        label: 'H',
        color: 'black'
      }
    }];

  clustersList: IotCluster[] = [
    {
      id: 'cluster 1',
      location: {
        lat: 44.882,
        lng: 4.895
      },
      markersArea: new L2.LatLngBounds([44.880, 4.89], [44.885, 4.9]),
      contentLabel: 'interfaces',
      colNumber: 2,
      childCount: 4860,
      aggregation: [
        {
          singularState: 'registered',
          pluralState: 'registered',
          count: 1500,
          color: '#527EDB',
          bullet: '<span style="color: #527EDB; font-size: 14px"> &#9711;  </span>'
        },
        {
          singularState: 'initializing',
          pluralState: 'initializing',
          count: 1500,
          color: '#527EDB',
          bullet: '<span style="color: #527EDB; font-size: 20px"> &#9678;  </span>'
        },
        {
          singularState: 'initialized',
          pluralState: 'initialized',
          bullet: '<span style="color: #527EDB; font-size: 24px"> &#10687;  </span>',
          count: 3300,
          color: '#527EDB'
        },
        {
          singularState: 'activated',
          pluralState: 'activated',
          count: 3000,
          color: '#32C832',
          url: 'http://www.orange.fr/fdsfsdf',
          urlTarget: '_blank'
        },
        {
          singularState: 'reactivated',
          pluralState: 'reactivated',
          count: 100,
          color: '#32C832',
          bullet: '<span class= "iotmap-icons-assistance" style="color: #32C832; font-size: 16px"></span>'
        },
        {
          singularState: 'error',
          pluralState: 'errors',
          count: 100,
          color: '#CD3C14'
        },
        {
          singularState: 'deactivated',
          pluralState: 'deactivated',
          count: 100,
          color: '#CCCCCC'
        }]
    },
    {
      id: 'cluster 2',
      location: {
        lat: 44.882,
        lng: 4.89
      },
      // layer: 'autos',
      contentLabel: 'interfaces',
      colNumber: 2,
      childCount: 123000,
      aggregation: [
        {
          singularState: 'registered',
          pluralState: 'registered',
          count: 18000,
          color: '#527EDB',
          bullet: '<span style="color: #527EDB; font-size: 14px"> &#9711;  </span>'
        },
        {
          singularState: 'initializing',
          pluralState: 'initializing',
          count: 15000,
          color: '#527EDB',
          bullet: '<span style="color: #527EDB; font-size: 20px"> &#9678;  </span>'
        },
        {
          singularState: 'initialized',
          pluralState: 'initialized',
          bullet: '<span style="color: #527EDB; font-size: 24px"> &#10687;  </span>',
          count: 33000,
          color: '#527EDB'
        },
        {
          singularState: 'activated',
          pluralState: 'activated',
          count: 30000,
          color: '#32C832',
          url: 'http://www.orange.fr/fdsfsdf',
          urlTarget: '_blank'
        },
        {
          singularState: 'reactivated',
          pluralState: 'reactivated',
          count: 10000,
          color: '#32C832',
          bullet: '<span class= "iotmap-icons-assistance" style="color: #32C832; font-size: 16px"></span>'
        },
        {
          singularState: 'error',
          pluralState: 'errors',
          count: 10000,
          color: '#CD3C14'
        },
        {
          singularState: 'deactivated',
          pluralState: 'deactivated',
          count: 10000,
          color: '#CCCCCC'
        }]
    },
    {
      id: 'cluster 3',
      location: {
        lat: 44.882,
        lng: 4.885
      },
      layer: 'vehicles',
      contentLabel: 'Entertainment',
      childCount: 12000,
      aggregation: [
        {
          singularState: 'registered',
          pluralState: 'registered',
          count: 5000,
          color: '#527EDB',
          bullet: '<span style="color: #527EDB; font-size: 14px"> &#9711;  </span>'
        },
        {
          singularState: 'initializing',
          pluralState: 'initializing',
          count: 3000,
          color: '#527EDB',
          bullet: '<span style="color: #527EDB; font-size: 20px"> &#9678;  </span>'
        },
        {
          singularState: 'initialized',
          pluralState: 'initialized',
          bullet: '<span style="color: #527EDB; font-size: 24px"> &#10687;  </span>',
          count: 2000,
          color: '#527EDB'
        },
        {
          singularState: 'activated',
          pluralState: 'activated',
          count: 2000,
          color: '#32C832',
          url: 'http://www.orange.fr/fdsfsdf',
          urlTarget: '_blank'
        }]
    }
  ];

  userMarker: IotUserMarker = {
    location: {
      lat: 44.897,
      lng: 4.8813
    },
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
    positions: [
      { lat: 44.896, lng: 4.8811 },
      { lat: 44.8929, lng: 4.884 }],
    additional: [
      {
        line: 1,
        color: '#CD3C14',
        points: [
          { lat: 44.9, lng: 4.8818 },
          { lat: 44.899, lng: 4.8816 },
          { lat: 44.898, lng: 4.8814 },
          { lat: 44.897, lng: 4.8813 },
          { lat: 44.896, lng: 4.8811 },
          { lat: 44.895, lng: 4.8809 }]
      },
      {
        line: 1,
        color: '#CD3C14',
        points: [
          { lat: 44.8929, lng: 4.883 },
          { lat: 44.8929, lng: 4.884 },
          { lat: 44.8925, lng: 4.884 },
          { lat: 44.892, lng: 4.884 }]
      },
      {
        line: 2,
        color: '#FFCC00',
        points: [
          { lat: 44.897, lng: 4.8813 },
          { lat: 44.896, lng: 4.8811 },
          { lat: 44.895, lng: 4.8809 },
          { lat: 44.894, lng: 4.8807 },
          { lat: 44.893, lng: 4.8807 },
          { lat: 44.893, lng: 4.8810 },
          { lat: 44.8929, lng: 4.882 }]
      },
      {
        line: 2,
        color: '#FFCC00',
        points: [
          { lat: 44.8925, lng: 4.884 },
          { lat: 44.892, lng: 4.884 }]
      },
      {
        line: 3,
        color: '#32C832',
        points: [
          { lat: 44.9, lng: 4.8818 },
          { lat: 44.899, lng: 4.8816 },
          { lat: 44.898, lng: 4.8814 },
          { lat: 44.897, lng: 4.8813 },
          { lat: 44.896, lng: 4.8811 }]
      },
      {
        line: 3,
        color: '#32C832',
        points: [
          { lat: 44.895, lng: 4.8809 },
          { lat: 44.894, lng: 4.8807 },
          { lat: 44.893, lng: 4.8807 },
          { lat: 44.893, lng: 4.8810 },
          { lat: 44.8929, lng: 4.882 },
          { lat: 44.8929, lng: 4.883 },
          { lat: 44.8929, lng: 4.884 },
          { lat: 44.8925, lng: 4.884 },
          { lat: 44.892, lng: 4.884 }]
      },
      {
        line: 4,
        color: '#CCCCCC',
        points: [
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
          { lat: 44.892, lng: 4.884 }]
      }
    ]
  }

  zone: IotArea = {
    id: 'zone1',
    points: [
      { lat: 44.887, lng: 4.885 },
      { lat: 44.888, lng: 4.9 },
      { lat: 44.89, lng: 4.883 }
    ]
  }



  transforme (P1: IotMarker, P2: IotMarker, center: IotMarker, P: IotMarker, id: string) : IotMarker {
    const xa = P1.location.lat - center.location.lat
    const ya = (P1.location.lng - center.location.lng) * Math.cos(Math.PI * P1.location.lat / 180)

    const xb = P2.location.lat - center.location.lat
    const yb = (P2.location.lng - center.location.lng) * Math.cos(Math.PI * P2.location.lat / 180)

    const x = P.location.lat - center.location.lat
    const y = (P.location.lng - center.location.lng) * Math.cos(Math.PI * P.location.lat / 180)

    const d = Math.sqrt(xa * xa + ya * ya)
    const cosT = (xa * xb + ya * yb) / (d * d)
    const sinT = (yb * xa - ya * xb) / (d * d)

    const lat = center.location.lat + (x * cosT - y * sinT)
    const lng = center.location.lng + (x * sinT + y * cosT) / Math.cos(Math.PI * lat / 180)

    const distance = Math.sqrt((x * cosT - y * sinT) * (x * cosT - y * sinT) + ((x * sinT + y * cosT) / Math.cos(Math.PI * lat / 180)) * ((x * sinT + y * cosT) / Math.cos(Math.PI * lat / 180)))
    const Presult: IotMarker = {
      id: id,
      location: {
        lat: lat,
        lng: lng
      },
      shape: {
        type: ShapeType.square,
        color: P.shape.color
      }
    }
    return Presult
  }





  ngAfterViewInit (): void {
    this.conf.setConfig({
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
        defaultLat: this.demoImg.location.lat,  //   this.gailletonCentre.location.lat,
        defaultLng: this.demoImg.location.lng,  // this.gailletonCentre.location.lng,
        defaultZoomLevel: 16,
        externalClustering: true,
        layerControl: true,
        exclusiveLayers: false
      },
      layerTemplates: {
        'etablissements': {
          content: '<span class="iotmap-icons-School"></span>',
          type: TabType.normal,
          popupColNumber: 2
        },
        'meters': {
          content: '<img width=16 src="../assets/icons/check_your_balance.svg">'
        },
        'autos': {
          content: '<span class="iotmap-icons-4g"></span>',
          type: TabType.large
        }
      },
      markerStatus: {
        'test': {
          name: {
            singular: 'test',
            plural: 'tests'
          },
          bullet: '<span style="color: #527EDB; font-size: 20px"> &#9678;  </span>',
          url: 'http://www.orange.com'
        }
      }
    })

    this.commonIotMap.onMove = () => {
      const coord = this.commonIotMap.getIotMap().getBounds()
      console.log('map bounds changed: [' + coord.getNorthEast().lat + ', ' + coord.getNorthEast().lng + '] / [' + coord.getSouthWest().lat + ', ' + coord.getSouthWest().lng + ']')
    }

    this.commonIotMap.onEltClick = (id) => {
      if (id === 'gailletonCentre') {
        setTimeout(() => {
          // this.iotMapMarkerManager.updateMarker(id, {popup: {title: 'Update', body: 'Popup mise à jour'}})

          const imageUrl = '../assets/plan.png'

          const tmpLat = this.gailletonCentre.location.lat - this.decalLat //45.752324247407444
          const tmpLon = this.gailletonCentre.location.lng - (this.decalLng / Math.cos(Math.PI * (this.gailletonCentre.location.lat - this.decalLat) / 180))

          const newLat = this.gailletonCentre.location.lat + this.decalLat
          const newLon = this.gailletonCentre.location.lng + (this.decalLng / Math.cos(Math.PI * (this.gailletonCentre.location.lat - this.decalLat) / 180))


          const imageBounds = new L2.LatLngBounds(
            L2.latLng(tmpLat, tmpLon),
            L2.latLng(newLat, newLon)
          )

          const pic = L2.imageOverlay(imageUrl, imageBounds, {className: 'iotmap-imgOverlay'}).addTo(this.commonIotMap.getIotMap())


          this.iotMapMarkerManager.removeMarker('gailletonCentre')


          const B0 = this.transforme(this.gailleton[3], this.gailletonReference, this.gailletonCentre, this.gailleton[0], 'bib0')
          this.iotMapMarkerManager.addMarker(B0)

          const B1 = this.transforme(this.gailleton[3], this.gailletonReference, this.gailletonCentre, this.gailleton[1], 'bib1')
          this.iotMapMarkerManager.addMarker(B1)

          const B2 = this.transforme(this.gailleton[3], this.gailletonReference, this.gailletonCentre, this.gailleton[2], 'bib2')
          this.iotMapMarkerManager.addMarker(B2)

          const B3 = this.transforme(this.gailleton[3], this.gailletonReference, this.gailletonCentre, this.gailleton[3], 'bib3')
          this.iotMapMarkerManager.addMarker(B3)

          this.iotMapMarkerManager.removeMarkers(['g1', 'g2', 'g3', 'g4'])
          this.commonIotMap.getIotMap().setZoom(this.commonIotMap.getIotMap().getZoom() - 1)
        }, 100)
      }
    }
    this.commonIotMap.init('iotMap')

    this.iotMapMarkerManager.addMarker(this.demoImg)
    this.iotMapMarkerManager.addMarker(this.gailletonCentre)
    // this.iotMapMarkerManager.addMarker(this.gailletonReference)
    this.iotMapMarkerManager.addMarkers(this.gailleton)

    // const B0 = this.transforme(this.gailleton[3], this.gailletonReference, this.gailletonCentre, this.gailleton[0], 'bib0')
    // this.iotMapMarkerManager.addMarker(B0)
    //
    // const B1 = this.transforme(this.gailleton[3], this.gailletonReference, this.gailletonCentre, this.gailleton[1], 'bib1')
    // this.iotMapMarkerManager.addMarker(B1)
    //
    // const B2 = this.transforme(this.gailleton[3], this.gailletonReference, this.gailletonCentre, this.gailleton[2], 'bib2')
    // this.iotMapMarkerManager.addMarker(B2)
    //
    // const B3 = this.transforme(this.gailleton[3], this.gailletonReference, this.gailletonCentre, this.gailleton[3], 'bib3')
    // this.iotMapMarkerManager.addMarker(B3)

    // const B4 = this.transforme(this.gailleton[3], this.gailletonReference, this.gailletonCentre, this.gailleton[4], 'bib4')
    // this.iotMapMarkerManager.addMarker(B4)
    // const B4 = this.transforme(this.gailleton[0], this.gailletonReference, this.gailletonCentre, this.gailleton[4], 'bib4')
    // this.iotMapMarkerManager.addMarker(B4)


    // this.iotMapMarkerManager.addMarker(this.centreBiblio)
    // this.iotMapMarkerManager.addMarker(this.biblioReference)
    // this.iotMapMarkerManager.addMarkers(this.biblio)
    //
    // const B0 = this.transforme(this.biblio[0], this.biblioReference, this.centreBiblio, this.biblio[0], 'bib0')
    // this.iotMapMarkerManager.addMarker(B0)
    //
    // const B1 = this.transforme(this.biblio[0], this.biblioReference, this.centreBiblio, this.biblio[1], 'bib1')
    // this.iotMapMarkerManager.addMarker(B1)
    //
    // const B2 = this.transforme(this.biblio[0], this.biblioReference, this.centreBiblio, this.biblio[2], 'bib2')
    // this.iotMapMarkerManager.addMarker(B2)
    //
    // const B3 = this.transforme(this.biblio[0], this.biblioReference, this.centreBiblio, this.biblio[3], 'bib3')
    // this.iotMapMarkerManager.addMarker(B3)
    //
    // const B4 = this.transforme(this.biblio[0], this.biblioReference, this.centreBiblio, this.biblio[4], 'bib4')
    // this.iotMapMarkerManager.addMarker(B4)
    //
    // const B5 = this.transforme(this.biblio[0], this.biblioReference, this.centreBiblio, this.biblio[5], 'bib5')
    // this.iotMapMarkerManager.addMarker(B5)























    /*this.iotMapMarkerManager.addMarkers(this.louvre)


    this.iotMapMarkerManager.addMarker(this.louvreCentre)
    // this.iotMapMarkerManager.addMarker(this.louvreReference)


    const Pres = this.transforme(this.louvre[0], this.louvreReference, this.louvreCentre, this.louvre[0], 'l')
    this.iotMapMarkerManager.addMarker(Pres)

    const Pres1 = this.transforme(this.louvre[0], this.louvreReference, this.louvreCentre, this.louvre[1], 'l1')
    this.iotMapMarkerManager.addMarker(Pres1)

    const Pres2 = this.transforme(this.louvre[0], this.louvreReference, this.louvreCentre, this.louvre[2], 'l2')
    this.iotMapMarkerManager.addMarker(Pres2)

    const Pres3 = this.transforme(this.louvre[0], this.louvreReference, this.louvreCentre, this.louvre[3], 'l3')
    this.iotMapMarkerManager.addMarker(Pres3)

    const Pres4 = this.transforme(this.louvre[0], this.louvreReference, this.louvreCentre, this.louvre[4], 'l4')
    this.iotMapMarkerManager.addMarker(Pres4)

    const Pres5 = this.transforme(this.louvre[0], this.louvreReference, this.louvreCentre, this.louvre[5], 'l5')
    this.iotMapMarkerManager.addMarker(Pres5)*/

    // const Pres1 = this.transforme(this.louvre[0], this.louvreReference, this.louvreCentre, this.louvre[0], 'l0')
    // this.iotMapMarkerManager.addMarker(Pres1)
    //
    // const Pres2 = this.transforme(this.louvre[0], this.louvreReference, this.louvreCentre, this.louvre[1], 'l1')
    // this.iotMapMarkerManager.addMarker(Pres2)
    //
    // const Pres3 = this.transforme(this.louvre[0], this.louvreReference, this.louvreCentre, this.louvre[2], 'l2' )
    // this.iotMapMarkerManager.addMarker(Pres3)


    // this.iotMapMarkerManager.addMarkers(this.markersList)
    // this.iotMapClusterManager.addClusters(this.clustersList)
    // this.iotMapUserMarkerManager.addUserMarker(this.userMarker)
    // this.iotMapPathManager.addPath(this.chemin)
    //
    // this.iotMapAreaManager.addArea(this.zone)
  }
}
