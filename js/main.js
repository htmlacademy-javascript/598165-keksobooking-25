function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  if (min < max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

function randomFloat(min, max, precision) {
  if (min < max) {
    const random = Math.random() * (max - min) + min;
    return parseFloat(random.toFixed(precision));
  }
}

randomInt(3, 5);
randomFloat(1.1, 1.2, 3);

