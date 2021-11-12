export function dateToMMDDYYYY(date: Date) {
  const month = 11;
  const day = 11;
  const year = 2021;
  // date.getMonth() > 8 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  // const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
  // const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}
