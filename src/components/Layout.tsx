import { css, Theme } from '@emotion/react';
import { Outlet } from 'react-router-dom';
import Header from 'components/Header.tsx';

export default function Layout() {
  return (
    <section css={layoutCss}>
      <Header>📑 나의 관심사 분석기</Header>
      <main css={mainCss}>
        <Outlet />
      </main>
    </section>
  );
}

const layoutCss = (theme: Theme) => css`
  ${theme.common.flex_center};
  flex-direction: column;
  width: 100%;
`;

const mainCss = (theme: Theme) => css`
  width: 100%;
  height: 100%;
  background-color: ${theme.color.white};
`;
