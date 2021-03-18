# IotMapManager V0.0.6

This library provides management of markers dedicated to projects using mapping.
## use
In your project file (except IotMapManager, all are optionnal):

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

In your css file:

    @import 'iotmapmanager/iotMapManager.css'; 


## marker definition
A marker is defined as follow:

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


Param | Type | Optionnal | Comment
----- | ---- | --------- | -------
id    | string | no | Used by update and remove functions
location | Location | non | (lat, lng) of the marker
layer | string | yes | you can sort your markers in different layers. A tool allow you to display specific layers (see configuration)
popup | Popup | yes | a string displayed in a popup when marker is clicked. (see Popup definition)
tab | Tab | yes | a little white rectangle displayed above the marker. It contains few characters or icon (see tab definition) 
shape | Shape | yes | all information relative to marker shape (see shape definition)
inner | Inner | yes | all information relative to marker inner (see inner definition)
status | string | yes | name of the status to apply (see configuration)
template | string | yes | name of the template to apply (see configuration)


## manual clusters definition
    {
      id: string
      location: Location
      layer?: string
      contentLabel: string
      childCount: number
      aggregation: {
        singularState: string
        pluralState: string
        count: number
        color: string
      }[]
    }



Param | type | optionnal | Comment
----- | ---- | --------- | -------
id | string | no | used for update/removeMarker purposes
location | Location | no | (lat, long) of the cluster
layer | string | yes | You can sort your manual clusters in different layers. A tool allow you to display specific layers (see configuration)
contentLabel | string | no | what is clustered ? (devices, cars, buildings...)
childCount | number | no | number of clustered elements
aggregation | array | no | containing following info for each type of element

Aggregation :

Param | type | optionnal | Comment
----- | ---- | --------- | -------
singularState | string | no | used for only one element
pluralState | string | no | used for several elements
count | number | no | number of elements
color | string | no | color to display is gauge and popup


## user marker definition
    {
        location: Location
        direction?: number
        accuracy?: number
    }

Param | type | optionnal | Comment
----- | ---- | --------- | -------
location | Location | no | position of the user marker on the map
direction | number | yes | angle in degrees, clockwise 
accuracy | number | yes | radius in meters of accuracy area around the user marker


## path definition
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

Param | type | optionnal | Comment
----- | ---- | --------- | -------
id | string | no | used for update and remove
color | string | yes | color of the path
points | Location array | no | array of geographical points defining the path
positions | Location array | yes | allow to display intermediate markers along the path
additional | array of additional path | yes | allow to display additional sub paths along the main path

additional paths :

Param | type | optionnal | Comment
----- | ---- | --------- | -------
points | Location array | no | array of geographical points defining the path
color | string | yes | color of the path
line | number (1..4) | no | define the place of the sub path (1 is completely to the left, 4 is completely to the right) 


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
    * layer (optionnal): you can sort your markers in different layers. A tool allow you to display specific layers (see configuration)
    * popup (optionnal) is a string displayed in a popup when marker is clicked. (see Popup definition)
    * tab (optionnal) is a little white rectangle displayed above the marker. It contains few characters or icon (see tab definition) 
    * shape (optionnal): all information relative to marker shape (see shape definition)
    * inner(optionnal) : all information relative to marker inner (see inner definition)

    
* markerTemplate: agregates all display parameters (colors, shape, icon...)
  * for each template (defined by a name as string):
    * layer (optionnal): you can sort your markers in different layers. A tool allow you to display specific layers (see configuration)
    * popup (optionnal) is a string displayed in a popup when marker is clicked. (see Popup definition)
    * tab (optionnal) is a little white rectangle displayed above the marker. It contains few characters or icon (see tab definition) 
    * shape (optionnal): all information relative to marker shape (see shape definition)
    * inner(optionnal) : all information relative to marker inner (see inner definition)
    
        
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

## IotMapUserMarkerManager
This class manages user marker: (!! only one user marker at a time)
- addUserMarker: adds the userMarker to the map
- removeUserMarker: removes the userMarker from the map
- updateUserMarker: updates the userMarker
- getUserMarker: returns the L.Marker corresponding to the userMarker

IotMapUserMarkerManager requires a configuration object and an IotMapManager

## IotMapPathManager
This class manages paths:
- addPath/ addPaths: adds a (list of) path(s) to the map
- removePath / removePaths: removes a (list of) path(s) from the map

IotMapPathManager requires a configuration object and an IotMapManager
