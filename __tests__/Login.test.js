import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Login from '../app/Login.js';

describe('Login', () => {
    it('renders correctly', () => {
    const { getByText } = render(<Login />);

    // Test if "Login" text is rendered
    expect(getByText).toBeTruthy();
  });

    // Add more tests for interactions such as pressing the login button, etc.
});