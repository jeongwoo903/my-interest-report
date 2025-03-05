import { JsonDataProps } from 'utils/excelToJson.ts';
import { api } from 'apis/index.ts';

export interface ResultDataProps {
  total: number;
  success: number;
  failure: number;
  list: ItemProps[];
}

export interface ItemProps {
  tags: string[];
  url: string;
  title: string;
  date: Date;
  status: 'success' | 'failure';
  content?: string;
  thumbnail?: string;
}

export async function getResultData(linkData: JsonDataProps[]): Promise<ResultDataProps> {
  const response = await api.post<ResultDataProps>('/api/analyze', {
    body: JSON.stringify(linkData),
  });

  return response;
}
