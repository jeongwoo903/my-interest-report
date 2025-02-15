export default function formatDate() {
  const now = new Date();
  const year = String(now.getFullYear());
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  const getXMonthsAgo = (months: number) => {
    const date = new Date(now);
    date.setMonth(date.getMonth() - months);
    return date.toISOString().slice(0, 10);
  };

  const formatYYYYMMDD = (date: Date) => {
    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  return { year, month, day, getXMonthsAgo, formatYYYYMMDD };
}
