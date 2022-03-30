import {redrawMarkers} from './map.js';
import {resetButton} from './form.js';
import {debounce} from './utils.js';

const FilterKeys = {
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
  const type = formData.get(FilterKeys.TYPE);
  const price = formData.get(FilterKeys.PRICE);
  const rooms = formData.get(FilterKeys.ROOMS);
  const guests = formData.get(FilterKeys.GUESTS);
  const features = formData.getAll(FilterKeys.FEATURES);

  let filtered = offers.slice();

  if (type !== DefaultValues.TYPE) {
    filtered = filtered.filter(filterByType(type));
  }

  if (price !== DefaultValues.PRICE) {
    filtered = filtered.filter(filterByPrice(price));
  }

  if (rooms !== DefaultValues.ROOMS) {
    filtered = filtered.filter(filterByRooms(rooms));
  }

  if (guests !== DefaultValues.GUESTS) {
    filtered = filtered.filter(filterByGuest(guests));
  }

  if (features.length) {
    filtered = filtered.filter(filterByFeatures(features));
  }

  return filtered;
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
