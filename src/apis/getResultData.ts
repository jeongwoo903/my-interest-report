import { JsonDataProps } from 'utils/excelToJson.ts';
import { api } from 'apis/index.ts';
import { makeThrower } from 'utils/asyncHelper.ts';

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
  thumbnail?: any;
}

export async function getResultData(linkData: JsonDataProps[]): Promise<ResultDataProps> {
  const response = await api.post<ResultDataProps>('/api/analyze', {
    body: JSON.stringify(linkData),
  });

  return response;
}

export function loadResultData(linkData: JsonDataProps[]) {
  const promise = getResultData(linkData);
  return makeThrower<ResultDataProps>(promise);
}
