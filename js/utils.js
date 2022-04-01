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
  isEscapeKey,
};
