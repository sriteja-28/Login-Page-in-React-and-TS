// src/components/LoginPage.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '../App';
import { colorPalettes } from '../theme';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { toggleTheme, changeColorPalette, themeType } = useTheme();

  const handleLogin = async () => {
    setError('');
    setSuccessMessage('');
    setLoading(true);

    // Simulate a login delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (
      (username === 'Admin' && password === 'johndoe@123') ||
      (username === 'User' && password === 'Nick@123') ||
      (username === 'Guest' && password === 'guest@123')
    ) {
      setSuccessMessage(`Login successful! Welcome, ${username}`);
    } else {
      setError('Invalid username or password');
    }

    setLoading(false);
  };

  return (
    <PageContainer>
      <Container>
        <Title>Login</Title>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button onClick={handleLogin} disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </Button>
        {error && <Error>{error}</Error>}
        {successMessage && <Success>{successMessage}</Success>}

        {/* Theme Toggle Button */}
        <ThemeButton onClick={toggleTheme}>
          Switch to {themeType === 'light' ? 'Dark' : 'Light'} Theme
        </ThemeButton>

        {/* Color Palette Selector */}
        <PaletteContainer>
          {Object.entries(colorPalettes).map(([name, color]) => (
            <ColorButton
              key={name}
              style={{ backgroundColor: color }}
              onClick={() => changeColorPalette(color)}
            >
              {name}
            </ColorButton>
          ))}
        </PaletteContainer>
      </Container>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: ${(props) => props.theme.background};
`;

const Container = styled.div`
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.textColor};
  padding: 2rem;
  width: 350px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const Title = styled.h2`
  color: ${({ theme }) => (theme.background === '#121212' ? 'white' : 'black')};
  font-size: 24px;
  margin: 0;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin: 0.5rem 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  margin-top: 1rem;
  background-color: ${(props) => props.theme.buttonColor};
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  transition: background-color 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const Error = styled.div`
  color: red;
  margin-top: 0.5rem;
`;

const Success = styled.div`
  color: green;
  margin-top: 0.5rem;
`;

const ThemeButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  background-color: ${(props) => props.theme.buttonColor};
  color: white;
`;

const PaletteContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const ColorButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: inline-block;
`;

export default LoginPage;
