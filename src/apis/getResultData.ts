import { JsonDataProps } from 'utils/excelUtils.ts';

export interface ResultDataProps {
  total: number;
  success: number;
  failure: number;
  list: ListProps[];
}

interface ListProps {
  content: string;
  hashtags: string[];
  status: 'success' | 'failure';
  title: string;
  url: string;
}

export async function getResultData(linkData: JsonDataProps[]): Promise<ResultDataProps> {
  const response = await fetch('http://localhost:3000/api/urls/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(linkData),
  });

  return await response.json();
}
