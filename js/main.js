import {initForm} from './form.js';
import {disablePage} from './page.js';
import {initMap, addMarkers} from './map.js';
import {getData, showApiMessage} from './api.js';

disablePage();

initMap('map-canvas');

getData(addMarkers, () => showApiMessage('load-error'));

initForm();
