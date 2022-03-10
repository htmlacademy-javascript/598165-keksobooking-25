const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const photoTemplate = cardTemplate.querySelector('.popup__photo');
cardTemplate.querySelector('.popup__photos').innerHTML = '';

const offerType = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const generateOfferCard = (cardData) => {
  const card = cardTemplate.cloneNode(true);
  const {author, offer} = cardData;
  const {avatar} = author;
  const {
    address,
    checkin,
    checkout,
    description,
    features,
    guests,
    photos,
    price,
    rooms,
    title,
    type,
  } = offer;

  if (avatar) {
    card.querySelector('.popup__avatar').src = avatar;
  } else {
    card.querySelector('.popup__avatar').remove();
  }

  if (title) {
    card.querySelector('.popup__title').textContent = title;
  } else {
    card.querySelector('.popup__title').remove();
  }

  if (address) {
    card.querySelector('.popup__text--address').textContent = address;
  } else {
    card.querySelector('.popup__text--address').remove();
  }

  if (price) {
    card.querySelector('.popup__text--price').innerHTML = `${price} <span>₽/ночь</span>`;
  } else {
    card.querySelector('.popup__text--price').remove();
  }

  if (type) {
    card.querySelector('.popup__type').textContent = offerType[type];
  } else {
    card.querySelector('.popup__type').remove();
  }

  if (rooms || guests) {
    card
      .querySelector('.popup__text--capacity')
      .textContent = `${rooms} комнаты для ${guests} гостей`;
  } else {
    card.querySelector('.popup__text--capacity').remove();
  }

  if (checkin || checkout) {
    card
      .querySelector('.popup__text--time')
      .textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  } else {
    card.querySelector('.popup__text--time').remove();
  }

  if (features || features.length) {
    card
      .querySelectorAll('.popup__feature')
      .forEach((featureListItem) => {
        const hasFeature = [...featureListItem.classList]
          .some((className) => features.some((feature) => className.includes(feature)));

        if (!hasFeature) {
          featureListItem.remove();
        }
      });
  } else {
    card.querySelectorAll('.popup__feature').remove();
  }

  if (description) {
    card.querySelector('.popup__description').textContent = description;
  } else {
    card.querySelector('.popup__description').remove();
  }

  if (photos || photos.length) {
    photos.forEach((src) => {
      const photo = photoTemplate.cloneNode(true);
      photo.src = src;
      card.querySelector('.popup__photos').appendChild(photo);
    });
  } else  {
    card.querySelector('.popup__photos').remove();
  }

  return card;
};

export {
  generateOfferCard,
};
