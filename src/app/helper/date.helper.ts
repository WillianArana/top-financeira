import { isNumber } from './number.helper';

export const convertToDate = (value: string) => {
  let date: Date | null = null;
  if (/^\d{1,2}\/\d{1,2}\/\d{2,4}$/.test(value)) {
    date = new Date(value.replace(/(\d+[/])(\d+[/])/, '$2$1'));
  } else if (isNumber(value)) {
    date = new Date(+value);
  } else {
    date = new Date(value);
  }
  return date;
};
