fluid.defaults("fluid.leaflet.map", {
       gradeNames: ["fluid.viewComponent"],
       tileOptions: {
           url: "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
           attribution: "&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors, &copy; <a href=\"http://cartodb.com/attributions\">CartoDB"
       },
       selectors: {
           mapPanel: ".flc-mapPanel"
       },
       invokers: {
           initializeMapPanel: {
               funcName: "fluid.leaflet.map.initializeMapPanel",
               args: ["{that}"]
           }
       },
       listeners: {
           "onCreate.initializeMapPanel": {
               funcName: "{that}.initializeMapPanel"
           }
       },
       events: {
           "onMapReady": null
       }
   });

fluid.leaflet.map.initializeMapPanel = function (that) {
   var mapPanel = that.locate("mapPanel"),
       tileOptions = that.options.tileOptions;

   var mapPanelId = fluid.allocateSimpleId(mapPanel);

   // Taken from the example at http://leafletjs.com/reference-1.0.0.html#map-example
   that.map = L.map(mapPanelId, {
       center: [51.505, -0.09],
       zoom: 13}
   );

   // Add the tile layer
   that.tileLayer = L.tileLayer(tileOptions.url, {
       attribution: tileOptions.attribution,
       detectRetina:true
       }).addTo(that.map);

   // Fire the "map ready" event
   that.events.onMapReady.fire();

};
