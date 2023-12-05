import * as map from "./map.js";
import * as ajax from "./ajax.js";

// I. Variables & constants
// NB - it's easy to get [longitude,latitude] coordinates with this tool: http://geojson.io/
const lnglatNYS = [-75.71615970715911, 43.025810763917775];
const lnglatUSA = [-98.5696, 39.8282];
let geojson;
let favoriteIds = ["p20","p79","p180","p43"];
let favoriteButton;
let deleteButton;
let feature = null;


// II. Functions
const setupUI = () => {
	favoriteButton.onclick = () => {
		if (feature != null)
		{
			favoriteIds.push(feature.id);
			refreshFavorites();
			updateButtons(feature.id);
		}
	}

	deleteButton.onclick = () => {
		if (feature != null && favoriteIds.includes(feature.id))
		{
			favoriteIds.splice(favoriteIds.indexOf(feature.id), 1);
			refreshFavorites();
			updateButtons(feature.id);
		}
	}

	// NYS Zoom 5.2
	document.querySelector("#btn1").onclick = () => {
		map.setZoomLevel(5.2);
		map.setPitchAndBearing(0,0);
		map.flyTo(lnglatNYS);
	}
	// NYS isometric view
	document.querySelector("#btn2").onclick = () => {
		map.setZoomLevel(5.5);
		map.setPitchAndBearing(45,0);
		map.flyTo(lnglatNYS);
	}
	// World zoom 0
	document.querySelector("#btn3").onclick = () => {
		map.setZoomLevel(3);
		map.setPitchAndBearing(0,0);
		map.flyTo(lnglatUSA);
	}

	refreshFavorites();
}

const init = () => {
	favoriteButton = document.querySelector("#favorite-btn");
	deleteButton = document.querySelector("#delete-btn");
	map.initMap(lnglatNYS);
	ajax.downloadFile("data/parks.geojson", (str) => {
		geojson = JSON.parse(str);
		//console.log(geojson);
		map.addMarkersToMap(geojson, showFeatureDetails, resetMap);
		setupUI();
	})
};

const showFeatureDetails = (id) => {
	//console.log(`showFeatureDetails - id=${id}`);
	feature = getFeatureById(id);
	document.querySelector("#details-1").innerHTML = `Info for ${feature.properties.title}`;
	document.querySelector("#details-2").innerHTML = `<strong>Address:</strong> ${feature.properties.address}<br>
													  <strong>Phone: </strong> <a href="tel:${feature.properties.phone}">${feature.properties.phone}</a><br>
													  <strong>Website: </strong> <a href="${feature.properties.url}">${feature.properties.url}<a/><br>`;
	document.querySelector("#details-3").innerHTML = `Info for ${feature.properties.description}`;
	updateButtons(id);
};

const resetMap = () => {
	feature = null;
	document.querySelector("#details-1").innerHTML = "Info";
	document.querySelector("#details-2").innerHTML = `<strong>Address:</strong><br>
													  <strong>Phone: </strong><br>
													  <strong>Website: </strong><br>`;
	document.querySelector("#details-3").innerHTML = "";
	updateButtons(null);
}

const updateButtons = (id) => {
	if (id == null)
	{
		favoriteButton.disabled = true;
		deleteButton.disabled = true;
		return;
	}

	if (favoriteIds.includes(id))
	{
		favoriteButton.disabled = true;
		deleteButton.disabled = false;
	}
	else {
		favoriteButton.disabled = false;
		deleteButton.disabled = true;
	}
}

const getFeatureById = (id) => {
	return geojson.features.find((feature) => {return feature.id === id;});
}

const refreshFavorites = () => {
	const favoritesContainer = document.querySelector("#favorites-list");
	favoritesContainer.innerHTML = "";
	for (const id of favoriteIds){
		favoritesContainer.appendChild(createFavoriteElement(id));
	}
}

const createFavoriteElement = (id) => {
	const feature = getFeatureById(id);
	const a = document.createElement("a");
	a.className = "panel-block";
	a.id = feature.id;
	a.onclick = () => {
		showFeatureDetails(a.id);
		map.setZoomLevel(6);
		map.flyTo(feature.geometry.coordinates);
		
		let priorPopupCheck = map.getMarkers().find((marker) => {return marker._popup.isOpen()});
		if (priorPopupCheck){priorPopupCheck.togglePopup();}
		map.getMarkers().find((marker) => {return marker._element.id == feature.id}).togglePopup();
	};

	a.innerHTML = `
		<span class="panel-icon">
			<i class="fas fa-map-pin"></i>
		</span>
		${feature.properties.title}
	`;

	return a;
}

init();