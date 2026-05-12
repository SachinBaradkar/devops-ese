import { render, screen } from '@testing-library/react';
import App from './App';

test('renders navbar logo', () => {
  render(<App />);
  const logo = screen.getByText(/ReactApp/i);
  expect(logo).toBeInTheDocument();
});
