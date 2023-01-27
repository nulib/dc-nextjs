const formatNumber = (number: number): string => {
  if (!number && number !== 0) return "";
  return number.toLocaleString(undefined);
};

const pluralize = (noun: string, count: number, suffix = "s") => {
  if (!count && count !== 0) {
    console.error("Missing count argument to pluralize()");
    return "";
  }
  return `${formatNumber(count)} ${noun}${count !== 1 ? suffix : ""}`;
};

export { formatNumber, pluralize };
