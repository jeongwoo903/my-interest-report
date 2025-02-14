import { css } from '@emotion/react';
import { ReactNode } from 'react';

interface CalendarProps {
  children: ReactNode;
}

export default function Calendar({ children }: CalendarProps) {
  return <div css={CalendarWrapper}>{children}</div>;
}

const CalendarWrapper = () => css`
  position: relative;
  display: inline-block;
`;
