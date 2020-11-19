export enum ShapeType {
  'circle' = 'circle',
  'square' = 'square',
  'poi' = 'poi',
}

export interface IOTMarker {
  id: string;
  location: { [0]: number; [1]: number };
  popup?: string;
  shape?: {
    shape?: ShapeType;
    color?: string;
    anchored?: boolean;
    plain?: boolean;
  };
  inner?: {
    color: string;

    icon: string;
    // *** OR ***
    label: string;
  };
  gauge?: {
    color: string;
    percent: number;
  };
}

export const MARKER_LIST = [
  //square
  {
    id: 's1',
    location: [44.895, 4.87],
    shape: {
      shape: 'square',
      color: '#FFCC00',
      anchored: false,
    },
    inner: {
      color: 'green',
    },
  },
  {
    id: 's2',
    location: [44.895, 4.875],
    shape: {
      shape: 'square',
      color: '#32C832',
      anchored: true,
      plain: true,
    },
  },
  {
    id: 's3',
    location: [44.895, 4.88],
    shape: {
      shape: 'square',
      color: '#527EDB',
      anchored: true,
    },
  },
  {
    id: 's4',
    location: [44.895, 4.885],
    shape: {
      shape: 'square',
      color: '#CCCCCC',
      anchored: false,
    },
    inner: {
      color: 'black',
    },
  },
  {
    id: 's5',
    location: [44.895, 4.89],
    shape: {
      shape: 'square',
      color: '#000000',
      anchored: true,
    },
    inner: {
      color: 'green',
    },
  },
  {
    id: 's6',
    location: [44.895, 4.895],

    shape: {
      shape: 'square',
      color: '#CD3C14',
      anchored: false,
    },
    inner: {
      color: 'black',
    },
  },

  // POI
  {
    id: 'p1',
    location: [44.89, 4.87],
    shape: {
      shape: 'poi',
      color: '#008080',
      anchored: false,
    },
  },
  {
    id: 'p2',
    location: [44.89, 4.875],
    shape: {
      shape: 'poi',
      color: '#cc6600',
      anchored: true,
    },
  },
  {
    id: 'p3',
    location: [44.888798, 4.885407],
    shape: {
      shape: 'poi',
      color: '#d24d50',
      anchored: true,
    },
  },
  {
    id: 'p4',
    location: [44.89, 4.885],
    shape: {
      shape: 'poi',
      color: '#008080',
      anchored: false,
    },
    inner: {
      color: 'black',
    },
  },
  {
    id: 'p5',
    location: [44.89, 4.89],
    shape: {
      shape: 'poi',
      color: '#cc6600',
      anchored: true,
    },
    inner: {
      color: 'white',
    },
  },
  {
    id: 'p6',
    location: [44.89, 4.895],
    shape: {
      shape: 'poi',
      color: '#d24d50',
      anchored: false,
    },
    inner: {
      color: 'white',
    },
  },

  // circle
  {
    id: 'c1',
    location: [44.885, 4.87],
    shape: {
      shape: 'circle',
      color: '#CD3C14',
      anchored: false,
    },
    inner: {
      label: 'H',
      color: 'black',
    },
  },
  {
    id: 'c2',
    location: [44.885, 4.875],
    shape: {
      shape: 'circle',
      color: '#000000',
      anchored: true,
      plain: true,
    },
  },
  {
    id: 'c3',
    location: [44.885, 4.88],
    shape: {
      shape: 'circle',
      color: '#CC6600',
      anchored: true,
    },
    inner: {
      color: 'black',
    },
  },
  {
    id: 'c4',
    location: [44.885, 4.885],
    shape: {
      shape: 'circle',
      color: '#527EDB',
      anchored: false,
    },
    inner: {
      color: 'black',
    },
  },
  {
    id: 'c5',
    location: [44.885, 4.89],
    shape: {
      shape: 'circle',
      color: '#32C832',
      anchored: true,
    },
    inner: {
      color: 'green',
    },
  },
  {
    id: 'c6',
    location: [44.885, 4.895],
    shape: {
      shape: 'circle',
      color: '#FFCC00',
      anchored: false,
    },
    inner: {
      label: 'A',
      color: 'black',
    },
  },
];
