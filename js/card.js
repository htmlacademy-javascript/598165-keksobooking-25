const OfferTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const template = document.querySelector('#card')
  .content
  .querySelector('.popup');
const photoTemplate = template.querySelector('.popup__photo');

const generateOfferElement = (data) => {
  const {
    author: {avatar},
    offer: {address, description, checkin, checkout, features, guests, photos, price, rooms, title, type},
  } = data;

  const generated = template.cloneNode(true);

  const appendAvatar = () => {
    const avatarImg = generated.querySelector('.popup__avatar');

    if (!avatar) {
      return avatarImg.remove();
    }
    avatarImg.src = avatar;
  };

  const appendText = (selector, prepareText, ...values) => {
    const areValuesDefined = () => values.every((value) => value !== undefined);
    const element = generated.querySelector(selector);

    if (!areValuesDefined()) {
      return element.remove();
    }
    element.textContent = prepareText(...values);
  };

  const appendPhotos =  () => {
    const photosContainer = generated.querySelector('.popup__photos');
    photosContainer.innerHTML = '';

    if (!photos && photos.length) {
      return photosContainer.remove();
    }
    const fragment = document.createDocumentFragment();

    photos.forEach((src) => {
      const photo = photoTemplate.cloneNode(true);
      photo.src = src;
      fragment.append(photo);
    });

    photosContainer.append(fragment);
  };

  const appendFeatures = () => {
    const featuresList = generated.querySelector('.popup__features');

    if (!features && features.length) {
      return featuresList.remove();
    }

    featuresList.innerHTML = '';
    const fragment = document.createDocumentFragment();

    features.forEach((feature) => {
      const featureItem = document.createElement('li');
      featureItem.classList.add('popup__feature', `popup__feature--${feature}`);
      fragment.append(featureItem);
    });

    featuresList.append(fragment);
  };

  appendAvatar();

  appendText('.popup__title', (text) => text, title);
  appendText('.popup__text--address', (text) => text, address);
  appendText('.popup__text--price', (text) => `${text} ₽/ночь`, price);
  appendText('.popup__type',(value) => OfferTypes[value], type);

  appendText('.popup__text--capacity',
    (roomsNumber, guestsNumber) => `${roomsNumber} комнаты ${guestsNumber ? `для ${guestsNumber} гостей` : 'не для гостей'}`,
    rooms, guests);

  appendText('.popup__text--time',
    (checkinTime, checkoutTime) => `Заезд после ${checkinTime}, выезд до ${checkoutTime}`,
    checkin, checkout);

  appendText('.popup__description', (text) => text, description);

  appendFeatures();

  appendPhotos();

  return generated;
};

export {generateOfferElement};
