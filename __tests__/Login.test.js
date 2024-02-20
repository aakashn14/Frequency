import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Login from '../app/index.js';

describe('Login', () => {
    test('renders without crashing', () => {
        render(<Login />);
    });

    test('allows typing in the email field', () => {
        const { getByPlaceholderText } = render(<Login />);
        const emailInput = getByPlaceholderText('Email ID');
        fireEvent.changeText(emailInput, 'test@example.com');
        expect(emailInput.props.value).toBe('test@example.com');
    });

    test('allows typing in the password field', () => {
        const { getByPlaceholderText } = render(<Login />);
        const passwordInput = getByPlaceholderText('Password');
        fireEvent.changeText(passwordInput, 'password123');
        expect(passwordInput.props.value).toBe('password123');
    });

    // Add more tests for interactions such as pressing the login button, etc.
});