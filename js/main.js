import {initForm} from './form.js';
import {disablePage} from './page.js';
import {initMap, addMarkers} from './map.js';
import {getData, showApiMessage} from './api.js';
import {setupFilter} from './filter.js';

const LIMIT = 10;

disablePage();

initMap('map-canvas');

getData((offers) => {
  offers = offers.slice(0, LIMIT);
  setupFilter(offers);
  addMarkers(offers);
}, () => showApiMessage('load-error'));

initForm();
