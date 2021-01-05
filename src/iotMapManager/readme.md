# IotMapManager

This library provides management of markers dedicated to projects using mapping.

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
* location is (lat, long) of the marker
* layer (optionnal) : you can sort your markers in different layers. A tool allow you to display specific layers (see configuration)
* popup (optionnal) is a string displayed in a popup when marker is clicked. (html format)
* status (optionnal) : see configuration

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
  * icon is not completely implemented. you can specify a svg file containt in '/asset/icon' folder.
  * label is only one character. If string is sent, first character will be displayed
label and icon cannot be defined simultaneously : you can display only one of them. If both are defined, icon is displayed
More options will arrive soon.



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
  * defaultLon: map center longitude
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
  * for each status:
    * stateColor: functionnal color for each marker define with this status,
    * innerColor: icon or label color for each marker define with this status,
    * singularState: singular state name
    * pluralState: plural state name
    

## using iotMapManager

this library provides following functions :
* **addMarker / addMarkers** : send a marker structure or a list of marker structures
* **updateMarker** : send a marker id and a structure containing modified parameters
* **deleteMarker / deleteMarkers**  : send a marker id or a list of marker ids


