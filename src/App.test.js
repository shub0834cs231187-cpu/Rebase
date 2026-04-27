import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders 2026 calendar and switches months using buttons', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: /2026 calendar/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 2, name: /january/i })).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /next/i }));
  expect(screen.getByRole('heading', { level: 2, name: /february/i })).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /previous/i }));
  expect(screen.getByRole('heading', { level: 2, name: /january/i })).toBeInTheDocument();

  expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled();
});
