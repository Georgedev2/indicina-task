import { POST } from '../route';
import { NextRequest, NextResponse } from 'next/server';

type TRequestBody = { longUrl: string };

jest.mock('../../db', () => ({
    urls: {
      update: () => jest.fn(),
      create: () => jest.fn(),
    },
}));
jest.mock('../../serverUtils', () => ({
  encodeBase62: () => jest.fn(),
  get500ResponseBody: () => jest.fn(),
}));

jest.mock('next/server', () => ({
  NextResponse: {
    json: () => jest.fn(),
  },
}));

const mockNextRequest = (body: { longUrl: string }): NextRequest =>
  ({
    json: () => Promise.resolve(body),
  } as NextRequest);

describe('POST /api/encode', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockJson = jest.spyOn(NextResponse, 'json');

  it('should return 400 for missing longUrl', async () => {
    await POST(mockNextRequest({} as TRequestBody));

    expect(mockJson).toHaveBeenCalledWith(
      { message: 'invalid URL' },
      { status: 400 }
    );
    expect(mockJson).toHaveBeenCalled();
  });

});