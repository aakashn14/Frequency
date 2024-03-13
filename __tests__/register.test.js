import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import Register from '../app/register.js';

describe('Register', () => {
    test('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<Register />);
    
    // Check if the input fields and buttons are rendered correctly
    expect(getByPlaceholderText('Email ID')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Register')).toBeTruthy();
    expect(getByText('Already Registered?')).toBeTruthy();
  });

  test('navigates to HomePage when Register button is pressed', () => {
    const { getByText } = render(<Register />);
    
    fireEvent.press(getByText('Register')); // Simulate button press

    // Expect the navigation.replace function to be called with 'HomePage' as an argument
    expect(useNavigation().replace).toHaveBeenCalledWith('HomePage');
  });

  test('navigates to Login page when "Already Registered?" is pressed', () => {
    const { getByText } = render(<Register />);
    
    fireEvent.press(getByText('Login')); // Simulate button press

    // Expect the navigation.replace function to be called with 'index' as an argument
    expect(useNavigation().replace).toHaveBeenCalledWith('index');
  });

});