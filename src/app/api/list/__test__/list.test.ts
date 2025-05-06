/* eslint-disable @typescript-eslint/no-explicit-any */
global.Request = class Request {
  constructor() {}
} as any;

global.Response = class {
  body: any;
  status: number;

  constructor(body: any, init?: any) {
    this.body = body;
    this.status = init?.status || 200;
  }

  json() {
    return Promise.resolve(this.body);
  }
} as any;

import { GET } from '../route';
import { NextRequest, NextResponse } from 'next/server';
import db from '../../db';

jest.mock('../../db', () => ({
  urls: {
    findUnique: jest.fn(),
    update: jest.fn(),
    findMany: jest.fn(),
  },
}));
jest.mock('../../serverUtils', () => ({
  get500ResponseBody: jest.fn(() => ({ message: 'Internal server error' })),
}));

jest.mock('next/server', () => ({
  NextResponse: {
    json: () => jest.fn(),
    redirect: () => jest.fn(),
  },
}));

describe('GET handler', () => {
  const mockJson = jest.spyOn(NextResponse, 'json');
  const mockSearchParams = new URLSearchParams();
  jest.mock('next/server', () => ({
    NextRequest: {
      nextUrl: {
        searchParams: mockSearchParams,
      },
    },
  }));

  const createRequest = (query = '') => {
    const url = new URL(`http://localhost/?search=${query}`);
    return {
      nextUrl: {
        searchParams: url.searchParams,
      },
    } as unknown as NextRequest;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (Response.json as any) = jest.fn((data) => ({
      json: mockJson,
      ...data,
    }));
  });

  it('should return all urls when query is empty', async () => {
    const mockUrls = [
      {
        longUrl: 'https://example.com',
        shortUrl: 'ex',
        shortUrlId: 'ex123',
        createdAt: new Date(),
        visits: 0,
      },
    ];
    (db.urls.findMany as jest.Mock).mockResolvedValue(mockUrls);

    const request = createRequest('');

    await GET(request);

    expect(db.urls.findMany).toHaveBeenCalled();
    expect(NextResponse.json).toHaveBeenCalledWith({
      data: mockUrls,
      success: true,
    });
  });

  it('should return filtered urls when query is present', async () => {
    const mockUrls = [
      {
        longUrl: 'https://filtered.com',
        shortUrl: 'filt',
        shortUrlId: 'fl123',
        createdAt: new Date(),
        visits: 10,
      },
    ];
    (db.urls.findMany as jest.Mock).mockResolvedValue(mockUrls);

    const request = createRequest('filtered');

    await GET(request);

    expect(db.urls.findMany).toHaveBeenCalledWith({
      select: expect.any(Object),
      where: { longUrl: { contains: 'filtered' } },
      orderBy: { createdAt: 'desc' },
    });
    expect(NextResponse.json).toHaveBeenCalledWith({
      data: mockUrls,
      success: true,
    });
  });

  it('returns 500 on exception', async () => {
    (db.urls.findMany as jest.Mock).mockRejectedValue(
      new Error('Internal server error')
    );
    await GET(createRequest('fail'));

    expect(mockJson).toHaveBeenCalledWith(
      { message: 'Internal server error' },
      { status: 500 }
    );
    expect(mockJson).toHaveBeenCalled();
  });
});
