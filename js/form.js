const DISABLE_CLASS = 'ad-form--disabled';
const INTERACTIVE_ELEMENTS = [
  'button', 'input', 'select', 'textarea'
];

const forms = [
  document.querySelector('.map__filters'),
  document.querySelector('.ad-form')
];

const toggleInputs = (enable) => {
  forms.forEach((form) => {
    INTERACTIVE_ELEMENTS.forEach((interactive) => {
      form.querySelectorAll(interactive)
        .forEach((element) => {element.disabled = !enable;});
    });
  });
};

const toggleForms = (enable) => {
  forms.forEach((form) => {
    if (enable) {
      form.classList.remove(DISABLE_CLASS);
      return;
    }
    form.classList.add(DISABLE_CLASS);
  });
};

const disablePage = () => {
  toggleInputs(false);
  toggleForms(false);
};

const enablePage = () => {
  toggleInputs(true);
  toggleForms(true);
};

export {
  disablePage,
  enablePage,
};
