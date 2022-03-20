import {enablePage} from './page.js';
import {generateOfferElement} from './card.js';

const TOKYO_COORDS = {
  lat:  35.652832,
  lng: 139.839478
};

let map, markerGroup;
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

const updateAddressField = (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  addressField.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
};

const addMainMarker = () => {
  const mainMarker = L.marker(TOKYO_COORDS, {
    draggable: true,
    icon: mainPinIcon,
  });

  mainMarker.addTo(map);
  mainMarker.on('drag', updateAddressField);
};

const initMap = (selector) => {
  map = L.map(selector);
  map.on('load', () => enablePage());
  map.setView(TOKYO_COORDS, 10);
  markerGroup = L.layerGroup().addTo(map);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  ).addTo(map);

  addMainMarker();
};

const createOfferMarker = (offer) => {
  const{offer: {location: {lat, lng}}} = offer;
  const marker = L.marker({lat, lng}, {icon: pinIcon});
  marker.addTo(markerGroup).bindPopup(generateOfferElement(offer));
} ;

const addMarkers = (offers) => {
  offers.forEach(createOfferMarker);
};

const removeMarkers = () => {
  markerGroup.clearLayers();
};

export {
  initMap,
  addMarkers,
  removeMarkers,
};