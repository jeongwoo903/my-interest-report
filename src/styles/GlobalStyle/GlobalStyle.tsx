import { css, Global } from '@emotion/react';
import { resetCss } from 'styles/GlobalStyle/reset.ts';

export default function GlobalStyle() {
  return <Global styles={globalCss} />;
}

const globalCss = () => css`
  ${resetCss}
  * {
    box-sizing: border-box;
    font-family:
      Pretendard,
      -apple-system,
      BlinkMacSystemFont,
      system-ui,
      Roboto,
      'Helvetica Neue',
      'Segoe UI',
      'Apple SD Gothic Neo',
      'Noto Sans KR',
      'Malgun Gothic',
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol',
      sans-serif;
    word-break: keep-all;
    word-wrap: break-word;

    -webkit-tap-highlight-color: rgba(0, 0, 0, 0); /* iOS Button Active */

    -ms-overflow-style: none;
    scrollbar-width: none;

    ::-webkit-scrollbar {
      display: none !important;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 1em;
    font-weight: normal;
    margin: 0;
  }
`;
