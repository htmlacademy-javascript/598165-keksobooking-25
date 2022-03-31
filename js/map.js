import {enablePage} from './page.js';
import {generateOfferElement} from './card.js';
import {resetButton} from './form.js';

const TOKYO_COORDS = {
  lat:  35.652832,
  lng: 139.839478
};

const MAP_ZOOM = 12;

let map, markerGroup, mainMarker;
const addressField = document.querySelector('#address');

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const pinIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 20]
});

const centerMap = () => map.setView(TOKYO_COORDS, MAP_ZOOM);

const updateAddressField = (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  addressField.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
};

const addMainMarker = () => {
  mainMarker = L.marker(TOKYO_COORDS, {
    draggable: true,
    icon: mainPinIcon,
  });

  mainMarker.addTo(map);
  document
    .querySelector('#address')
    .value = `${TOKYO_COORDS.lat}, ${TOKYO_COORDS.lng}`;

  mainMarker.on('drag', updateAddressField);
};

const initMap = (selector) => {
  map = L.map(selector);
  map.on('load', () => enablePage());
  map.setView(TOKYO_COORDS, MAP_ZOOM);
  markerGroup = L.layerGroup().addTo(map);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  ).addTo(map);

  addMainMarker();

  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    centerMap();
  });
};

const createOfferMarker = (offer) => {
  const{offer: {location: {lat, lng}}} = offer;
  const marker = L.marker({lat, lng}, {icon: pinIcon});
  marker.addTo(markerGroup).bindPopup(generateOfferElement(offer));
} ;

const addMarkers = (offers) => {
  offers.forEach(createOfferMarker);
};

const resetMainMarker = () => {
  map.closePopup();
  mainMarker.remove();
  addMainMarker();
};

const removeMarkers = () => {
  markerGroup.clearLayers();
};

const redrawMarkers = (offers) => {
  removeMarkers();
  addMarkers(offers);
};

export {
  addMarkers,
  initMap,
  redrawMarkers,
  resetMainMarker,
};
