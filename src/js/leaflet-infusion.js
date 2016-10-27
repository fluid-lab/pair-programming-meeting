fluid.defaults("fluid.leaflet.map", {
       gradeNames: ["fluid.viewComponent"],
       mapPanelOptions: {
           height: "500px",
           width: "500px"
       },
       tileOptions: {
           url: "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
           attribution: "&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors, &copy; <a href=\"http://cartodb.com/attributions\">CartoDB"
       },
       selectors: {
           mapPanel: ".mapPanel"
       },
       invokers: {
           initializeMapPanel: {
               funcName: "fluid.leaflet.map.initializeMapPanel",
               args: ["{that}"]
           },
           panTo: {
               this: "{that}.map",
               "method": "panTo"
           }
       },
       listeners: {
           "onCreate.initializeMapPanel": {
               funcName: "{that}.initializeMapPanel",
               priority: "first"
           }//,
           // "onCreate.panMap": {
           //     funcName: "{that}.panTo",
           //     args: [[43.6438, -79.5654], {animate: true, duration: 2}]
           // }
       },
       events: {
           "onMapReady": null
       }
   });

fluid.leaflet.map.initializeMapPanel = function (that) {
   var mapPanel = that.locate("mapPanel"),
       mapPanelOptions = that.options.mapPanelOptions,
       tileOptions = that.options.tileOptions;

   mapPanel.css({
       "height": mapPanelOptions.height,
       "width": mapPanelOptions.width,
   });

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
