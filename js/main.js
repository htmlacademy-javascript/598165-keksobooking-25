function getRandomPositiveInt(a, b) {
  const min = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const max = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomPositiveFloat(a, b, precision) {
  const min = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const max = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const random = Math.random() * (max - min) + min;
  return parseFloat(random.toFixed(precision));
}

getRandomPositiveInt(3, 5);
getRandomPositiveFloat(1.1, 1.2, 3);

