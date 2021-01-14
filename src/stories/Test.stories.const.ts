import {markerType} from "../iotMapManager/iotMapManagerTypes";

export enum ShapeType {circle, square, poi }

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
      icon: 'iotmap-icons-School',
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
      icon: 'iotmap-icons-accessibility_hearing',
      color: 'blue'
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
      icon: 'iotmap-icons-bluetooth',
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
      icon: 'iotmap-icons-family_place',
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
      icon: 'iotmap-icons-School',
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
      icon: 'iotmap-icons-School',
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
      icon: 'iotmap-icons-games',
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
      icon: 'iotmap-icons-hospital',
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
      type : markerType.circle,
      anchored: false,
      percent: 100,
      accuracy: 500
    },
    inner: {
      icon: 'iotmap-icons-Car_pooling',
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
      icon: 'iotmap-icons-Car_pooling',
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
      icon: 'iotmap-icons-Car_pooling',
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
      icon: 'iotmap-icons-Car_pooling',
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
      anchored: true,
      plain: false
    },
    inner: {
      label: 'O',
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
      icon : 'iotmap-icons-temperature',
      color: 'green'
    }
  }];
