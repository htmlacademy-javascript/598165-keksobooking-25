const ADDRESS_VALIDATION_ERROR = 'Формат значения поля адреса: широта, долгота';

const adForm = document.querySelector('.ad-form');

const capacityErrorMessages = {
  '1': '1 комната для 1 гостя',
  '2': '2 комнаты для 2 гостей или для 1 гостя',
  '3': '3 комнаты для 3 гостей или для 2 гостей или для 1 гостя',
  '100': '100 комнат не для гостей',
};

const capacityOption = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const roomsField = adForm.querySelector('#room_number');
const capacityField = adForm.querySelector('#capacity');
const addressField = adForm.querySelector('#address');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__item--invalid',
  successClass: 'ad-form__item--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'ad-form__error'
});

const getCapacityErrorMessage = () => capacityErrorMessages[roomsField.value];

const validateCapacity = () => capacityOption[roomsField.value]
  .includes(capacityField.value);

const validateAddress = () => {
  const coordsRegex = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;
  return addressField.value.match(coordsRegex);
};

const setupFormValidation = () => {
  pristine.addValidator(roomsField, validateCapacity, getCapacityErrorMessage);
  pristine.addValidator(capacityField, validateCapacity);
  pristine.addValidator(addressField, validateAddress, ADDRESS_VALIDATION_ERROR);

  adForm.addEventListener('submit', (evt) => {
    if (!pristine.validate()) {
      evt.preventDefault();
    }
  });

  roomsField.addEventListener('change', () => pristine.validate());
  capacityField.addEventListener('change', () => pristine.validate());
};

export {
  setupFormValidation,
};


