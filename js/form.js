import {setSlider, setupSlider, updateSliderOptions} from './slider.js';
import {debounce} from './utils.js';
import {sendData, showApiMessage} from './api.js';
import {resetMainMarker} from './map.js';

const ADDRESS_VALIDATION_ERROR = 'Формат значения поля адреса: широта, долгота';
const ONE_ROOM_VALIDATION_ERROR = '1 комната для 1 гостя';
const TWO_ROOM_VALIDATION_ERROR = '2 комнаты для 2 гостей или для 1 гостя';
const THREE_ROOM_VALIDATION_ERROR = '3 комнаты для 3 гостей или для 2 гостей или для 1 гостя';
const HUNDRED_ROOM_VALIDATION_ERROR = '100 комнат не для гостей';
const TIME_VALIDATION_ERROR = 'Время въезда должно соответствовать времени выезда';

const adForm = document.querySelector('.ad-form');

const capacityErrorMessages = {
  '1': ONE_ROOM_VALIDATION_ERROR,
  '2': TWO_ROOM_VALIDATION_ERROR,
  '3': THREE_ROOM_VALIDATION_ERROR,
  '100': HUNDRED_ROOM_VALIDATION_ERROR,
};

const minPrices = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
} ;

const capacityOption = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const roomsField = adForm.querySelector('#room_number');
const capacityField = adForm.querySelector('#capacity');
const addressField = adForm.querySelector('#address');
const typeField = adForm.querySelector('#type');
const priceField = adForm.querySelector('#price');
const timeInField = adForm.querySelector('#timein');
const timeOutField = adForm.querySelector('#timeout');
const resetButton = adForm.querySelector('.ad-form__reset');
const submitButton = adForm.querySelector('.ad-form__submit');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__item--invalid',
  successClass: 'ad-form__item--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'ad-form__error'
});

const validateCapacity = () => capacityOption[roomsField.value]
  .includes(capacityField.value);

const validateAddress = () => {
  const coordsRegex = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;
  return addressField.value.match(coordsRegex);
};

const validateMinPrice = (value) => parseInt(value, 10) >= minPrices[typeField.value] ;

const validateTime = () => timeInField.value === timeOutField.value;

const getCapacityErrorMessage = () => capacityErrorMessages[roomsField.value];

const getMinPriceErrorMessage = () => `Минимальное значение — ${minPrices[typeField.value]}`;

const setMinPrice = () => {
  priceField.min = minPrices[typeField.value];
  priceField.placeholder = minPrices[typeField.value];
  updateSliderOptions({range: {min: minPrices[typeField.value]}});
};

const syncTime = (field1, field2) => {
  field2.value = field1.value;
};

const resetForm = () => {
  adForm.reset();
  resetMainMarker();
  setMinPrice();
};

const disableSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.style.opacity = '0.5';
  submitButton.textContent = 'Публикую...';
};

const enableSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.style.opacity = '1';
  submitButton.textContent = 'Опубликовать';
};

const setupFormValidation = () => {
  pristine.addValidator(roomsField, validateCapacity, getCapacityErrorMessage);
  pristine.addValidator(capacityField, validateCapacity);
  pristine.addValidator(addressField, validateAddress, ADDRESS_VALIDATION_ERROR);
  pristine.addValidator(priceField, validateMinPrice, getMinPriceErrorMessage);
  pristine.addValidator(timeInField, validateTime, TIME_VALIDATION_ERROR);
  pristine.addValidator(timeOutField, validateTime, TIME_VALIDATION_ERROR);

  roomsField.addEventListener('change', () => pristine.validate());
  capacityField.addEventListener('change', () => pristine.validate());
  timeInField.addEventListener('change', () => {
    syncTime(timeInField, timeOutField);
    pristine.validate();
  });

  timeOutField.addEventListener('change', () => {
    syncTime(timeOutField, timeInField);
    pristine.validate();
  });

  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      const formData = new FormData(evt.target);
      disableSubmitButton();

      sendData(() => {
        showApiMessage('success');
        enableSubmitButton();
        resetForm(evt.target);
      }, () => {
        showApiMessage('error');
        enableSubmitButton();
      }, formData);
    }
  });
};

const initForm = () => {
  setupSlider();
  setupFormValidation();
  setMinPrice();

  priceField
    .addEventListener('input', debounce(() => setSlider(priceField.value)));

  typeField.addEventListener('change', () => {
    setMinPrice();
    pristine.validate();
  });

  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetForm();
  });

};

export {
  initForm,
};
