import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Register from '../app/register.js';

describe('Register', () => {
    test('renders without crashing', () => {
        render(<Register />);
    });

    test('allows typing in the email field', () => {
        const { getByPlaceholderText } = render(<Register />);
        const emailInput = getByPlaceholderText('Email ID');
        fireEvent.changeText(emailInput, 'test@example.com');
        expect(emailInput.props.value).toBe('test@example.com');
    });

    test('allows typing in the password field', () => {
        const { getByPlaceholderText } = render(<Register />);
        const passwordInput = getByPlaceholderText('Password');
        fireEvent.changeText(passwordInput, 'password123');
        expect(passwordInput.props.value).toBe('password123');
    });

    // Add more tests for interactions such as pressing the register button, etc.
});