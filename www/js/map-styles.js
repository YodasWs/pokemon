pokemon = pokemon || {}
pokemon.world = {
	geocoder:{},
	infoWindows:[],
	map:{},
	routes:[],
	centers:[],
	gyms:[],
	clusterer:{},
	options:{
		terrain:{
			"standard":{
				strokeOpacity:0.8,
				strokeWeight:2,
				fillOpacity:0.35
			},
			"city":{
				strokeColor:'#888888',
				fillOpacity:0
			},
			"creek":{
				strokeColor:'#008800',
				fillColor:'#008800'
			},
			"grass":{
				strokeColor:'#008800',
				fillColor:'#008800'
			},
			"forest":{
				strokeColor:'#008800',
				fillColor:'#008800'
			},
			"cave":{
				strokeColor:'brown',
				fillColor:'#brown'
			},
			"mountain":{
				strokeColor:'brown',
				fillColor:'#brown'
			},
		}
	}
}
window.mapStyles = [
{ "elementType": "labels", "stylers": [ { "visibility": "off" } ] },
{ "elementType": "geometry", "stylers": [ { "visibility": "off" } ] },
{ "featureType": "poi.park", "elementType": "geometry", "stylers": [ { "visibility": "simplified" }, { "hue": "#1aff00" }, { "saturation": -39 }, { "lightness": -22 } ] },
{ "featureType": "road", "elementType": "geometry", "stylers": [ { "visibility": "on" }, { "color": "#a0a0a0" } ] },
{ "featureType": "road.highway.controlled_access", "elementType": "geometry", "stylers": [ { "color": "#ff0900" } ] },
{ "featureType": "transit.line", "elementType": "geometry", "stylers": [ { "visibility": "simplified" }, { "color": "#ffcc00" } ] },
{ "featureType": "transit.station", "elementType": "labels.icon", "stylers": [ { "visibility": "on" } ] },
{ "featureType": "water", "elementType": "geometry", "stylers": [ { "visibility": "on" } ] },
{ "featureType": "landscape.natural", "elementType": "geometry", "stylers": [ { "visibility": "on" }, { "hue": "#08ff00" }, { "saturation": 30 }, { "lightness": -10 } ] },
{ "featureType": "landscape.man_made", "elementType": "geometry", "stylers": [ { "visibility": "on" }, { "hue": "#08ff00" }, { "saturation": 38 }, { "lightness": -25 } ] },
{ "featureType": "administrative.province", "elementType": "geometry", "stylers": [ { "visibility": "on" } ] },
{ "featureType": "administrative.country", "elementType": "geometry", "stylers": [ { "visibility": "on" } ] },
{ "featureType": "poi.medical", "elementType": "geometry", "stylers": [ { "visibility": "simplified" } ] },
]
