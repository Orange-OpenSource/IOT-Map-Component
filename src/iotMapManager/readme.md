# IotMapManager

This library provides management of markers dedicated to projects using mapping.

## marker definition
A marker is defined as follow *(description will evoluate in the futur)* :

    {
        id: string,
        location: [num, num],
        shape: {
            shape: string,
            color: string,
            anchored: bool,
            plain: bool
        },
        inner: {
            color: string,
            
            icon: string,
            // *** OR ***
            label: character
        },
        gauge: {
            color: string,
            percent: number
        }
    }

* location is [lat, lon]
* shape is 'circle', 'square' or 'poi'
* icon is not completely implemented. For the moment, can be 'bat' or 'temp'
* label is only one character. If string is sent, first character will be displayed
* set anchored to true to get an anchor

label and icon cannot be defined simultaneously : you can display only one of them.
More options will arrive soon.

## using iotMapManager

this library provides following functions :
* **addMarker / addMarkers** : send a marker structure or a list of marker structures
* **updateMarker** : send a marker id and a structure containing modified parameters
* **deleteMarker / deleteMarkers**  : send a marker id or a list of marker ids
