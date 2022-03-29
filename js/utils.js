const getRandomPositiveInt = (a, b) => {
  const min = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const max = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomPositiveFloat = (a, b, precision = 5) => {
  const min = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const max = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const random = Math.random() * (max - min) + min;
  return parseFloat(random.toFixed(precision));
};

const getRandomFromArray = (array) => array[getRandomPositiveInt(0, array.length - 1)];

const shuffle = (array) => {
  const result = array.slice();

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

const debounce = (callback, timeout = 500) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { callback.apply(null, args); }, timeout);
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export {
  debounce,
  getRandomPositiveInt,
  getRandomPositiveFloat,
  getRandomFromArray,
  shuffle,
  isEscapeKey,
};
