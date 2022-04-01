import {redrawMarkers} from './map.js';
import {resetButton} from './form.js';
import {debounce} from './utils.js';

const Inputs = {
  PRICE: 'housing-price',
  TYPE: 'housing-type',
  ROOMS: 'housing-rooms',
  GUESTS: 'housing-guests',
  FEATURES: 'features',
};

const DefaultValues = {
  TYPE: 'any',
  PRICE: 'any',
  ROOMS: 'any',
  GUESTS: 'any',
};

const Prices = {
  MIDDLE: 'middle',
  LOW: 'low',
  HIGH: 'high',
};

const mapFilters = document.querySelector('.map__filters');

const filterByType = (type) => ({offer}) => offer.type === type;

const filterByPrice = (price) => {
  switch (price) {
    case Prices.MIDDLE:
      return ({offer}) => offer.price >= 10000 && offer.price <= 50000;
    case Prices.LOW:
      return ({offer}) => offer.price <= 10000;
    case Prices.HIGH:
      return ({offer}) => offer.price >= 50000;
  }
};

const filterByRooms = (rooms) => ({offer}) => offer.rooms === parseInt(rooms, 10);

const filterByGuest = (guests) => ({offer}) => offer.guests === parseInt(guests, 10);

const filterByFeatures = (features) => ({offer}) => {
  const offerHasFeatures = offer.features && offer.features.length;

  if (offerHasFeatures) {
    return features.every((feature) => offer.features.includes(feature));
  }

  return false;
};

const applyFilters = (offers) => {
  const formData = new FormData(mapFilters);
  const type = formData.get(Inputs.TYPE);
  const price = formData.get(Inputs.PRICE);
  const rooms = formData.get(Inputs.ROOMS);
  const guests = formData.get(Inputs.GUESTS);
  const features = formData.getAll(Inputs.FEATURES);

  let result = offers.slice();

  if (type !== DefaultValues.TYPE) {
    result = result.filter(filterByType(type));
  }

  if (price !== DefaultValues.PRICE) {
    result = result.filter(filterByPrice(price));
  }

  if (rooms !== DefaultValues.ROOMS) {
    result = result.filter(filterByRooms(rooms));
  }

  if (guests !== DefaultValues.GUESTS) {
    result = result.filter(filterByGuest(guests));
  }

  if (features.length) {
    result = result.filter(filterByFeatures(features));
  }

  return result;
};

const setupFilter = (offers) => {
  mapFilters.addEventListener('change', debounce(() => {
    redrawMarkers(applyFilters(offers));
  }));

  resetButton
    .addEventListener('click', (evt) => {
      evt.preventDefault();
      mapFilters.reset();
      redrawMarkers(applyFilters(offers));
    });
};

export {setupFilter};
