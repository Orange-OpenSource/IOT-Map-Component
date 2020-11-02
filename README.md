# IOT-Map-Component 

## Table of contents

- [Presentation](#presentation)
- [Quick start](#quick-start)


## Presentation

IOT-Map-Component is a map component, based on [Leaflet](https://leafletjs.com/), to be integrated in computer or mobile web applications developed in Angular or REACT. 
It provides Orange branded design and User eXperience. 

This component manipulates the following <ins>entities</ins>, with according **attributes** (and *values*) :

<ins>Markers</ins> of different **shape** : *poi* (point of interest), *square* and *circle* (the last 2 for any elements to be displayed). 
- Shapes can have a **color**, be **anchored** or not, be **selected** or not.
- Markers can be displayed also with a **location** and a **inner** design: a **label** or an **icon**, with a **color**. 
- Square shapes and circle shapes markers can be displayed **with direction** (**angle** in degree) or not, and **plain** colored or not.

<img src="doc/Image1.png">

- An always visible **tab** can be optionnaly added to every marker, for additionnal information:

<img src="doc/Image2.png">

- On square and circle shapes, the border color can be used to represent a **gauge**, with a **percent** and a **color**: 

<img src="doc/Image3.png">

<ins>Clusters</ins> to replace several markers, depending on the map zoom level.
- Clusters display the number of replaced markers.
- Clusters can be managed with **mode**:
    - *all* allow to group all markers in same clusters.
    - *inner* allow to group makers, depending on their inner label/icon : this label/icon is displayed in a cluster tab.
- Clusters can be managed **colored**: if true, clusters display in a gauge the repartition of markers of any **shape** **color**.

<img src="doc/Image4.png">

<ins>User location</ins> to display the current location of the application user, **with direction** (**angle** in degree) or not.

<img src="doc/Image5.png">

<ins>Paths</ins> to display a path between several **locations**, including a **start** and an **end**, and with a **color**.

<img src="doc/Image6.png">

[comment]: <Examples of use can be found in [samples](https://github.com/Orange-OpenSource/IOT-Map-Component/samples).>

[comment]: <TbAdded image of one sample>

## Quick start


- [Download the latest release](https://github.com/Orange-OpenSource/IOT-Map-Component/archive/v0.1.2.zip), and integrate it in your project,
- Display a map by inserting in your page:
```
 <map-component></map-component>
```
- Angular sample of use if given in ```map/map.components.ts``` to display/refresh map elements, using javascript **IoTMapManager** class methods (see [src/iotMapManager/readme.md](https://github.com/Orange-OpenSource/IOT-Map-Component/blob/master/src/iotMapManager/readme.md)).


