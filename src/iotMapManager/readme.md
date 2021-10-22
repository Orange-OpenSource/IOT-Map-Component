# IotMapManager V2.6.8

This library provides management of markers dedicated to projects using mapping.
## use
In your project file (except IotMapManager and IotMapConf, all are optionnal):

```
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
} from 'iotmapmanager'
```

and instanciate classes you need:

```    
conf: IotMapConfig = new IotMapConfig();    // mandatory
commonIotMap: IotMapManager = new IotMapManager(this.conf) // mandatory

iotMapMarkerManager: IotMapMarkerManager = new IotMapMarkerManager(this.commonIotMap, this.conf)
iotMapClusterManager: IotMapClusterManager = new IotMapClusterManager(this.commonIotMap, this.conf)
otMapUserMarkerManager: IotMapUserMarkerManager = new IotMapUserMarkerManager(this.commonIotMap, this.conf)
iotMapPathManager: IotMapPathManager = new IotMapPathManager(this.commonIotMap, this.conf)
```

In your css file:

```
@import 'iotmapmanager/iot-map-manager.css';
```

If your use TypeScript, all types are defined in lib/index.d.ts

## marker definition
A marker is defined as follow:

```
{
    id: string
    location: Location
    layer?: string
    popup?: Popup
    tab?: Tab
    shape?: Shape
    inner?: Inner
    template?: string
    status?: string
}
```

Param | Type | Optionnal | Comment
----- | ---- | --------- | -------
id    | string | no | Used by update and remove functions
location | [Location](#Location) | non | (lat, lng) of the marker
layer | string | yes | you can sort your markers in different layers. A tool allow you to display specific layers (see [configuration](#Configuration))
popup | [Popup](#Popup) | yes | a string displayed in a popup when marker is clicked. 
tab | [Tab](#Tab) | yes | a little white rectangle displayed above the marker. It contains few characters or icon 
shape | [Shape](#Shape) | yes | all information relative to marker shape
inner | [Inner](#Inner) | yes | all information relative to marker inner
status | string | yes | name of the status to apply (see [configuration](#Configuration))
template | string | yes | name of the template to apply (see [configuration](#Configuration))


## manual clusters definition
```
{
  id: string
  location: Location
  layer?: string
  contentLabel: string
  childCount: number
  colNumber?: number
  aggregation: {
    singularState: string
    pluralState: string
    count: number
    color: string
    bullet?: string
    url?: string
    urlTarget?: string
  }[]
}
```


Param | type | optionnal | Comment
----- | ---- | --------- | -------
id | string | no | used for update/removeMarker purposes
location | [Location](#location) | no | (lat, long) of the cluster
layer | string | yes | You can sort your manual clusters in different layers. A tool allow you to display specific layers (see [configuration](#Configuration))
contentLabel | string | no | what is clustered ? (devices, cars, buildings...)
childCount | number | no | number of clustered elements
colNumber | number | yes | number of columns displayed in a cluster popup
aggregation | array | no | containing following info for each type of element

Aggregation :

Param | type | optionnal | Comment
----- | ---- | --------- | -------
singularState | string | no | used for only one element
pluralState | string | no | used for several elements
count | number | no | number of elements
color | string | no | color to display is gauge and popup
bullet | string | yes | bullet used to illustrate current state (plain circle if not specified)
url | string | yes | state name is then displayed as an hyper link with 'url' as href 
urlTarget | string | yes | specifies where to open the linked document or page ('_blank', '_self', '_parent', '_top', framename)

## user marker definition
```
{
    location: Location
    direction?: number (0-360)
    accuracy?: number (in meters)
}
```

Param | type | optionnal | Comment
----- | ---- | --------- | -------
location | [Location](#location) | no | position of the user marker on the map
direction | number | yes | angle in degrees, clockwise 
accuracy | number | yes | radius in meters of accuracy area around the user marker


## path definition 
```
{
  id: string
  color?: string
  points: Location[]
  positions?: Location[]
  additional?: {
    points: Location[]
    color: string
    line: number
  }[]
}
```

Param | type | optionnal | Comment
----- | ---- | --------- | -------
id | string | no | used for update and remove
color | string | yes | color of the path
points | [Location](#location) array | no | array of geographical points defining the path
positions | [Location](#location) array | yes | allow to display intermediate markers along the path
additional | array of [additional path](#additional-path) | yes | allow to display additional sub paths along the main path

#### additional path :

Param | type | optionnal | Comment
----- | ---- | --------- | -------
points | [Location](#location) array | no | array of geographical points defining the path
color | string | yes | color of the path
line | number (1..4) | no | define the place of the sub path (1 is full left, 4 is full right) 


## area definition
```
{
  id: string
  points: Location[]
  color?: string
  fillColor?: string
  fillOpacity?: number
}
```

Param | type | optionnal | Comment
----- | ---- | --------- | -------
id | string | no | used for update and remove
points | [Location](#location) array | no | array of geographical points defining the area. Last and first are link, no need to duplicate
color | string | yes | border color of the area
fillColor | string | yes | interior color of the area
fillOpacity | string | yes | interior color opacity of the area


## enums

```
enum ShapeType { circle, square }
```
```    
enum TabType { normal, large }
``` 
```    
enum PathIconType { start, mid, end }
```
     
## Common interfaces definitions
#### Location
```
interface Location {
  lat: number
  lng: number
}
```

#### GeolocMarker 
```
interface GeolocMarker {
  location: Location
}
  ```  
#### Popup
``` 
interface Popup {
  title?: string
  body?: string
}
```

#### Tab    
```    
interface Tab {
  content: string
  type?: TabType
}
```   
#### Shape   
 ```   
interface Shape {
  type?: ShapeType
  anchored?: boolean
  plain?: boolean
  color?: string
  percent?: number (0-100)
  accuracy?: number (in meters)
  direction?: number (0-360)
}
```    
#### Inner    
```    
interface Inner {
  color?: string

  img?: string
  // *** OR ***
  icon?: string
  // *** OR ***
  label?: string
}
```

Note: the img has priority over icon, that has priority over the label. To update a marker having an img or an icon by a label, set `img` or `icon` to `null` and define a label.




## Configuration
Default values are set for configuration.
You must instanciate a configuration for each map:

    config = new IotMapConfig();

You can modify several values by calling :

    IotMapConfig.setConfig(...)
    
Editable values :
* map:
  * defaultLat: map center latitude
  * defaultLng: map center longitude
  * defaultZoomLevel: zoom level
  * defaultLayerName: layer name if no layer specified in marker info
  * clusterRadius: radius used to cluster markers
  * externalClustering: if true, auto clustering is deactivated. You need to calculate your own clusters
  * layerControl: if true, display a tool in top right corner to manage layers display,
  * exclusiveLayers: if true, you can display only one layer at a time, if false, all layers can be displayed simultaneously

* markers:
  * default:
    * shape: shape used if no shape is specified in marker info
    * inner: color of the marker inner
    
* markerStatus:
  * for each status (defined by a name as string):
    * name:
        * singular: name used in cluster popup if there is only one element with this status
        * plural: name used in cluster popup if there are several elements with this status
    * layer (optionnal): you can sort your markers in different layers. A tool allow you to display specific layers (see [configuration](#Configuration))
    * popup (optionnal) is a string displayed in a popup when marker is clicked. (see [Popup](#Popup))
    * tab (optionnal) is a little white rectangle displayed above the marker. It contains few characters or icon (see [Tab](#Tab))
    * shape (optionnal): all information relative to marker shape (see [shape](#Shape))
    * inner (optionnal) : all information relative to marker inner (see [Inner](#Inner))
    * bullet (optionnal) is the bullet displayed before the name status in cluster popups (html code)
    * url (optionnal): if defined, in the cluster popup the name becomes an hyperlink with 'url' as href 
    * urlTarget specifies where to open the linked document or page ('_blank', '_self', '_parent', '_top', framename)
    
* markerTemplate: agregates all display parameters (colors, shape, icon...)
  * for each template (defined by a name as string):
    * layer (optionnal): you can sort your markers in different layers. A tool allow you to display specific layers (see [configuration](#Configuration))
    * popup (optionnal) is a string displayed in a popup when marker is clicked. (see [Popup](#Popup))
    * tab (optionnal) is a little white rectangle displayed above the marker. It contains few characters or icon (see [Tab](#Tab)) 
    * shape (optionnal): all information relative to marker shape (see [shape](#Shape))
    * inner (optionnal) : all information relative to marker inner (see [Inner](#Inner))
  
* accuracyCircle: default parameters for accuracy area
  * layerName: name displayed in layers control list
  * color: default border color for accuracy circles
  * fillColor: default fill color for accuracy circles
  * fillOpacity: interior color opacity for accuracy circles

* layerTemplate: parameters that can be applied to a layer
  * for each template (defined by a name as string):
    * content (optionnal): the html code to display in cluster tab (can be img, text...)
    * type (optionnal): the type used for cluster tab (see )
    * popupColNumber (optionnal): number of columns to display in cluster popup

* clusters
  * defaultColor: color used if marker has no status, then no status color
  
* userMarker
  * layerName: name displayed in layers control list

* path  
  * layerName: name displayed in layers control list
  * color: default path color
  * width: path width in px

* area
  * layerName: name displayed in layers control list
  * color: default border color for areas
  * fillColor: default fill color for areas
  * fillOpacity: interior color opacity for areas



Marker data are applied first,
  - then default values if needed,
  - then template if one,
  - then status if one


## Managers

### IotMapManager
This class manager the map and every relying to the map:
- layers and there display tool, 
- automatic or manual clustering,
- events 

### IotMapMarkerManager
This class manages markers:
- addMarker / addMarkers: adds a (list of) marker(s) to the map
- removeMarker / removeMarkers: removes a (list of) marker(s) from the map
- updateMarker: updates specified marker by applying partial IotMarker data
- updateAllMarkers: 
    - adds non existing markers
    - removes existing markers not present in the new list
    - updates existing markers present in the new list
- getMarker: returns the L.Marker corresponding to the specified id
- getAllMarkers: returns all L.Marker present in the map
- redrawAll: forces all markers to redraw

IotMapMarkerManager requires a configuration object and an IotMapManager

### IotMapClusterManager
This class manages manual clusters:
- addCluster / addClusters: adds a (list of) cluster(s) to the map
- removeCluster / removeClusters: removes a (list of) Cluster(s) from the map
- updateCluster: updates specified Cluster by applying partial IotCluster data
- updateAllCluster: 
    - adds non existing Cluster
    - removes existing Cluster not present in the new list
    - updates existing Cluster present in the new list
- redrawAll: forces all Cluster to redraw

IotMapClusterManager requires a configuration object and an IotMapManager

### IotMapUserMarkerManager
This class manages user marker: (!! only one user marker at a time)
- addUserMarker: adds the userMarker to the map
- removeUserMarker: removes the userMarker from the map
- updateUserMarker: updates the userMarker
- getUserMarker: returns the L.Marker corresponding to the userMarker

IotMapUserMarkerManager requires a configuration object and an IotMapManager

### IotMapPathManager
This class manages paths:
- addPath/ addPaths: adds a (list of) path(s) to the map
- removePath / removePaths: removes a (list of) path(s) from the map

IotMapPathManager requires a configuration object and an IotMapManager


### IotMapAreaManager
This class manages areas:


