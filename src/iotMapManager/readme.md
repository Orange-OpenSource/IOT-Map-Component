# IotMapManager V0.5.6

This library provides management of markers dedicated to projects using mapping.
## use
In your project file :

    import { IotMapManager, IotCluster, IotMarker, IotUserMarker, markerType, IotMapManagerConfig, MarkerStatus } from 'iotmapmanager';

In your css file:

    @import 'iotmapmanager/iotMapManager.css';


this library provides following functions :
* **addMarker / addMarkers** : send an IotMarker or a list of IotMarkers
* **updateMarker** : send a marker id and a structure containing modified parameters
* **updateAllMarkers** : send a list of IotMarkers:
    - new markers will be created
    - existing markers will be updated
    - existing markers not present in sent list will be deleted
* **deleteMarker / deleteMarkers**  : send a marker id or a list of marker ids
* **redrawAll**: used to redraw all markers after a configuration modification for exemple

* **addCluster / addClusters** : send an IotCluster or a list of IotCluster
* **updateCluster** : send a cluster id and a structure containing modified parameters
* **updateAllClusters** : send a list of IotClusters:
    - new clusters will be created
    - existing clusters will be updated
    - existing clusters not present in sent list will be deleted
* **deleteCluster / deleteClusters**  : send a cluster id or a list of marker ids

* **addUserMarker**: send a IotUserMarker
* **updateUserMarker**: send a structure containing modified parameters
* **removeUserMarker** 



## marker definition
A marker is defined as follow *(description will evoluate in the futur)* :

    {
       id: string;
       location: {
         lat: number;
         lng: number;
       };
       layer?: string;
       popup?: string;
       status?: string;
       template? : string;
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

* id is displayer by default in popup (with status if one)
* location is (lat, lng) of the marker
* layer (optionnal): you can sort your markers in different layers. A tool allow you to display specific layers (see configuration)
* popup (optionnal) is a string displayed in a popup when marker is clicked. (html format)
* status (optionnal): see configuration
* template (optionnal): see configuration
* shape:
  * type (optionnal) is:

        enum markerType { circle, square, poi}
   if not specified, circle is used.
  * anchored (optionnal): set anchored to true to get an anchor (default is true)
  * plain (optionnal): set plain to true to get a full colored marker, false instead (defautl is true)
  * color (optionnal): if status is not defined, color is the marker color (default is black)
  * percent (optionnal): only used with circle markers. Define a gauge.
  * accuracy (optionnal): display a precision zone around the marker. Defined in meters

* inner: 
  * icon from a font icon. Here, set the class name.
  * label is only one character. If string is sent, first character will be displayed
label and icon cannot be defined simultaneously : you can display only one of them. If both are defined, icon is displayed
  * color defines the icon or label color



## manual clusters definition
    {
      id: string;
      location: {
        lat: number;
        lng: number
      };
      contentLabel: string;
      childCount: number;
      aggregation: {
        singularState: string;
        pluralState: string;
        count: number;
        color: string
      }[];
    }

* id used for update/delete purposes
* location is (lat, long) of the cluster
* contentLabel: what is clustered ? (devices, cars, buildings...)
* childCount: number of clustered elements
* aggregation: array containing following info for each type of element
  * singularState: used for only one element
  * pluralState: used for several elements
  * count: number of elements
  * color: color to display is gauge and popup



## Configuration
Default values are set for configuration.
You can get config values as following:

    config = IotMapManagerConfig.getConfig();

You can modify several values by calling :

    IotMapManagerConfig.setConfig(...)
    
Editable values :
* map:
  * defaultLat: map center latitude
  * defaultLng: map center longitude
  * defaultZoomLevel: zoom level
  * defaultLayerName: layer name if no layer specified in marker info
  * clusterRadius: radius used to cluster markers
  * externalClustering: if true, auto clustering is deactivated. You need to calculate your own clusters
  * layerControl: if true, display a tool in top right corner to manage layers display,

* markers:
  * default:
    * shape: shape selected if no shape is specified in marker info
    * funColor: functionnal color selected if no color is specified in marker info
    * innerColor: inner color selected if no color is specified in marker info
    * anchored: anchored state selected if no state is specified in marker info
    * plain: plain state selected if no state is specified in marker info
    
* markerStatus:
  * for each status (defined by a name as string):
    * stateColor: functionnal color for each marker define with this status,
    * innerColor: icon or label color for each marker define with this status,
    * singularState: singular state name
    * pluralState: plural state name
    
* markerTemplate: agregates all display parameters (colors, shape, icon...)
  * for each template (defined by a name as string):
    * layer
    * shape
        * type
        * anchored
        * plain
        * color
    * inner
        * color
        * icon
        * label


## Use only design features
You can get markerIcons, clusterIcons and UserMarkerIcons and there sizing and position to use them with an other map.

    getMarkerIcon(marker: IotMarker, selected = false): L.DivIcon
    getClusterIcon(cluster: IotCluster, selected = false, automatic = true): L.DivIcon
    getUserMarkerIcon(userMarker: IotUserMarker): L.DivIcon

Each function takes:

    - a marker / cluster / userMarker according to define type
    - selected: boolean. Set selected to 'false' to get a 'normal' icon and to 'true' to get a 'selected' icon (bigger for markers, popup visible for clusters)
    - automatic: boolean. Set to true if you use automatic clustering, false otherwise. 
returned L.DivIcon contains:

    - html:         icon design containing shape, inner (label/icon), shadow and popup (hidden or visible)
    - iconSize:     size of the icon
    - iconAnchor:   point of the icon which corresponds to the marker location (the anchor end position in the marker icon, or icon center if no anchor)
