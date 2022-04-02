import {redrawMarkers} from './map.js';
import {resetButton} from './add-offer.js';
import {debounce} from './utils.js';

const LIMIT = 10;

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

const checkType = (offer, type) => {
  if (type === DefaultValues.TYPE) {
    return true;
  }
  return  offer.type === type;
};

const checkPrice = (offer, price) => {
  if (price === DefaultValues.PRICE) {
    return true;
  }

  switch (price) {
    case Prices.MIDDLE:
      return offer.price >= 10000 && offer.price <= 50000;
    case Prices.LOW:
      return offer.price <= 10000;
    case Prices.HIGH:
      return offer.price >= 50000;
  }
};

const checkRooms = (offer, rooms) => {
  if (rooms === DefaultValues.ROOMS) {
    return true;
  }
  return offer.rooms === parseInt(rooms, 10);
};

const checkGuest = (offer, guests) => {
  if (guests === DefaultValues.GUESTS) {
    return true;
  }
  return offer.guests === parseInt(guests, 10);
};


const checkFeatures = (offer, features) => {
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

  return offers.filter(({offer}) => {
    if (!checkType(offer, type)) {
      return false;
    }
    if (!checkPrice(offer, price)) {
      return false;
    }
    if (!checkRooms(offer, rooms)) {
      return false;
    }
    if (!checkGuest(offer, guests)) {
      return false;
    }
    return checkFeatures(offer, features);
  })
    .slice(0, LIMIT);
};


const initFilterForm = (offers) => {
  redrawMarkers(applyFilters(offers));

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

export {initFilterForm};
