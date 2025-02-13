import '@emotion/react';
import THEME from 'styles/Theme/tokens/theme.ts';

type CustomThemeType = typeof THEME;

declare module '@emotion/react' {
  export interface Theme extends CustomThemeType {}
}
