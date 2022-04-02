import {disableForms, toggleForm, pageForms} from './form.js';
import {getData, showApiMessage} from './api.js';
import {initAddOfferForm} from './add-offer.js';
import {initFilterForm} from './filter.js';
import {initMap} from './map.js';

const {addOffer, filter} = pageForms;

disableForms();

initMap().then(() => {
  initAddOfferForm();
  toggleForm(addOffer, true);
});

getData()
  .then((offers) => {
    initFilterForm(offers);
    toggleForm(filter, true);
  })
  .catch(() => showApiMessage('load-error'));
