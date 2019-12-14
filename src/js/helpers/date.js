import { format, parse } from 'date-fns';

export function formateDate(str, type) {
  const date = new Date(str);
  return format(date, type);
}

export function parseDate(str, type) {
  const date = parse(str, type, new Date());
  return date;
}
