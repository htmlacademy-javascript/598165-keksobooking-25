import {isEscapeKey} from './utils.js';

const OFFERS_NUMBER = 10;
const OFFERS_URL = 'https://25.javascript.pages.academy/keksobooking/data';
const POST_URL = 'https://25.javascript.pages.academy/keksobooking';
const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
};

const adaptData = (data) => {
  data.forEach((it) => {
    it.offer.location = it.location;
  });

};

const getData = (onSuccess, onFail) => {
  fetch(OFFERS_URL)
    .then((response) => response.json())
    .then((offers) => {
      adaptData(offers);
      offers = offers.slice(0, OFFERS_NUMBER);

      onSuccess(offers);
    })
    .catch(onFail);
};

const sendData = (onSuccess, onFail, body) => {
  fetch(POST_URL, {
    method: HttpMethod.POST,
    body
  })
    .then(({ok}) => {
      if (!ok) {
        throw new Error();
      }
      onSuccess();
    })
    .catch(onFail);
};

const showApiMessage = (type) => {
  const template = document.querySelector(`#${type}`).content
    .querySelector(`.${type}`);
  const messageElement = template.cloneNode(true);

  const onMessageEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      messageElement.remove();
      document.removeEventListener('keydown', onMessageEscKeydown);
    }
  };

  const onMessageClick = () => {
    messageElement.remove();
    document.removeEventListener('keydown', onMessageEscKeydown);
  };

  messageElement
    .addEventListener('click', onMessageClick);

  document.addEventListener('keydown', onMessageEscKeydown);

  document.body.append(messageElement);
};

export  {
  getData,
  sendData,
  showApiMessage,
};