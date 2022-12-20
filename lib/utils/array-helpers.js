export const sample = (arr) => {
  if (!arr && !Array.isArray(arr)) return;

  return arr[Math.floor(Math.random() * arr.length)];
};

export const shuffle = (arr) => {
  if (!arr && !Array.isArray(arr)) return;

  let currentIndex = arr.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex],
      arr[currentIndex],
    ];
  }

  return arr;
};
