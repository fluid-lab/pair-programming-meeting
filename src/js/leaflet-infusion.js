fluid.defaults("fluid.leaflet.locations", {
    gradeNames: ["fluid.modelComponent"],
    model: {
        locations:
        {
            "RHA": {
                "address": "205 Richmond St. W",
                "longitude": -79.388702,
                "latitude": 43.649410,
                "boundaries":
                [
                    [43.64948551560894, -79.3886286020279],
                    [43.649422440160514, -79.38860177993774],
                    [43.64941370663167, -79.38863262534142],
                    [43.64925359171109, -79.38856691122055],
                    [43.64918469364421, -79.38887804746628],
                    [43.64940594349386, -79.3889719247818],
                    [43.64948551560894, -79.38862591981888]
                ]
            },
            "RHB": {
                "address": "230 Richmond St. W",
                "longitude": -79.388634,
                "latitude": 43.649830
            },
            "MCF": {
                "address": "51 McCaul St.",
                "longitude": -79.390169,
                "latitude": 43.651642
            },
            "MCG": {
                "address": "49 McCaul St.",
                "longitude": -79.390277,
                "latitude": 43.651493
            },
            "MCH": {
                "address": "52 McCaul St.",
                "longitude": -79.390563,
                "latitude": 43.651918,
                "boundaries": [[43.65185807475334, -79.39087025821209],[43.65193376221404, -79.39054369926453],[43.651867778279275, -79.39051017165184],[43.651795001796565, -79.39084276556969]]
            },
            "MCB Aboveground Art Supplies": {
                "address": "74 McCaul St.",
                "longitude": -79.391066,
                "latitude": 43.652542
            },
            "SPA The Learning Zone": {
                "address": "122 Saint Patrick St.",
                "longitude": -79.390143,
                "latitude": 43.653472
            },
            "MCC Annex Building": {
                "address": "113 McCaul St.",
                "longitude": -79.390373,
                "latitude": 43.653660
            },
            "MCA Main Building": {
                "address": "100 McCaul St.",
                "longitude": -79.391529,
                "latitude": 43.653288
            },
            "DDA Continuing Studies Offices": {
                "address": "285 Dundas St. W",
                "longitude": -79.3909676,
                "latitude": 43.6542361
            },
            "MCD Rosalie Sharp Pavilion": {
                "address": "115 McCaul St.",
                "longitude": -79.391087,
                "latitude": 43.654286
            }
        }
    }
});

// TODO: this only approximates the centre
// TODO: calculation should be average of minimum and maximum
fluid.leaflet.locations.calculateCentre = function (locations) {
    var averageLat = 0;
    var averageLong = 0;
    var numLocations = 0;
    fluid.each(locations, function(location) {
        averageLat = averageLat + location.latitude;
        averageLong = averageLong + location.longitude;
        numLocations++;
    });
    averageLat = averageLat / numLocations;
    averageLong = averageLong / numLocations;
    console.log({
        latitude: averageLat,
        longitude: averageLong
    });
    return {
        latitude: averageLat,
        longitude: averageLong
    };
};

fluid.defaults("fluid.leaflet.map", {
       gradeNames: ["fluid.viewComponent"],
       components: {
           locations: {
               type: "fluid.leaflet.locations"
           }
       },
       model: {
        //  latitude: 43.653288,
        //  longitude: -79.391529,
         zoom:  17
       },
       modelRelay: {
           target: "{that}.model",
           singleTransform: {
               type: "fluid.transforms.free",
               func: "fluid.leaflet.locations.calculateCentre",
               args: ["{locations}.model.locations"]
           }
       },
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
           },
           "onMapReady.addLocations": {
               funcName: "fluid.leaflet.map.addLocations",
               args: ["{that}.leafletMap", "{locations}.model.locations"]
           }
       },
       events: {
           "onMapReady": null
       }
   });

fluid.leaflet.map.addLocations = function (leafletMap, locations) {

    fluid.each(locations, function (location) {
        // Add a point for each location
        // console.log(location);
        L.marker([location.latitude, location.longitude]).addTo(leafletMap);

    });

};

fluid.leaflet.map.initializeMapPanel = function (that) {
   var mapPanel = that.locate("mapPanel"),
       tileOptions = that.options.tileOptions;

   var mapPanelId = fluid.allocateSimpleId(mapPanel);

   // Taken from the example at http://leafletjs.com/reference-1.0.0.html#map-example
   that.leafletMap = L.map(mapPanelId, {
       center: [that.model.latitude, that.model.longitude],
       zoom: that.model.zoom}
   );

   // "longitude": -79.391529,
   // "latitude": 43.653288

   // Add the tile layer
   that.tileLayer = L.tileLayer(tileOptions.url, {
       attribution: tileOptions.attribution,
       detectRetina:true
   }).addTo(that.leafletMap);

   // Fire the "map ready" event
   that.events.onMapReady.fire();

};
