import { ReactNode } from 'react';
import { css, Theme } from '@emotion/react';

interface HashtagProps {
  children: ReactNode;
}

export default function Hashtag({ children }: HashtagProps) {
  return <span css={hashtagCss}># {children}</span>;
}

const hashtagCss = (theme: Theme) => css`
  ${theme.typography.caption1};
  color: ${theme.color.subText};
  padding: 0.125rem 0.25rem;
  box-shadow: 0 0 2px ${theme.color.boxShadow};
  border-radius: 2px;
`;
