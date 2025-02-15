import * as XLSX from 'xlsx';

export interface JsonDataProps {
  Date: Date;
  Message: string | null;
  User: string;
}

export async function ExcelToJson(file: File): Promise<JsonDataProps[]> {
  const arrayBuffer = await file.arrayBuffer();
  const data = new Uint8Array(arrayBuffer);
  const workbook = XLSX.read(data, { type: 'array', cellDates: true });

  const firstSheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[firstSheetName];

  const jsonData: JsonDataProps[] = XLSX.utils.sheet_to_json(sheet);
  return jsonData;
}

export function extractLinksByDate(jsonData: JsonDataProps[], date: string[]): JsonDataProps[] {
  const [startDate, endDate] = [new Date(date[0]), new Date(date[1])];

  const extractByDate = jsonData.filter(item => {
    return startDate <= item.Date && item.Date <= endDate;
  });

  const extractLinkData = extractByDate.filter(item => {
    return (
      typeof item.Message === 'string' &&
      (item.Message.startsWith('https') || item.Message.startsWith('http'))
    );
  });

  return extractLinkData;
}
