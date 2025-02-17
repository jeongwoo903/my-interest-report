import { ButtonHTMLAttributes, ReactNode } from 'react';
import { css, Theme } from '@emotion/react';
import { DateRange, isDateFormat } from 'utils/date.ts';

interface DateButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  value: DateRange;
  isSelected: boolean;
}

export default function DateButton({ children, value, isSelected, ...props }: DateButtonProps) {
  if (!isDateFormat(value[0]) || !isDateFormat(value[1])) {
    throw new Error('올바르지 않은 날짜 포맷입니다. YYYY-MM-DD 형식을 사용해 주세요.');
  }

  return (
    <button css={theme => DateButtonCss(theme, isSelected)} {...props}>
      {children}
    </button>
  );
}

const DateButtonCss = (theme: Theme, isSelected: boolean) => css`
  ${theme.typography.body3}
  padding: 9px 22px;
  text-wrap: nowrap;
  border-radius: 4px;
  box-shadow: 0 0 4px ${theme.color.boxShadow};
  background-color: ${isSelected ? theme.color.primary : theme.color.white};
  color: ${isSelected ? theme.color.white : theme.color.subText};

  &:hover {
    filter: brightness(97%);
  }
`;
