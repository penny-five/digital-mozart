const _ = require('lodash');

/**
 *
 * @param {Array} arr
 * @param {Number} count
 */
const pickRandom = (arr, count = 1) => {
  if (count >= arr.length) return _.shuffle(arr);

  const usedIndexes = [];
  const pickedItems = [];

  do {
    const randomIndex = _.random(0, arr.length - 1);

    if (!usedIndexes.includes(randomIndex)) {
      pickedItems.push(arr[randomIndex]);
      usedIndexes.push(randomIndex);
    }
  } while (pickedItems.length < count);

  return pickedItems;
};

module.exports = {
  pickRandom
};
