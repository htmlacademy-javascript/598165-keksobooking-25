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

pristine.addValidator(roomsField, validateCapacity, getCapacityErrorMessage);
pristine.addValidator(capacityField, validateCapacity);

const validateAddOfferForm = () => {
  adForm.addEventListener('submit', (evt) => {
    const isValid = pristine.validate();
    if (!isValid) {
      evt.preventDefault();
    }
  });

  roomsField.addEventListener('change', () => pristine.validate());
  capacityField.addEventListener('change', () => pristine.validate());
};

export {
  validateAddOfferForm,
};


