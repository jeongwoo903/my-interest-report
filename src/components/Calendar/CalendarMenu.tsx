import { css, Theme } from '@emotion/react';
import { ReactNode } from 'react';

interface CalendarMenuProps {
  children: ReactNode;
  isOpen: boolean;
}

export default function CalendarMenu({ children, isOpen }: CalendarMenuProps) {
  return <div css={theme => CalendarMenuCss(isOpen, theme)}>{children}</div>;
}

const CalendarMenuCss = (isOpen: boolean, theme: Theme) => css`
  display: flex;
  gap: 0.5rem;
  position: absolute;
  top: 50px;
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
  transform: translateX(-75%) translateY(${isOpen ? 0 : '-4px'});
  pointer-events: ${isOpen ? 'auto' : 'none'};
`;
