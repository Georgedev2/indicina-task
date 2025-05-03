'use client';
import { render, screen } from '@testing-library/react';
import URLCard from '../URLCard'; 
import '@testing-library/jest-dom';
import { IurlDetail } from '@/app/components/type';

const mockUrlDetail: Partial<IurlDetail> = {
  shortURL: 'short.ly/abc123',
  LongUrl: 'https://example.com/full-url',
  created: Date.now(),
  clicks: 1026,
};

describe('URLCard Component', () => {
  it('renders short and long URLs', () => {
    render(<URLCard urlDetail={mockUrlDetail} />);
    expect(
      screen.getByText(mockUrlDetail.shortURL as string)
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockUrlDetail.LongUrl as string)
    ).toBeInTheDocument();
  });

  it('renders the "Tracking Disabled" and time text', () => {
    render(<URLCard urlDetail={mockUrlDetail} />);
    const visits = screen.getByTestId('clicks');
    expect(visits).toBeInTheDocument();
    expect(visits.textContent).toBe('1026 visits');
    expect(screen.getByTestId('created')).toHaveTextContent('just now');
  });

  it('renders external link with correct href', () => {
    render(<URLCard urlDetail={mockUrlDetail} />);
    expect(screen.getByTestId('tolongUrl')).toHaveAttribute(
      'href',
      mockUrlDetail?.LongUrl
    );
  });
});
