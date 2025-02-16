import { format, subMonths } from 'date-fns';

export const getXMonthsAgo = (months: number) => {
  return format(subMonths(new Date(), months), 'yyyy-MM-dd');
};

export const formatYYYYMMDD = (date: Date) => {
  return format(date, 'yyyy.MM.dd');
};

export const getCurrentDate = () => {
  const now = new Date();
  const year = String(now.getFullYear());
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return { year, month, day };
};
