import { ButtonHTMLAttributes, ReactNode } from 'react';
import { css, Theme } from '@emotion/react';

interface DateButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  value: string;
  isSelected: boolean;
}

export default function DateButton({ children, value, isSelected, ...props }: DateButtonProps) {
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
