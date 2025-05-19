export const cleanTime = (standardNotation: string) => {
  const array = standardNotation.toString().split(":");
  const hours: number = Math.ceil(parseInt(array[0]));
  const minutes: number = Math.ceil(parseInt(array[1]));
  const seconds: string = zeroPad(Math.ceil(parseInt(array[2])), 2);

  // Insure time with Hours is formatted as "HH:MM:SS"
  const formattedMinutes =
    hours !== 0 && minutes < 10 ? (minutes + "").padStart(2, "0") : minutes;

  let time: string = `${formattedMinutes}:${seconds}`;

  if (hours !== 0) {
    time = `${hours}:${time}`;
  }

  return time;
};

export const convertTime = (duration: number) => {
  const standardNotation: string = new Date(duration * 1000)
    .toISOString()
    .substr(11, 8);
  return cleanTime(standardNotation);
};

const zeroPad = (num: number, places: number) =>
  String(num).padStart(places, "0");
