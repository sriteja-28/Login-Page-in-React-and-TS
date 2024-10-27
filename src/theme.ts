// src/theme.ts

import { DefaultTheme } from 'styled-components';

export const colorPalettes: { [key: string]: string } = {
  red: '#ff6347',
  blue: '#007bff',
  green: '#28a745',
};

// Define the DefaultTheme interface with theme properties
export const lightTheme: DefaultTheme = {
  background: '#ffffff',
  textColor: '#000000',
  buttonColor: '#6200ea',
  colorPalettes,
};

export const darkTheme: DefaultTheme = {
  background: '#121212',
  textColor: '#ffffff',
  buttonColor: '#bb86fc',
  colorPalettes,
};
