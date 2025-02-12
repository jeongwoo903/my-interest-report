import { css } from '@emotion/react';

const VARS = {
  main_width: '768px',
  main_height: '100dvh',
  header_height: '60px',
};

const LAYOUT = Object.freeze({
  main: css`
    width: ${VARS.main_width};
    height: ${VARS.main_height};
  `
});

export default LAYOUT;
