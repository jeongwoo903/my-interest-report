import { css, Theme } from '@emotion/react';

interface TitleProps {
  title: string;
  desc: string;
}

export default function SectionHeader({ title, desc }: TitleProps) {
  return (
    <div css={titleCss}>
      <h1>{title}</h1>
      <h2>{desc}</h2>
    </div>
  );
}

const titleCss = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  width: 100%;

  > h1 {
    ${theme.typography.display2};
    color: ${theme.color.black};
  }

  > h2 {
    ${theme.typography.headline3};
    color: ${theme.color.subText};
    font-weight: 400;
  }
`;
