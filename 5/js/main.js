import {createOffers, OFFERS_NUMBER} from './data.js';
import {generateOfferCard} from './card.js';

const offers = createOffers(OFFERS_NUMBER);
const offerCard = generateOfferCard(offers[0]);

document.querySelector('#map-canvas').append(offerCard);
