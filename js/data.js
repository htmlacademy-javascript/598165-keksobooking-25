import {getRandomFromArray, getRandomPositiveFloat, getRandomPositiveInt, shuffle} from './utils.js';

const CHECKINS = ['12:00', '13:00', '14:00'];
const CHECKOUTS = ['12:00', '13:00', '14:00'];

const DESCRIPTIONS = [
  'Хейтеров просьба не беспокоить.',
  'Комната в трёхкомнатной квартире, подойдёт молодым путешественникам.',
  'Квартира на первом этаже. Соседи тихие. Для всех, кто терпеть не может шума и суеты.',
  'Великолепная лавочка прямо в центре парка. Подходит для всех кто любит спать на свежем воздухе.',
  'Маленькая квартирка на чердаке. Для самых не требовательных.',
  'Замечательный дворец в старинном центре города. Только для тех кто может себе позволить дворец. Лакеев и прочих жокеев просим не беспокоить.',
  'Отель для ценителей истории. Почуствуй себя героем из прошлого.',
  'У нас тут все ништяк. Ларек за углом. Шава 24 часа. Приезжайте! Интернетов нет!',
  'Великолепная квартира-студия в центре Токио. Подходит как туристам, там и бизнесменам. Квартира полностью укомплектована и имеет свежий ремонт.',
  'Один из лучших хостелов для душевного общения. Ужинаем вместе и играем в «Мафию» по вечерам, вкусно готовим. Ежедневная уборка, бесплатный Wi-Fi, чистое постельное белье.',
  'Тут красиво, светло и уютно. Есть где разместиться компании из 5 человек. Кофе и печеньки бесплатно.'
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const GUESTS = [0, 1, 2, 3];

const LAT_MIN = 35.65000;
const LAT_MAX = 35.70000;
const LNG_MIN = 139.70000;
const LNG_MAX = 139.80000;

const OFFERS_NUMBER = 10;

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const PRICE_MIN = 0;
const PRICE_MAX = 100000;

const ROOMS = [1, 2, 3, 100];

const TITLES = [
  'Маленькая квартирка рядом с парком',
  'Чёткая хата',
  'Небольшая лавочка в парке',
  'Уютное гнездышко для молодоженов',
  'Тихая квартирка недалеко от метро',
  'Стандартная квартира в центре',
  'Квартира студия в престижном районе',
  'Милое гнездышко для фанатов Анимэ',
  'Императорский дворец в центре Токио',
  'Загородный дом для спокойного отдыха',
  'Милейший чердачок',
  'Хостел «Для друзей»',
  'Отель-музей',
  'Небольшая бюджетная комната для студентов',
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const createOffer = () => ({
  author: {
    avatar: `img/avatars/user${String(getRandomPositiveInt(1, 10)).padStart(2, '0')}.png`
  },
  offer: {
    title: getRandomFromArray(TITLES),
    get address() {
      return `${this.location.lat}, ${this.location.lng}`;
    },
    price: getRandomPositiveInt(PRICE_MIN, PRICE_MAX),
    type: getRandomFromArray(TYPES),
    rooms: getRandomFromArray(ROOMS),
    guests: getRandomFromArray(GUESTS),
    checkin: getRandomFromArray(CHECKINS),
    checkout: getRandomFromArray(CHECKOUTS),
    features: shuffle(FEATURES).slice(0, getRandomPositiveInt(1, FEATURES.length)),
    description: getRandomFromArray(DESCRIPTIONS),
    photos: Array.from({length: getRandomPositiveInt(0, 5)}, () => getRandomFromArray(PHOTOS)),
    location: {
      lat: getRandomPositiveFloat(LAT_MIN, LAT_MAX),
      lng: getRandomPositiveFloat(LNG_MIN, LNG_MAX),
    },
  }
});

const createOffers = (number) => Array.from({length: number}, createOffer);

export {
  createOffers,
  OFFERS_NUMBER,
};
