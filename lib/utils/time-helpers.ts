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
  // A time that isn't a number would make toISOString throw (RangeError).
  if (!Number.isFinite(duration)) return "";
  const standardNotation: string = new Date(duration * 1000)
    .toISOString()
    .substr(11, 8);
  return cleanTime(standardNotation);
};

const zeroPad = (num: number, places: number) =>
  String(num).padStart(places, "0");

interface TimeSelector {
  t?: number | string;
  value?: string;
}

/**
 * The start time, in seconds, of a content state's selector. Clover 3 wrote a
 * PointSelector (`{ t: 12.34 }`); Clover 4 writes a FragmentSelector with a
 * media fragment (`{ value: "t=12.34" }`), which may also be a range
 * (`t=12.34,30`) or name its format (`t=npt:12.34`). A region (`xywh=`) has
 * no time.
 */
export const selectorStartTime = (
  selector?: TimeSelector | null,
): number | undefined => {
  const time =
    selector?.t ??
    /(?:^|[?&#])t=(?:npt:)?([\d.]+)/.exec(selector?.value ?? "")?.[1];
  if (time == null || time === "") return undefined;
  const seconds = Number(time);
  return Number.isFinite(seconds) ? seconds : undefined;
};
