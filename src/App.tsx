// src/App.tsx
import React, { useState, createContext, useContext } from 'react';
import { ThemeProvider } from 'styled-components';
import LoginPage from './components/LoginPage';
import { lightTheme, darkTheme, colorPalettes } from './theme';

const ThemeContext = createContext<any>(null);

export const useTheme = () => useContext(ThemeContext);

const App: React.FC = () => {
  const [theme, setTheme] = useState(lightTheme);
  const [themeType, setThemeType] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
    setThemeType(themeType === 'light' ? 'dark' : 'light');
  };

  const changeColorPalette = (color: string) => {
    setTheme((prevTheme) => ({
      ...prevTheme,
      buttonColor: color,
    }));
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, changeColorPalette, themeType }}>
      <ThemeProvider theme={theme}>
        <LoginPage />
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default App;
