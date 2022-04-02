const MAX_PRICE = 100000;

const element = document.querySelector('.ad-form__slider');
const priceField = document.querySelector('#price');

const setupSlider = () => {
  noUiSlider.create(element, {
    range: {
      min: 0,
      max: 10000
    },
    start: 1000,
    step: 1,
    connect: 'lower',
    format: {
      to:  (value) => value.toFixed(0),
      from: (value) => parseFloat(value)
    }
  });

  element.noUiSlider.on('update', () => {
    priceField.value = element.noUiSlider.get();
  });
};

const updateSliderOptions = (options) => {
  const {range: {min, max = MAX_PRICE}} = options;
  element.noUiSlider.updateOptions({range: {min, max}});
  element.noUiSlider.set(min);
};

const setSlider = (value) => element.noUiSlider.set(value);

export {
  setSlider,
  setupSlider,
  updateSliderOptions,
};


