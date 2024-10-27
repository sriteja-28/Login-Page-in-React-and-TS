import React, { useState } from 'react';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const LoginContainer = styled.div<{ isMobile: boolean }>`
  padding: 2rem;
  width: ${(props) => (props.isMobile ? '90%' : '350px')};
  background: white;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 2rem;
  color: #333;
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
  background-color: #007bff;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Message = styled.div`
  margin-top: 1rem;
  font-size: 1rem;
  color: green;
`;

const Error = styled.div`
  color: red;
  margin-top: 0.5rem;
`;

type UserRole = 'Admin' | 'User' | 'Guest';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const handleLogin = () => {
    // Role-based authentication logic
    const users: Record<UserRole, string> = {
      Admin: 'johndoe@123',
      User: 'Nick@123',
      Guest: 'guest@123',
    };

    const role = Object.keys(users).find((role) => 
      username === role && password === users[role as UserRole]
    );

    if (role) {
      setSuccessMessage(`Login successful! Welcome, ${role}!`);
      setError('');
    } else {
      setSuccessMessage('');
      setError('Invalid username or password');
    }
  };

  return (
    <Wrapper>
      <LoginContainer isMobile={isMobile}>
        <Title>Login</Title>
        <Input
          type="text"
          placeholder="Username (Admin, User, Guest)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>Submit</Button>
        {error && <Error>{error}</Error>}
        {successMessage && <Message>{successMessage}</Message>}
      </LoginContainer>
    </Wrapper>
  );
};

export default LoginPage;
