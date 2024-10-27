// src/components/LoginPage.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoginPage from './LoginPage';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../theme'; // Ensure this path is correct
import { useTheme } from '../App';
import { DefaultTheme } from 'styled-components';

// Mocking useTheme hook to control theme functions
jest.mock('../App', () => ({
  useTheme: jest.fn(),
}));

describe('LoginPage Component', () => {
  const mockToggleTheme = jest.fn();
  const mockChangeColorPalette = jest.fn();

  // Explicitly typing the theme parameter here
  const renderWithTheme = (theme: DefaultTheme) => // Use DefaultTheme for typing
    render(
      <ThemeProvider theme={theme}>
        <LoginPage />
      </ThemeProvider>
    );

  beforeEach(() => {
    (useTheme as jest.Mock).mockReturnValue({
      toggleTheme: mockToggleTheme,
      changeColorPalette: mockChangeColorPalette,
      themeType: 'light',
    });
  });

  it('renders correctly', () => {
    renderWithTheme(lightTheme);
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('displays error with incorrect credentials', () => {
    renderWithTheme(lightTheme);

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'wrong' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'credentials' } });
    fireEvent.click(screen.getByText('Submit'));

    expect(screen.getByText('Invalid username or password')).toBeInTheDocument();
  });

  it('displays success message with correct credentials for Admin', () => {
    renderWithTheme(lightTheme);

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'Admin' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'johndoe@123' } });
    fireEvent.click(screen.getByText('Submit'));

    expect(screen.getByText('Login successful! Welcome, Admin')).toBeInTheDocument();
  });

  it('displays success message with correct credentials for User', () => {
    renderWithTheme(lightTheme);

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'User' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Nick@123' } });
    fireEvent.click(screen.getByText('Submit'));

    expect(screen.getByText('Login successful! Welcome, User')).toBeInTheDocument();
  });

  it('displays success message with correct credentials for Guest', () => {
    renderWithTheme(lightTheme);

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'Guest' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'guest@123' } });
    fireEvent.click(screen.getByText('Submit'));

    expect(screen.getByText('Login successful! Welcome, Guest')).toBeInTheDocument();
  });

  it('toggles theme between light and dark', () => {
    renderWithTheme(lightTheme);

    const themeToggleButton = screen.getByText(/Switch to Dark Theme/i);
    fireEvent.click(themeToggleButton);

    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

  it('changes color palette on button click', () => {
    renderWithTheme(lightTheme);

    const colorButton = screen.getByText('Blue'); // Assuming "Blue" is one of the color palettes
    fireEvent.click(colorButton);

    expect(mockChangeColorPalette).toHaveBeenCalledWith(expect.any(String)); // Mock with any color value
  });
});
