const formatNumber = (number: number): string => {
  if (!number && number !== 0) return "";
  return number.toLocaleString(undefined);
};

const pluralize = (
  noun: string,
  count: number,
  suffix = "s",
  hideCount?: boolean
) => {
  if (!count && count !== 0) {
    console.error("Missing count argument to pluralize()");
    return "";
  }
  return `${hideCount ? "" : formatNumber(count)} ${noun}${
    count !== 1 ? suffix : ""
  }`;
};

export { formatNumber, pluralize };
