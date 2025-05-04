/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { APP_NAME } from '@/app/globalConstant';
import { MY_URLS_PAGE } from '@/app/urlPath';
import '@testing-library/jest-dom';
import Header from '..';

jest.mock('next/link', function () {
    return ({ href, children, className }:any) => (
      <a href={href} className={className}>
        {children}
      </a>
    );
  });

describe('Header', () => {
  it('renders the logo and navigates to home', () => {
    render(<Header />);
    const logoLink = screen.getByRole('link', { name: APP_NAME });

    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('renders the My URLs link', () => {
    render(<Header />);
    const myUrlsLink = screen.getByRole('link', { name: 'My URLs' });

    expect(myUrlsLink).toBeInTheDocument();
    expect(myUrlsLink).toHaveAttribute('href', MY_URLS_PAGE);
  });
});
