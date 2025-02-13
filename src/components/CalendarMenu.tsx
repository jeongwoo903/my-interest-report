import { css, Theme } from '@emotion/react';
import { useState } from 'react';
import THEME from 'styles/Theme/tokens/theme.ts';

interface CalendarMenuProps {
  isOpen: boolean;
}

export default function CalendarMenu({ isOpen }: CalendarMenuProps) {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  function handleStartDate(date: string) {
    // Todo: 날짜를 validate 하는 로직 필요
    setStartDate(date);
  }

  function handleEndDate(date: string) {
    // Todo: 날짜를 validate 하는 로직 필요
    setEndDate(date);
  }

  return (
    <div css={CalendarMenuCss(isOpen, THEME)}>
      <input type="date" value={startDate} onChange={e => handleStartDate(e.target.value)} />
      <input type="date" value={endDate} onChange={e => handleEndDate(e.target.value)} />
    </div>
  );
}

const CalendarMenuCss = (isOpen: boolean, theme: Theme) => css`
  position: absolute;
  top: 50px;
  left: -75px;
  width: 200px;
  height: auto;
  background-color: ${theme.color.white};
  box-shadow: 0 0 4px ${theme.color.boxShadow};
  border-radius: 4px;
  padding: 1rem;
  z-index: 10;

  transition:
    opacity 0.3s ease,
    transform 0.3s ease;

  opacity: ${isOpen ? 1 : 0};
  transform: translateY(${isOpen ? 0 : '-4px'});
  pointer-events: ${isOpen ? 'auto' : 'none'};
`;
