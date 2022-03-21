import {createOffers, OFFERS_NUMBER} from './data.js';
import {initForm} from './form.js';
import {disablePage} from './page.js';
import {initMap, addMarkers} from './map.js';

const offers = createOffers(OFFERS_NUMBER);

disablePage();
initMap('map-canvas');
addMarkers(offers);
initForm();

