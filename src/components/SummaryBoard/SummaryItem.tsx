import { css, Theme } from '@emotion/react';

export interface SummaryItemProps {
  label: string;
  color: string;
  count: number | undefined;
}

export default function SummaryItem({ label, count, color }: SummaryItemProps) {
  return (
    <div css={SummaryItemCss}>
      <div css={labelCss}>{label}</div>
      <div css={theme => countCss(theme, color)}>{count ?? 0}</div>
    </div>
  );
}

const SummaryItemCss = css`
  flex: 1;
  padding: 0.625rem 1rem;
  border-left: 1px solid #e0e0e0;

  &:first-of-type {
    border-left: none;
  }
`;

const labelCss = (theme: Theme) => css`
  ${theme.typography.body3}
  color: ${theme.color.subText};
`;

const countCss = (theme: Theme, color: string) => css`
  ${theme.typography.title1}
  font-weight: 600;
  color: ${color};
`;
