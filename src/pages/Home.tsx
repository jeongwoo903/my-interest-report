import * as XLSX from 'xlsx';
import { ChangeEvent, useState } from 'react';
import OpenAI from 'openai';

interface JsonDataProps {
  Date: Date;
  Message: string | null;
  User: string;
}

function getFile(event: ChangeEvent<HTMLInputElement>): File | null {
  return event.target.files?.[0] ?? null;
}

async function ExcelToJson(file: File): Promise<JsonDataProps[]> {
  const arrayBuffer = await file.arrayBuffer();
  const data = new Uint8Array(arrayBuffer);
  const workbook = XLSX.read(data, { type: 'array', cellDates: true });

  const firstSheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[firstSheetName];

  let jsonData: JsonDataProps[] = XLSX.utils.sheet_to_json(sheet);
  return jsonData;
}

function extractLinksByDate(jsonData: JsonDataProps[]): JsonDataProps[] {
  return jsonData.filter(item => {
    return (
      typeof item.Message === 'string' &&
      (item.Message.startsWith('https') || item.Message.startsWith('http'))
    );
  });
}

export default function Home() {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<string>('');

  function changeFile(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = getFile(event);
    setFile(selectedFile);
  }

  async function parseExcelFile(file: File) {
    if (!file) throw new Error('파일이 없습니다.');
    return await ExcelToJson(file);
  }

  function formatLinks(jsonData: JsonDataProps[]) {
    const linkData = extractLinksByDate(jsonData);
    return linkData.map(
      (item) => `Link: ${item.Message}`,
    ).join('\n');
  }

  async function analyzeLinksWithOpenAI(formattedLinks) {
    const openai = new OpenAI({
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        { role: 'system', content: '너는 유능한 데이터 분석가야. 데이터들을 관심사별로 알맞게 분석하는 역할을 해.' },
        {
          role: 'user', content: `
        해당 데이터는 사용자가 공유한 링크 목록이야. \n 
        각 목록들을 관심사 별로 구별해서 분류해줘. \n 
        응답은 json 형식으로 data를 category, count, links 형태로 각각 묶어서 전달해줘.
        데이터: ${formattedLinks}`,
        },
      ],
      temperature: 0.5,
    });

    return response.choices[0].message.content;
  }

  async function handleParse() {
    try {
      if (!file) return;

      const jsonData = await parseExcelFile(file);
      const formattedLinks = formatLinks(jsonData);
      console.log(formattedLinks);

      const analysisResult = await analyzeLinksWithOpenAI(formattedLinks);
      setData(analysisResult);
      console.log(analysisResult);

    } catch (error) {
      console.error('Error:', error);
    }
  }

  function handleStartDate(date: string) {
    // Todo: 날짜를 validate 하는 로직 필요
    setStartDate(date);
  }

  function handleEndDate(date: string) {
    // Todo: 날짜를 validate 하는 로직 필요
    setEndDate(date);
  }

  return (
    <>
      <input type="date" value={startDate} onChange={(e) => handleStartDate(e.target.value)} />
      <input type="date" value={endDate} onChange={(e) => handleEndDate(e.target.value)} />
      <input type="file" accept=".csv, .xlsx" onChange={changeFile} />
      <button onClick={handleParse} disabled={!file}>
        Parse Excel
      </button>
      <div>{data}</div>
    </>
  );
}


