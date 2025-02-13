import CalendarIcon from 'assets/svg/calendar-icon.svg?react';
import { css, Theme } from '@emotion/react';
import { useReducer } from 'react';
import CalendarMenu from 'components/CalendarMenu.tsx';

export default function Calendar() {
  const [isOpen, toggleIsOpen] = useReducer(state => {
    return !state;
  }, false);

  return (
    <div css={CalendarWrapper}>
      <button css={CalendarCss} onClick={toggleIsOpen}>
        <CalendarIcon />
      </button>

      <CalendarMenu isOpen={isOpen} />
    </div>
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

const CalendarWrapper = () => css`
  position: relative;
  display: inline-block;
`;
