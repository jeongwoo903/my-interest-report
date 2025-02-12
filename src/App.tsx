import { Routes } from './Routes';
import GlobalStyle from 'styles/GlobalStyle/GlobalStyle.tsx';
import { ThemeProvider } from '@emotion/react';
import THEME from 'styles/Theme/tokens/theme.ts';

function App() {
  return (
      <ThemeProvider theme={THEME}>
        <GlobalStyle />
        <Routes />
      </ThemeProvider>
  );
}

export default App;
