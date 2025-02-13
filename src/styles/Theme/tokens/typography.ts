import { css } from '@emotion/react';

const TYPOGRAPHY = Object.freeze({
  // Display font styles
  display1: css`
    font-size: 50px;
    font-weight: 600;
    line-height: 140%;
  `,

  display2: css`
    font-size: 40px;
    font-weight: 600;
    line-height: 140%;
  `,

  // Headline font styles
  headline1: css`
    font-size: 32px;
    font-weight: 600;
    line-height: 140%;
  `,

  headline2: css`
    font-size: 26px;
    font-weight: 600;
    line-height: 140%;
  `,

  headline3: css`
    font-size: 24px;
    font-weight: 600;
    line-height: 140%;
  `,

  // Title font styles
  title1: css`
    font-size: 20px;
    font-weight: 600;
    line-height: 140%;
  `,

  title2: css`
    font-size: 18px;
    font-weight: 600;
    line-height: 140%;
  `,

  title3: css`
    font-size: 16px;
    font-weight: 600;
    line-height: 140%;
  `,

  // Body font styles
  body1: css`
    font-size: 18px;
    font-weight: normal;
    line-height: 135%;
  `,

  body2: css`
    font-size: 16px;
    font-weight: normal;
    line-height: 135%;
  `,

  body3: css`
    font-size: 14px;
    font-weight: normal;
    line-height: 135%;
  `,

  // Caption font styles
  caption1: css`
    font-size: 12px;
    font-weight: normal;
    line-height: 135%;
  `,
});

export default TYPOGRAPHY;
