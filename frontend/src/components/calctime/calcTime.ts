import moment from "moment";

export const CalcTime = (date: Date) => {
  const year = String(date.getFullYear());
  const month = String(
    date.getMonth() + 1 > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)
  );
  const day = String(date.getDate());
  const hours = String(date.getHours());
  const minutes = String(date.getMinutes());
  const seconds = String(date.getSeconds());

  const formatedDate = moment(
    [year, month, day, hours, minutes, seconds],
    "YYYYMMDDhhmmss"
  ).fromNow();

  return formatedDate;
};
