import { Suspense, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useFileUpload } from 'hooks/useFileUpload.ts';
import SectionHeader from 'components/SectionHeader.tsx';
import Space from 'components/Space.tsx';
import SummaryBoard from 'components/SummaryBoard/SummaryBoard.tsx';
import theme from 'styles/Theme/tokens/theme.ts';
import { css } from '@emotion/react';
import Tag from 'components/Tag.tsx';
import Card from 'components/Card.tsx';
import { getResultData, ResultDataProps } from 'apis/getResultData.ts';
import { extractLinksByDate } from 'utils/extractLinkByDate.ts';
import { wrapPromise } from 'utils/asyncHelper.ts';
import ResultContentLoading from 'components/ResultContentLoading.tsx';

export default function Result() {
  const { file, parseExcelFile } = useFileUpload();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const date = useMemo(() => {
    const encodedDate = searchParams.get('date');
    return encodedDate ? JSON.parse(decodeURIComponent(encodedDate)) : null;
  }, [location.search]);

  async function parseFile(file: File) {
    return parseExcelFile(file);
  }

  async function filterDataByDate(file: File, date: any) {
    const jsonData = await parseFile(file);
    return extractLinksByDate(jsonData, date);
  }

  async function getFinalResult(file: File, date: any) {
    const linkData = await filterDataByDate(file, date);
    return getResultData(linkData);
  }

  function fetchResult(file: File, date: any) {
    return wrapPromise(getFinalResult(file, date));
  }

  // Suspense 데이터 호출
  if (!file || !date) throw new Error('잘못된 방식으로 접근하셨습니다!');
  const resultData = fetchResult(file, date);

  return (
    <>
      <Suspense fallback={<ResultContentLoading />}>
        <ResultContent resultData={resultData} />
      </Suspense>
    </>
  );
}

interface ResultContentProps {
  resultData: { read(): ResultDataProps };
}

// 데이터가 로드된 후 렌더링할 컴포넌트
function ResultContent({ resultData }: ResultContentProps) {
  const result = resultData.read();

  const summaryBoardData = [
    { label: '조회된 링크 수', count: result?.total, color: theme.color.total },
    { label: '분석된 링크 수', count: result?.success, color: theme.color.success },
    { label: '실패한 링크 수', count: result?.failure, color: theme.color.failure },
  ];

  const tagMap = useMemo(() => {
    const map = new Map();
    result?.list.forEach(item => {
      item.tags.forEach(tag => {
        map.set(tag, (map.get(tag) || 0) + 1);
      });
    });
    return map;
  }, [result]);

  const tagList = useMemo(() => {
    const sortedList = [...tagMap.entries()]
      .map(([title, count]) => ({ title, count }))
      .sort((a, b) => b.count - a.count);

    const totalCount = sortedList.reduce((sum, item) => sum + item.count, 0);
    return [{ title: 'ALL', count: totalCount }, ...sortedList];
  }, [tagMap]);

  return (
    <div>
      <Space size={50} />

      <SectionHeader
        title={'📑 분석 결과'}
        desc={'당신의 카카오톡에 저장된 링크들을 분석해 관심사를 분류해봤어요!'}
      />

      <Space size={20} />

      <div css={SummaryBoardWrapperCss}>
        <SummaryBoard data={summaryBoardData} />
      </div>
      <Space size={40} />

      <div css={tagWrapperCss}>
        {tagList.map((item, index) => (
          <Tag key={index} title={item.title} count={item.count} />
        ))}
      </div>
      <Space size={20} />

      <div css={CardWrapperCss}>
        {result?.list?.map((item, index) => <Card key={index} item={item} />)}
      </div>
      <Space size={40} />
    </div>
  );
}

const SummaryBoardWrapperCss = css`
  max-width: 720px;
  padding: 0 0.625rem;
  margin: 0 auto;
`;

const tagWrapperCss = css`
  display: flex;
  flex-wrap: nowrap;
  gap: 8px;
  overflow: scroll;
  padding: 4px;
  max-width: 1320px;
  margin: 0 auto;
`;

const CardWrapperCss = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  max-width: 1360px;
  margin: 0 auto;
  justify-items: center;
  gap: 40px 0;
`;
