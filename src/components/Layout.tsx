import { css, Theme } from '@emotion/react';
import { Outlet } from 'react-router-dom';
import Header from 'components/Header.tsx';
// import { scan } from 'react-scan';

// /** 개발용 react-scan 세팅 */
// if (typeof window !== 'undefined') {
//   scan({
//     enabled: true,
//     log: true, // logs render info to console (default: false)
//   });
// }

export default function Layout() {
  return (
    <section css={layoutCss}>
      <Header title={'📑 나의 관심사 분석기'} />
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
  height: 100dvh;
  background-color: ${theme.color.background};
`;

const mainCss = (theme: Theme) => css`
  width: 100%;
  height: 100%;
  background-color: ${theme.color.white};
`;
