import { JsonDataProps } from 'utils/excelToJson.ts';
import { DateRange } from 'utils/date.ts';

function filterByDate(jsonData: JsonDataProps[], dateRange: DateRange): JsonDataProps[] {
  const [startDate, endDate] = [new Date(dateRange[0]), new Date(dateRange[1])];

  return jsonData.filter(item => startDate <= item.Date && item.Date <= endDate);
}

function filterLinks(jsonData: JsonDataProps[]): JsonDataProps[] {
  return jsonData.filter(
    item =>
      typeof item.Message === 'string' &&
      (item.Message.startsWith('https') || item.Message.startsWith('http')),
  );
}

export function extractLinksByDate(
  jsonData: JsonDataProps[],
  dateRange: DateRange,
): JsonDataProps[] {
  const filteredByDate = filterByDate(jsonData, dateRange);
  return filterLinks(filteredByDate);
}
