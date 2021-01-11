import {markerType} from "../iotMapManager/iotMapManagerTypes";

export enum ShapeType {circle, square, poi}

export interface IOTMarker {
  id: string;
  location: {
    lat: number;
    lng: number;
  };
  layer?: string;
  popup?: string;
  status?: string;
  shape?: {
    type?: markerType;
    anchored?: boolean;
    plain?: boolean;
    color?: string;
    percent?: number;
    accuracy?: number;
  };
  inner?: {
    color?: string;

    icon?: string;
    // *** OR ***
    label?: string;
  };
}

export const MARKER_LIST = [
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
      anchored: true
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
      plain: true,
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
      percent: 95
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
      anchored: false,
      percent: 75
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
