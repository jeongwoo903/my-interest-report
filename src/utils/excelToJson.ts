import * as XLSX from 'xlsx';

export interface JsonDataProps {
  Date: Date;
  Message: string | null;
  User: string;
}

// 파일을 ArrayBuffer로 변환
async function fileToArrayBuffer(file: File): Promise<ArrayBuffer> {
  return await file.arrayBuffer();
}

// ArrayBuffer를 엑셀 Workbook으로 변환
function arrayBufferToWorkbook(arrayBuffer: ArrayBuffer): XLSX.WorkBook {
  const data = new Uint8Array(arrayBuffer);
  return XLSX.read(data, { type: 'array', cellDates: true });
}

// Workbook에서 첫 번째 시트를 JSON 데이터로 변환
function workbookToJson(workbook: XLSX.WorkBook): JsonDataProps[] {
  const firstSheetName = workbook.SheetNames[0];

  if (!firstSheetName) {
    throw new Error('엑셀 파일에 시트가 없습니다.');
  }

  const sheet = workbook.Sheets[firstSheetName];
  return XLSX.utils.sheet_to_json(sheet);
}

export async function excelToJson(file: File): Promise<JsonDataProps[]> {
  try {
    const arrayBuffer = await fileToArrayBuffer(file);
    const workbook = arrayBufferToWorkbook(arrayBuffer);
    return workbookToJson(workbook);
  } catch (error) {
    console.error('엑셀 파일 파싱 중 오류 발생:', error);
    throw new Error('엑셀 파일 파싱에 실패했습니다.');
  }
}
