export function formatDate(date: string): string {
  const dateObj = new Date(date);
  return `${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDay()}`;
}

export function formatDateLong(date: string | undefined): string {
  if (!date) return "";

  const dateObj = new Date(date);
  const hour =
    dateObj.getHours() > 12 ? dateObj.getHours() - 12 : dateObj.getHours();
  // Write a JS Date object to a string in the format like "November 14, 2023, 1:14pm"
  return `${dateObj.toLocaleString("en-US", {
    month: "long",
  })} ${dateObj.getDate()}, ${dateObj.getFullYear()}, ${hour}:${dateObj.getMinutes()}${
    dateObj.getHours() > 12 ? "pm" : "am"
  }`;
}
