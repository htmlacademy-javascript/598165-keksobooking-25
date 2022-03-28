const template = document.querySelector('#card')
  .content
  .querySelector('.popup');
const photoTemplate = template.querySelector('.popup__photo');
template.querySelector('.popup__photos').innerHTML = '';

const OfferTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

export const generateOfferElement = (data) => {
  const generated = template.cloneNode(true);

  const toggleFeatures = () => {
    generated.querySelector('.popup__features')
      .querySelectorAll('.popup__feature')
      .forEach((featureListItem) => {
        const hasFeature = [...featureListItem.classList]
          .some((className) => data.offer.features
            .some((feature) => className.includes(feature)));

        if (!hasFeature) {
          featureListItem.remove();
        }
      });
  };

  const getPhotosFragment = () => {
    const photos = document.createDocumentFragment();

    data.offer.photos.forEach((src) => {
      const photo = photoTemplate.cloneNode(true);
      photo.src = src;
      photos.appendChild(photo);
    });

    return photos;
  };

  if (data.author.avatar) {
    generated.querySelector('.popup__avatar').src = data.author.avatar;
  } else {
    generated.querySelector('.popup__avatar').remove();
  }

  if (data.offer.title) {
    generated.querySelector('.popup__title').textContent = data.offer.title;
  } else {
    generated.querySelector('.popup__title').remove();
  }

  if (data.offer.address) {
    generated.querySelector('.popup__text--address').textContent = data.offer.address;
  } else {
    generated.querySelector('.popup__text--address').remove();
  }

  if (data.offer.price) {
    generated.querySelector('.popup__text--price')
      .innerHTML = `${data.offer.price} <span>₽/ночь</span>`;
  } else {
    generated.querySelector('.popup__text--price').remove();
  }

  if (data.offer.type) {
    generated.querySelector('.popup__type').textContent = OfferTypes[data.offer.type];
  } else {
    generated.querySelector('.popup__type').remove();
  }

  if (data.offer.rooms && data.offer.guests) {
    generated
      .querySelector('.popup__text--capacity')
      .textContent = `${data.offer.rooms} комнаты для ${data.offer.guests} гостей`;
  } else {
    generated.querySelector('.popup__text--capacity').remove();
  }

  if (data.offer.checkin && data.offer.checkout) {
    generated
      .querySelector('.popup__text--time')
      .textContent = `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`;
  } else {
    generated.querySelector('.popup__text--time').remove();
  }

  if (data.offer.features && data.offer.features.length) {
    toggleFeatures();
  } else {
    generated.querySelector('.popup__feature').remove();
  }

  if (data.offer.description) {
    generated.querySelector('.popup__description').textContent = data.offer.description;
  } else {
    generated.querySelector('.popup__description').remove();
  }

  if (data.offer.photos && data.offer.photos.length) {
    generated.querySelector('.popup__photos').append(getPhotosFragment());
  } else {
    generated.querySelector('.popup__photos').remove();
  }

  return generated;
};

