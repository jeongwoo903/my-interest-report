import { Routes } from './Routes';
import GlobalStyle from 'styles/GlobalStyle/GlobalStyle.tsx';
import { ThemeProvider } from '@emotion/react';
import THEME from 'styles/Theme/tokens/theme.ts';
import { FileProvider } from './contexts/FileContext.tsx';

function App() {
  return (
    <FileProvider>
      <ThemeProvider theme={THEME}>
        <GlobalStyle />
        <Routes />
      </ThemeProvider>
    </FileProvider>
  );
}

export default App;
