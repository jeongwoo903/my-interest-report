import { JsonDataProps } from 'utils/excelToJson.ts';
import { api } from 'apis/index.ts';

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
  const response = await api.post<ResultDataProps>('/api/analyze', {
    body: JSON.stringify(linkData),
  });

  return response;
}
