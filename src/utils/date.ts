import { format, isValid, parse, subMonths } from 'date-fns';

export type DateRange = [string, string];

export const getXMonthsAgo = (months: number) => {
  return format(subMonths(new Date(), months), 'yyyy-MM-dd');
};

export const formatYYYYMMDD = (date: Date) => {
  return format(date, 'yyyy.MM.dd');
};

export const isDateFormat = (date: string, format: string = 'yyyy-MM-dd'): boolean => {
  const parsedDate = parse(date, format, new Date());
  return isValid(parsedDate);
};

export const getCurrentDate = () => {
  const now = new Date();
  const year = String(now.getFullYear());
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return { year, month, day };
};
