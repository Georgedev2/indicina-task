'use client';
import { fireEvent, render, screen } from '@testing-library/react';
import SearchInput from '../SearchInput';
import '@testing-library/jest-dom';

describe('Search Input', () => {
  it('ensure the seearch input render properly', () => {
    render(<SearchInput placeholder="search" />);
    const searchInput = screen.getByTestId('search') as HTMLInputElement;

    expect(searchInput).toBeInTheDocument();
    expect(searchInput.placeholder).toBe('search');
  });

  it('should display what ever the user typed in', () => {
    render(<SearchInput placeholder="search" />);
    const searchInput = screen.getByTestId('search') as HTMLInputElement;

    expect(searchInput).toBeInTheDocument();
    expect(searchInput.placeholder).toBe('search');

    fireEvent.change(searchInput, {
      target: {
        value: '36x',
      },
    });
    expect(searchInput.value).toBe('36x');
  });
});
