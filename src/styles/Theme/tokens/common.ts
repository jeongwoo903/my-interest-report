import { css } from '@emotion/react';

const COMMON = Object.freeze({
  flex_center: css`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  flex_column: css`
    display: flex;
    flex-direction: column;
  `,
  drag_prevent: css`
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-use-select: none;
    user-select: none;

    -webkit-user-drag: none;
    user-drag: none;
  `,
});

export default COMMON;
