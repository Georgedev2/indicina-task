/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchInput from '../SearchInput';
import { useRouter } from 'next/navigation';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock icons
jest.mock('../../../assets/', () => ({
  icons: {
    SearchIcon: (props: any) => (
      <div data-testid="search-icon" {...props}>
        🔍
      </div>
    ),
    SendIcon: (props: any) => (
      <div data-testid="send-icon" {...props}>
        📤
      </div>
    ),
  },
}));

describe('SearchInput', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('ensure the seearch input render properly', () => {
    const placeholderText= 'Search ...'
    render(<SearchInput placeholder={placeholderText} />);
    const searchInput = screen.getByTestId('search') as HTMLInputElement;

    expect(searchInput).toBeInTheDocument();
    expect(searchInput.placeholder).toBe(placeholderText);

    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute('placeholder', placeholderText);
  });

  it('should display what ever the user typed in', () => {
    render(<SearchInput />);
    const input = screen.getByTestId('search');

    fireEvent.change(input, { target: { value: 'hello' } });
    expect(input).toHaveValue('hello');
  });

  it('adds active-border class on focus and removes it on blur', () => {
    const { container } = render(<SearchInput />);
    const input = screen.getByTestId('search');
    const form = container.querySelector('form');

    fireEvent.focus(input);
    expect(form?.className).toContain('active-border');

    fireEvent.blur(input);
    expect(form?.className).not.toContain('active-border');
  });

  it('shows send icon and triggers router.push on click', () => {
    render(<SearchInput />);
    const input = screen.getByTestId('search');

    fireEvent.change(input, { target: { value: 'test' } });
    const button = screen.getByTestId('send-btn');

    expect(screen.getByTestId('send-icon')).toBeInTheDocument();

    fireEvent.click(button);
    expect(pushMock).toHaveBeenCalledWith('?search=test');
  });
});
