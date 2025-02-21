import { extractLinksByDate } from 'utils/extractLinkByDate.ts';
import { loadResultData, ResultDataProps } from 'apis/getResultData.ts';
import { useFileUpload } from 'hooks/useFileUpload.ts';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SectionHeader from 'components/SectionHeader.tsx';
import Space from 'components/Space.tsx';
import SummaryBoard from 'components/SummaryBoard/SummaryBoard.tsx';
import { SummaryItemProps } from 'components/SummaryBoard/SummaryItem.tsx';
import theme from 'styles/Theme/tokens/theme.ts';
import { css } from '@emotion/react';
import Tag, { TagProps } from 'components/Tag.tsx';
import Card from 'components/Card.tsx';

export default function Result() {
  const { file, parseExcelFile } = useFileUpload();
  const [result, setResult] = useState<ResultDataProps | null>(null);
  const [activeTag, setActiveTag] = useState<string>('ALL');

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const date = useMemo(() => {
    const encodedDate = searchParams.get('date');
    return encodedDate ? JSON.parse(decodeURIComponent(encodedDate)) : null;
  }, [location.search]);

  useEffect(() => {
    (async () => {
      try {
        if (!file || !date) return;

        const jsonData = await parseExcelFile(file);
        const linkData = extractLinksByDate(jsonData, date);

        const resultData = loadResultData(linkData);
        setResult(resultData);
      } catch (error) {
        console.error('Error:', error);
      }
    })();
  }, [file]);

  const summaryBoardData: SummaryItemProps[] = useMemo(
    () => [
      { label: '조회된 링크 수', count: result?.total, color: theme.color.total },
      { label: '분석된 링크 수', count: result?.success, color: theme.color.success },
      { label: '실패한 링크 수', count: result?.failure, color: theme.color.failure },
    ],
    [result],
  );

  const tagMap: Map<string, number> = useMemo(() => {
    const map = new Map();

    result?.list.forEach(item => {
      item.tags.forEach(tag => {
        map.set(tag, (map.get(tag) || 0) + 1);
      });
    });

    return map;
  }, [result]);

  const tagList: TagProps[] = useMemo(() => {
    const sortedList = [...tagMap.entries()]
      .map(([title, count]) => ({ title, count }))
      .sort((a, b) => b.count - a.count);

    const totalCount = sortedList.reduce((sum, item) => sum + item.count, 0);
    return [{ title: 'ALL', count: totalCount }, ...sortedList];
  }, [tagMap]);

  return (
    <>
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
        {tagList.map((item, index) => {
          return (
            <Tag
              key={index}
              title={item.title}
              count={item.count}
              isActive={activeTag === item.title}
              onClick={() => setActiveTag(item.title)}
            />
          );
        })}
      </div>

      <Space size={20} />
      <div css={CardWrapperCss}>
        {result?.list?.map((item, index) => {
          const isVisible = activeTag === 'ALL' || item.tags.includes(activeTag);

          if (isVisible) {
            return <Card key={index} item={item} />;
          }

          return null;
        })}
      </div>

      <Space size={40} />
    </>
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
