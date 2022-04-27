<p align="center">
  <a href="https://boosted.orange.com/">
    <img src="https://boosted.orange.com/docs/5.1/assets/brand/orange-logo.svg" alt="Orange logo" width="50" height="50">
  </a>
</p>

<h3 align="center">IoT Map Component</h3>

<p align="center">
  IoT Map Component is a map component, based on <a href="https://leafletjs.com/">Leaflet</a>, to be integrated in computer or mobile web applications developed in Angular or React. It provides Orange branded design and user experience.
  <br>
  <a href="https://github.com/Orange-OpenSource/IOT-Map-Component/tree/master/src/iotMapManager#readme"><strong>Visit documentation</strong></a>
  <br>
  <br>
  <a href="https://github.com/Orange-OpenSource/IOT-Map-Component/issues/new?assignees=-&labels=bug&template=bug_report.yml&title=Provide+a+general+summary+of+the+issue">Report bug</a>
  ·
  <a href="https://github.com/Orange-OpenSource/IOT-Map-Component/issues/new?assignees=&labels=feature&template=feature_request.yml&title=Suggest+a+new+feature">Request feature</a>
</p>

## Table of contents

- [Presentation](#presentation)
- [Quick start](#quick-start)
- [Storybook](#storybook)

## Presentation

IOT-Map-Component is a map component, based on [Leaflet](https://leafletjs.com/), to be integrated in computer or mobile web applications developed in Angular or REACT. 
It provides Orange branded design and User eXperience. 

This component manipulates the following <ins>entities</ins>, with according **attributes** (and *values*) :

<ins>Markers</ins>, to be displayed at a **location**, on a **layer** of the map, potentially described by a **popup**, with **title** and **body** HTML messages displayed on click. Markers contain also: 
- a **shape** with a **type** (can be *circle* or *square*), **anchored** or not, **plain** or not, displayed in a **color** and with a circle of **accuracy**. For *circle* shapes, **shape** can contain additionnally a **percent** gauge and an angle (0-360) **direction**,
- an **inner** which can be either an **icon** or a **label**, in a specific **color**, or a **img** (which can be a local or Internet image).

Note that shapes appear bigger when selected, and always with an anchor for a better accuracy.

<img src="doc/markers.png" width="400">

<ins>Templates</ins> can be used to define marker templates, setting one or several markers attributes. By setting **template** attribute, marker inherits template attributes.

3 templates are defined:
- *circle* for objects,  
- *square* for a second representation of objects,
- *poi* for points of interest.

<img src="doc/templates.png">

<ins>Status</ins> can be used, in the same way, to define marker status, setting on or several markers attributes. By setting **status** attribute, marker inherits status attributes.

Status is also used by clusterization: repartition of clusterized markers is based on status **color**, and cluster popup displays **bullet** and **singular** or **plural** status **name**, potentially clickable to go to **url** opened in a **urlTarget**.

Note that order of priority concerning attribute value is : status, then template, then attributes.

Several status are defined: 
- For objects: *positive*, *neutral*, *warning*, *alert*, *inactive*, 
- For PoIs: *foodAndDrink*, *shopping*, *health*, *entertainment*, *services*, *civilServiceWorship*, *outdoor*, *transport*, 

<img src="doc/status.png">

- An always visible **tab**, in *large* or *normal* **type**, can be optionnaly added to every marker, for additionnal HTML **content** information:

<img src="doc/tabs.png">

<ins>Clusters</ins> to replace several markers, depending on the map zoom level.
Markers are clusterized:
- by layer (2 markers from 2 different layers will not be clusterized together). Layers can be optionnally qualified by an HTML **content**, for cluster to display it in a tab, in *large* or *normal* **type**, and in its popup, where **popupColNumber** allows to display labels in 1 (default) or several columns.
- using **status** attribute for the colored repartition on cluster, and for information displayed in the cluster popup: **bullet**, **singular** and **plural** labels, and **url** to be called and opened in **urlTarget**, when clicking on a label.

Automatic clustering (engined by Leaflet) can be used to manage up to 100 000 markers. Beyond that, *external* mode allows to manage manually clusters, by building clusters with all attributs described above.

<img src="doc/clusters.png"><img src="doc/clusters_tabs.png" width=420>

<ins>User marker</ins> to display the current location of the application user, with an optionnal **direction** (in degree) and **accuracy**.

<img src="doc/usermarker.png">

<ins>Paths</ins> to display a path relying a list of **points**, with a **color**. Above the starting and end positions that are displayed automatically, intermediate **positions** can be specified. Paths can be optionally completed by **additional** ones, specifying **points**, **color**, and **line** number.

<img src="doc/paths.png">

<ins>Areas</ins> to display areas, defined by a list of **points**, bordered by a **color**ed line, and filled with **fillColor** and **fillOpacity** percent.

<img src="doc/areas.png">

## Quick start

Several quick start options are available:
- Download the latest release, and integrate it in your project,
- Install with [npm](https://www.npmjs.com/): `npm install iotmapmanager`

Then, display a map by inserting in your page:
```
 <map-component></map-component>
```
Angular sample of use is given in ```map/map.components.ts``` (and not included by npm) to display/refresh map elements, using javascript **IoTMapManager** class methods (see [src/iotMapManager/readme.md](https://github.com/Orange-OpenSource/IOT-Map-Component/blob/master/src/iotMapManager/readme.md)).

## Storybook

In order to discover or demonstrate, without any integration, entities and attributes defined in the map component, a storybook instance is accessible [here](https://orange-opensource.github.io/IOT-Map-Component/?path=/story/iot-map-manager--clusters).
