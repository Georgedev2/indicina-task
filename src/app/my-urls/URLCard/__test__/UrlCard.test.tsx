'use client';
import { render, screen } from '@testing-library/react';
import URLCard from '../URLCard';
import '@testing-library/jest-dom';
import { IurlDetail } from '@/app/types';


const mockUrlDetail: Partial<IurlDetail> = {
  shortUrl: 'short.ly/abc123',
  longUrl: 'https://example.com/full-url',
  createdAt: new Date(),
  visits:1026,
};

describe('URLCard Component', () => {
  it('renders short and long URLs', () => {
    render(<URLCard urlDetail={mockUrlDetail} />);
    expect(
      screen.getByText(mockUrlDetail.shortUrl as string)
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockUrlDetail.longUrl as string)
    ).toBeInTheDocument();
  });

  it('renders the "Tracking Disabled" and time text', () => {
    render(<URLCard urlDetail={mockUrlDetail} />);
    const visits = screen.getByTestId('clicks');
    expect(visits).toBeInTheDocument();
    expect(visits.textContent).toBe('1026 visits');
    expect(screen.getByTestId('created')).toHaveTextContent('just now');
  });

});
