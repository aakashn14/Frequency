import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomePage from '../app/HomePage.js';
import { useNavigation } from 'expo-router'; // Import the useNavigation hook

describe('HomePage component', () => {
  test('renders correctly', () => {

    const { getByText } = render(<HomePage />);
    
    // Check if the text and button are rendered correctly
    expect(getByText('Discover new tracks,')).toBeTruthy();
    expect(getByText('Save albums and songs you love .')).toBeTruthy();
    expect(getByText('Chat and share your tunes with friends.')).toBeTruthy();
    expect(getByText('FEEL THE MUSIC')).toBeTruthy();
  });

  test('navigates to TabsRedirect when "FEEL THE MUSIC" button is pressed', () => {

    const { getByText } = render(<HomePage />);

    fireEvent.press(getByText('FEEL THE MUSIC')); // Simulate button press

    // Expect the navigation.replace function to be called with 'TabsRedirect' as an argument
    expect(navigation.replace).toHaveBeenCalledWith('TabsRedirect');
  });
});