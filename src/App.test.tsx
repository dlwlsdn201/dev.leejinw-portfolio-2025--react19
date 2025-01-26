import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test } from '@jest/globals';
import App from './App';

describe('App', () => {
  test('renders Vite and React logos', () => {
    render(<App />);
    const viteLogo = screen.getByAltText('Vite logo');
    const reactLogo = screen.getByAltText('React logo');
    expect(viteLogo).toBeInTheDocument();
    expect(reactLogo).toBeInTheDocument();
  });

  test('renders title', () => {
    render(<App />);
    const titleElement = screen.getByText('Vite + React');
    expect(titleElement).toBeInTheDocument();
  });

  test('increments count when button is clicked', () => {
    render(<App />);
    const button = screen.getByText('count is 0');
    fireEvent.click(button);
    expect(screen.getByText('count is 1')).toBeInTheDocument();
  });

  test('renders instruction text', () => {
    render(<App />);
    const instructionText = screen.getByText(/Edit/i);
    expect(instructionText).toBeInTheDocument();
  });
});
