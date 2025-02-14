import { css, Theme } from '@emotion/react';
import CalendarIcon from 'assets/svg/calendar-icon.svg?react';
import { ActionDispatch, ButtonHTMLAttributes } from 'react';

interface CalendarButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  clickEvent: ActionDispatch<[]>;
}

export default function CalendarButton({ clickEvent, ...props }: CalendarButtonProps) {
  return (
    <button css={CalendarCss} onClick={clickEvent} {...props}>
      <CalendarIcon />
    </button>
  );
}

const CalendarCss = (theme: Theme) => css`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  box-shadow: 0 0 4px ${theme.color.boxShadow};
  background-color: ${theme.color.white};

  &:hover {
    filter: brightness(97%);
  }
`;
