const DISABLE_CLASS = 'ad-form--disabled';
const INTERACTIVE_ELEMENTS = [
  'button', 'input', 'select', 'textarea'
];

const mapFilters = document.querySelector('.map__filters');
const adForm = document.querySelector('.ad-form');

const toggleInputs = (enable, ...forms) => {
  forms.forEach((form) => {
    INTERACTIVE_ELEMENTS.forEach((interactive) => {
      form.querySelectorAll(interactive)
        .forEach((element) => {element.disabled = !enable;});
    });
  });
};

const toggleForms = (enable, ...forms) => {
  forms.forEach((form) => {
    if (enable) {
      form.classList.remove(DISABLE_CLASS);
      return;
    }
    form.classList.add(DISABLE_CLASS);
  });
};

const disablePage = () => {
  toggleInputs(false, mapFilters, adForm);
  toggleForms(false, mapFilters, adForm);
};

const enablePage = () => {
  toggleInputs(true, mapFilters, adForm);
  toggleForms(true, mapFilters, adForm);
};

export {
  disablePage,
  enablePage,
};
