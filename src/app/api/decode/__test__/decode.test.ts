/* eslint-disable @typescript-eslint/no-explicit-any */
global.Request = class Request {
  constructor() {}
} as any;

import { POST } from '../route';
import { NextRequest, NextResponse } from 'next/server';

import { decodeBase62 } from '../../serverUtils';
import db from '../../db';

jest.mock('../../db', () => ({
  urls: {
    findUnique: jest.fn(),
  },
}));

jest.mock('../../serverUtils', () => ({
  decodeBase62: jest.fn(),
  get500ResponseBody: jest.fn((err) => ({
    message: err.message || 'Internal Server Error',
  })),
}));

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn(),
  },
}));

const createMockRequest = (body: any) =>
  ({
    json: () => Promise.resolve(body),
  } as NextRequest);

describe('POST /api/urls - URL Decoding', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockJson = jest.spyOn(NextResponse, 'json');
  it('should return 400 for missing shortUrl', async () => {
    await POST(createMockRequest({}));

    expect(mockJson).toHaveBeenCalledWith(
      { message: 'invalid URL' },
      { status: 400 }
    );
    expect(mockJson).toHaveBeenCalled();
  });

  it('should decode valid short URL and return long URL', async () => {
    const mockShortUrl = 'https://example.com/abc123';
    const mockDecodedId = 42;
    const mockLongUrl = 'https://original.com/long/path';

    (decodeBase62 as jest.Mock).mockReturnValue(mockDecodedId.toString());
    (db.urls.findUnique as jest.Mock).mockResolvedValue({
      id: mockDecodedId,
      longUrl: mockLongUrl,
    });

    const req = createMockRequest({ shortUrl: mockShortUrl });
    await POST(req);

    expect(decodeBase62).toHaveBeenCalledWith('abc123');
    expect(db.urls.findUnique).toHaveBeenCalledWith({
      where: { id: mockDecodedId },
    });
  });
});
