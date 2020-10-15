# IotMapManager

This library provides management of markers dedicated to projects using mapping.

## marker definition
A marker is defined as follow *(description will evoluate in the futur)* :

    {
        id: string,
        position: [num, num],
        shape: string,
        color: string,
        
        label : character,
        labelColor : string,
        
        icon: string,
        iconColor: string,
        
        anchored: bool,
        selected: bool
    }

* position is [lat, lon]
* shape is 'circle', 'square' or 'poi'
* icon is not completely implemented. For the moment, can be 'bat' or 'temp'
* set anchored to true to get an anchor
* set selected to true to get a bigger marker

label and icon cannot be defined simultaneously : you can display only one of them.
More options will arrive soon.

## using iotMapManager

this library provides following functions :
* **addMarker / addMarkers** : send a marker structure or a list of marker structures
* **updateMarker** : send a marker structure with same id
* **deleteMarker / deleteMarkers**  : send a marker id or a list of marker ids
