/* eslint-disable @typescript-eslint/no-explicit-any */

global.Request = class Request {
  constructor() {}
} as any;


import { GET } from '../route';
import { NextResponse } from 'next/server';
import db from '../../db';
import { decodeBase62 } from '../../serverUtils';

jest.mock('../../serverUtils', () => ({
  decodeBase62: jest.fn(),
  get500ResponseBody: jest.fn((err) => ({
    message: err.message || 'Internal Server Error',
  })),
}));

jest.mock('../../db', () => ({
  urls: {
    findUnique: jest.fn(),
    update: jest.fn(),
  },
}));

jest.mock('next/server', () => ({
  NextResponse: {
    json: () => jest.fn(),
    redirect:() => jest.fn(),
  },
}));

describe('GET handler', () => {
  const mockRedirect = jest.spyOn(NextResponse, 'redirect');
  const mockJson = jest.spyOn(NextResponse, 'json');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns 400 if shortUrlId is missing', async () => {
    await GET({} as any, { params: Promise.resolve({ shortUrlId: '' }) });
    expect(mockJson).toHaveBeenCalledWith(
      { message: 'invalid URL' },
      { status: 400 }
    );
  });

  it('returns 404 if URL is not found', async () => {
    (decodeBase62 as jest.Mock).mockReturnValue(123);
    (db.urls.findUnique as jest.Mock).mockResolvedValue(null);

    await GET({} as any, { params: Promise.resolve({ shortUrlId: 'abc' }) });

    expect(decodeBase62).toHaveBeenCalledWith('abc');
    expect(db.urls.findUnique).toHaveBeenCalledWith({ where: { id: 123 } });
    expect(mockJson).toHaveBeenCalledWith(
      { message: 'Not found' },
      { status: 404 }
    );
  });

  it('redirects to the long URL if found', async () => {
    (decodeBase62 as jest.Mock).mockReturnValue(123);
    (db.urls.findUnique as jest.Mock).mockResolvedValue({
      longUrl: 'https://example.com',
    });

    await GET({} as any, { params: Promise.resolve({ shortUrlId: 'abc' }) });

    expect(db.urls.update).toHaveBeenCalledWith({
      where: { id: 123 },
      data: { visits: { increment: 1 } },
    });
    expect(mockRedirect).toHaveBeenCalledWith('https://example.com');
  });

  it('returns 500 if there is an error', async () => {
    (decodeBase62 as jest.Mock).mockImplementation(() => {
      throw new Error('Oops');
    });

    await GET({} as any, { params: Promise.resolve({ shortUrlId: 'abc' }) });

    expect(mockJson).toHaveBeenCalledWith({ message: 'Oops' }, { status: 500 });
  });
});
