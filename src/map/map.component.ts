import { AfterViewInit, Component } from '@angular/core'
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

  gailleton: IotMarker[] = [
    {
      id: 'g1',
      location: {
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
        lat: 45.755085,
        lng: 4.834809
      },
      shape: {
        type: ShapeType.circle,
        color: 'green'
      }
    }
  ]

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
        plain: false//,
        // accuracy: 200
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
        // accuracy: 300
      },
      layer: 'etablissements',
      inner: {
        icon: 'iotmap-icons-hospital',
        color: 'white'
      },
      status: 'inactive'
    },

    {
      id: 'c1',
      layer: 'circles',
      location: {
        lat: 44.885,
        lng: 4.870
      }//,

      // shape: {
      //   type: ShapeType.circle,
      //   percent: 75,
      //   anchored: false//,
      //   direction: 0
      // },
      // status: 'positive',
      // inner: {
      //   icon: 'iotmap-icons-vehicle',
      //   color: 'black'
      // }
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
    },


    {
      id: 'c1',
      layer: 'circles',
      location: {
        lat: 44.885,
        lng: 4.870
      }//,
    }
  ];

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
  ]

  userMarker: IotUserMarker = {
    location: {
      lat: 44.897,
      lng: 4.8813
    },
    // accuracy: 150,
    direction: 180
  }

  chemin: IotPath = {
    id: 'chemin',
    points: [
      {lat: 44.9, lng: 4.8818},
      {lat: 44.899, lng: 4.8816},
      {lat: 44.898, lng: 4.8814},
      {lat: 44.897, lng: 4.8813},
      {lat: 44.896, lng: 4.8811},
      {lat: 44.895, lng: 4.8809},
      {lat: 44.894, lng: 4.8807},
      {lat: 44.893, lng: 4.8807},
      {lat: 44.893, lng: 4.8810},
      {lat: 44.8929, lng: 4.882},
      {lat: 44.8929, lng: 4.883},
      {lat: 44.8929, lng: 4.884},
      {lat: 44.8925, lng: 4.884},
      {lat: 44.892, lng: 4.884}],
    positions: [
      {lat: 44.896, lng: 4.8811},
      {lat: 44.8929, lng: 4.884}],
    additional: [
      {
        line: 1,
        color: '#CD3C14',
        points: [
          {lat: 44.9, lng: 4.8818},
          {lat: 44.899, lng: 4.8816},
          {lat: 44.898, lng: 4.8814},
          {lat: 44.897, lng: 4.8813},
          {lat: 44.896, lng: 4.8811},
          {lat: 44.895, lng: 4.8809}]
      },
      {
        line: 1,
        color: '#CD3C14',
        points: [
          {lat: 44.8929, lng: 4.883},
          {lat: 44.8929, lng: 4.884},
          {lat: 44.8925, lng: 4.884},
          {lat: 44.892, lng: 4.884}]
      },
      {
        line: 2,
        color: '#FFCC00',
        points: [
          {lat: 44.897, lng: 4.8813},
          {lat: 44.896, lng: 4.8811},
          {lat: 44.895, lng: 4.8809},
          {lat: 44.894, lng: 4.8807},
          {lat: 44.893, lng: 4.8807},
          {lat: 44.893, lng: 4.8810},
          {lat: 44.8929, lng: 4.882}]
      },
      {
        line: 2,
        color: '#FFCC00',
        points: [
          {lat: 44.8925, lng: 4.884},
          {lat: 44.892, lng: 4.884}]
      },
      {
        line: 3,
        color: '#32C832',
        points: [
          {lat: 44.9, lng: 4.8818},
          {lat: 44.899, lng: 4.8816},
          {lat: 44.898, lng: 4.8814},
          {lat: 44.897, lng: 4.8813},
          {lat: 44.896, lng: 4.8811}]
      },
      {
        line: 3,
        color: '#32C832',
        points: [
          {lat: 44.895, lng: 4.8809},
          {lat: 44.894, lng: 4.8807},
          {lat: 44.893, lng: 4.8807},
          {lat: 44.893, lng: 4.8810},
          {lat: 44.8929, lng: 4.882},
          {lat: 44.8929, lng: 4.883},
          {lat: 44.8929, lng: 4.884},
          {lat: 44.8925, lng: 4.884},
          {lat: 44.892, lng: 4.884}]
      },
      {
        line: 4,
        color: '#CCCCCC',
        points: [
          {lat: 44.897, lng: 4.8813},
          {lat: 44.896, lng: 4.8811},
          {lat: 44.895, lng: 4.8809},
          {lat: 44.894, lng: 4.8807},
          {lat: 44.893, lng: 4.8807},
          {lat: 44.893, lng: 4.8810},
          {lat: 44.8929, lng: 4.882},
          {lat: 44.8929, lng: 4.883},
          {lat: 44.8929, lng: 4.884},
          {lat: 44.8925, lng: 4.884},
          {lat: 44.892, lng: 4.884}]
      }
    ]
  }

  zone: IotArea = {
    id: 'zone1',
    points: [
      {lat: 44.887, lng: 4.885},
      {lat: 44.888, lng: 4.9},
      {lat: 44.89, lng: 4.883}
    ]
  }

  currentBearing = 0

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
        defaultLat: 45.755020,
        defaultLng: 4.832584,
        defaultZoomLevel: 16,
        externalClustering: true,
        layerControl: true,
        exclusiveLayers: false,
        bearing: 0
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

    this.commonIotMap.onMoveStart = (e) => {
      this.commonIotMap.removeOverlayImage()
    }

    this.commonIotMap.onMove = () => {
      const coord = this.commonIotMap.getIotMap().getBounds()
      console.log('map bounds changed: [' + coord.getNorthEast().lat + ', ' + coord.getNorthEast().lng + '] / [' + coord.getSouthWest().lat + ', ' + coord.getSouthWest().lng + ']')

      const currentZoom = this.commonIotMap.getIotMap().getZoom()
      if (currentZoom >= 18) {
        // rotate map
        const bearing = 65
        this.commonIotMap.displayOverlayImage(
          '../assets/plan.png',
          bearing,
          new L2.Point(this.gailleton[2].location.lat, this.gailleton[2].location.lng),
          new L2.Point(this.gailleton[3].location.lat, this.gailleton[3].location.lng)
        )

        if (bearing !== this.currentBearing) {
          let nbSteps = 0
          for (let i = 0; i * 10 < bearing; i++) {
            if (i * 10 > this.currentBearing) {
              setTimeout(() => {
                this.commonIotMap.getIotMap().setBearing(i * 10)
              }, 100 * i)
            }
            nbSteps = i
          }

          setTimeout(() => {
            this.commonIotMap.getIotMap().setBearing(bearing)
            this.currentBearing = bearing
          }, 100 * (nbSteps + 1))
        }
      }


      if (currentZoom < 18) {
        // rotate map
        const bearing = 0
        let nbSteps = 1

        if (bearing !== this.currentBearing) {
          this.commonIotMap.removeOverlayImage()
          for (let i = 0; this.currentBearing - (i * 10) > 0; i++) {
            setTimeout(() => {
              this.commonIotMap.getIotMap().setBearing(this.currentBearing - (i * 10))
            }, 100 * i)
            nbSteps = i
          }

          setTimeout(() => {
            this.commonIotMap.getIotMap().setBearing(bearing)
            this.currentBearing = bearing
          }, 100 * nbSteps)
        }
      }
    }

    this.commonIotMap.init('iotMap')

    // this.iotMapMarkerManager.addMarker(this.demoImg)
    this.iotMapMarkerManager.addMarkers(this.gailleton)

    this.iotMapMarkerManager.addMarkers(this.markersList)
    this.iotMapClusterManager.addClusters(this.clustersList)
    this.iotMapUserMarkerManager.addUserMarker(this.userMarker)
    this.iotMapPathManager.addPath(this.chemin)
    //
    this.iotMapAreaManager.addArea(this.zone)
  }
}
