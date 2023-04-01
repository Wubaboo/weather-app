import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const zipCodeInput = screen.getByPlaceholderText(/enter zip code/i);
  expect(zipCodeInput).toBeInTheDocument();
});
