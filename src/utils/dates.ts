export function dateToMMDDYYYY(date: Date) {
  const month =
    date.getMonth() > 8 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}

export function dateDiffInDays(a: Date, b: Date) {
  return Math.round(Math.abs(a.getTime() - b.getTime()) / 86400000);
}
