import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoginPage from './LoginPage';

describe('LoginPage Component', () => {
  it('renders correctly', () => {
    render(<LoginPage />);
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('displays error with incorrect credentials', () => {
    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText('Username (Admin, User, Guest)'), { target: { value: 'wrong' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'credentials' } });
    fireEvent.click(screen.getByText('Submit'));

    expect(screen.getByText('Invalid username or password')).toBeInTheDocument();
  });

  it('displays success message with correct credentials for Admin', () => {
    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText('Username (Admin, User, Guest)'), { target: { value: 'Admin' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'johndoe@123' } });
    fireEvent.click(screen.getByText('Submit'));

    expect(screen.getByText('Login successful! Welcome, Admin!')).toBeInTheDocument();
  });

  it('displays success message with correct credentials for User', () => {
    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText('Username (Admin, User, Guest)'), { target: { value: 'User' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Nick@123' } });
    fireEvent.click(screen.getByText('Submit'));

    expect(screen.getByText('Login successful! Welcome, User!')).toBeInTheDocument();
  });

  it('displays success message with correct credentials for Guest', () => {
    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText('Username (Admin, User, Guest)'), { target: { value: 'Guest' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'guest@123' } });
    fireEvent.click(screen.getByText('Submit'));

    expect(screen.getByText('Login successful! Welcome, Guest!')).toBeInTheDocument();
  });
});
