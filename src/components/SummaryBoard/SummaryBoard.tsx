import SummaryItem, { SummaryItemProps } from 'components/SummaryBoard/SummaryItem.tsx';
import { css, Theme } from '@emotion/react';

interface SummaryListProps {
  data: SummaryItemProps[];
}

export default function SummaryBoard({ data }: SummaryListProps) {
  return (
    <div css={SummaryBoardCss}>
      {data.map((item, index) => (
        <SummaryItem key={index} label={item.label} count={item.count} color={item.color} />
      ))}
    </div>
  );
}

const SummaryBoardCss = (theme: Theme) => css`
  display: flex;
  border-radius: 8px;
  box-shadow: 0 0 4px ${theme.color.boxShadow};
  background-color: ${theme.color.white};
`;
