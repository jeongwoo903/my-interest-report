import { css, Theme } from '@emotion/react';

export interface TagProps {
  title: string;
  count: number;
  isActive?: boolean;
  onClick?: () => void;
}

export default function Tag({ title, count, isActive = false, onClick }: TagProps) {
  return (
    <button
      css={theme => TagCss(theme, isActive)}
      onClick={onClick}
      aria-pressed={isActive}
      role="switch"
    >
      {title} ({count})
    </button>
  );
}

const TagCss = (theme: Theme, isActive: boolean) => css`
  ${theme.typography.body3};
  font-weight: 600;
  background-color: ${isActive ? theme.color.primary : theme.color.white};
  box-shadow: 0 0 4px ${theme.color.boxShadow};
  padding: 0.438rem 1.25rem;
  border-radius: 30px;
  color: ${isActive ? theme.color.white : theme.color.subText};
  cursor: pointer;
  text-wrap: nowrap;
  transition:
    background-color 0.2s,
    color 0.2s;
`;
