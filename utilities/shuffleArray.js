export const shuffleArray = array => {
  let shuffledArray = [];
  let usedIndexes = [];

  let i = 0;
  while (i < array.length) {
    let randomNumber = Math.floor(Math.random() * array.length);
    if (!usedIndexes.includes(randomNumber)) {
      shuffledArray.push(array[randomNumber]);
      usedIndexes.push(randomNumber);
      i++;
    }
  }
  return shuffledArray;
};