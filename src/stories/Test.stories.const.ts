import {ShapeType, TabType} from 'iotmapmanager/dist';

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
    type?: ShapeType;
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
  tab?: {
    content: string;
    type?: TabType;
  }
}

export const MARKER_LIST = [
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
      content: 'H',
      type: TabType.normal
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
    tab: {
      content: `ABC`,
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
