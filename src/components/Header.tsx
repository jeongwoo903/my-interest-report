import { css, Theme } from '@emotion/react';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header css={headerCss}>
      <div css={containerCss}>
        <h3 css={titleCss}>{title}</h3>
      </div>
    </header>
  );
}

const headerCss = (theme: Theme) => css`
  background-color: ${theme.color.white};
  width: 100%;
  box-shadow: 0 1px 1px ${theme.color.boxShadow};
  z-index: 20;
`;

const containerCss = (theme: Theme) => css`
  display: flex;
  align-items: center;
  padding: 0.875rem 1rem;
  margin: 0 auto;
  max-width: ${theme.layout.header_width};
  height: 100%;
`;

const titleCss = (theme: Theme) => css`
  ${theme.typography.title1}
`;
