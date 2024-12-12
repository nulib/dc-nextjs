export function formatDate(date: string): string {
  const dateObj = new Date(date);
  return `${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDay()}`;
}

export function formatDateLong(date: string | undefined): string {
  if (!date) return "";

  const dateObj = new Date(date);
  const hour = dateObj.getHours() % 12 || 12; // Handle midnight and noon
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");
  const ampm = dateObj.getHours() >= 12 ? "pm" : "am";

  return `${dateObj.toLocaleString("en-US", { month: "long" })} ${dateObj.getDate()}, ${dateObj.getFullYear()}, ${hour}:${minutes}${ampm}`;
}
