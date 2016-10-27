# Repo for Fluid Community Meeting on Pair Programming

## Relevant Files in This Repo

- `browser-sync.sh`: a [Browsersync)[https://www.browsersync.io/] script to launch a server on port 3002, watch the file system for changes and reload the page if changes are detected (saves a lot of CTRL-R).

- `index.html`: basic page that currently just embeds a map.

- `src/js/leaflet-infusion.js`: a basic Infusion component that we'll build on. Uses the [Leaflet](http://leafletjs.com/) mapping library and [CARTO Basemaps Service](https://carto.com/location-data-services/basemaps/).

- `src/json/ocadBuildings.json`: a JSON data file containing the longitude and latitude of buildings on the OCAD campus. Some of them also contain building boundaries expressed as arrays of latitude/longitude points. Information taken from the map at http://www.ocadu.ca/Assets/content/about/Campus+map+and+building+list.jpg.

## The Programming Task

We're going to be working on building an interactive web-based campus building map of the OCAD campus. The "feature list" in rough priority is:

- the map should be centered on 100 McCaul St. to start.
- the map should have a point for each OCAD building.
- the points should show the address as an information bubble when clicked on.
- there should be a building index in a sidebar that pans the map to the appropriate building.
- if a building has boundary information, a coloured shape should be drawn around it on the map rather than a simple point.

## Documentation

- [Leaflet](http://leafletjs.com/reference-1.0.0.html)
- [Infusion](http://docs.fluidproject.org/infusion/development/)
  - [Core API](http://docs.fluidproject.org/infusion/development/CoreAPI.html)
