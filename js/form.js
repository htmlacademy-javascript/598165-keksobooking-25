const DISABLE_CLASS = 'ad-form--disabled';
const INTERACTIVE_ELEMENTS = [
  'button', 'input', 'select', 'textarea'
];

const pageForms = {
  filter: document.querySelector('.map__filters'),
  addOffer: document.querySelector('.ad-form'),
};

const toggleInputs = (form, enable) => {
  form.querySelectorAll(...INTERACTIVE_ELEMENTS)
    .forEach((element) => {element.disabled = !enable;});
};

const toggleForm = (form, enable) => {
  toggleInputs(form, enable);

  if (enable) {
    form.classList.remove(DISABLE_CLASS);
    return;
  }
  form.classList.add(DISABLE_CLASS);
};

const disableForms = () => {
  const {filter, addOffer} = pageForms;

  toggleForm(filter, false);
  toggleForm(addOffer, false);
};

export {
  disableForms,
  pageForms,
  toggleForm,
};
