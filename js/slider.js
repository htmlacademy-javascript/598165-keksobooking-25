const MAX_PRICE = 100000;

const sliderElement = document.querySelector('.ad-form__slider');
const priceField = document.querySelector('#price');

const setupSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 10000
    },
    start: 1000,
    step: 1,
    connect: 'lower',
    format: {
      to: function (value) {
        return value.toFixed(0);
      },
      from: function (value) {
        return parseFloat(value);
      }
    }
  });

  sliderElement.noUiSlider.on('update', () => {
    priceField.value = sliderElement.noUiSlider.get();
  });
};

const updateSliderOptions = (options) => {
  const {range: {min, max = MAX_PRICE}} = options;
  sliderElement.noUiSlider.updateOptions({range: {min, max}});
  sliderElement.noUiSlider.set(min);
};

const toggleSlider = (enable) => {
  if (enable) {
    sliderElement.removeAttribute('disabled');
  } else {
    sliderElement.setAttribute('disabled', 'disabled');
  }
};

const setSlider = (value) => sliderElement.noUiSlider.set(value);

export {
  setSlider,
  setupSlider,
  toggleSlider,
  updateSliderOptions,
};


