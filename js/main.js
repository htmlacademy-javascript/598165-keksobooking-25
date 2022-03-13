import {createOffers, OFFERS_NUMBER} from './data.js';
import {generateOfferElement} from './card.js';
import {disablePage} from './form.js';

const offers = createOffers(OFFERS_NUMBER);
const offerCard = generateOfferElement(offers[0]);

document.querySelector('#map-canvas').append(offerCard);

disablePage();
