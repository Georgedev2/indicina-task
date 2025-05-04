import { POST } from '../route' 
import { NextRequest} from 'next/server';
import { urlStore } from '../../dataStore';
import { get500ResponseBody } from '../../serverUtils';


jest.mock('../../serverUtils', () => ({
  get500ResponseBody: jest.fn((error) => ({
    error: {
      hasError: true,
      message: 'mocked error message',
      status: 500,
      cause: error.message,
      code: 'server_error',
      stack: error.stack,
    },
  })),
}));

jest.mock('../../dataStore', () => ({
  urlStore: {
    createUrl: jest.fn(),
  },
}));

describe('POST handler (with mocks)', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const createMockRequest = (body:  NextRequest )=> {
    return {
      json: jest.fn().mockResolvedValue(body),
    } as unknown as NextRequest;
  };

  it('should return 400 if longUrl is missing', async () => {
    const req = createMockRequest({});

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json).toEqual({ message: 'invalid URL' });
  });

  it('should return 201 and call createUrl if longUrl is valid', async () => {
    const longUrl = 'https://example.com/page';
    const origin = 'https://example.com';

    const mockedNewUrl = {
      id: 201,
      longUrl,
      origin,
      shortUrlId: 'abc123',
      shortURL: `${origin}/abc123`,
      created: Date.now(),
      clicks: 0,
    };

    (urlStore.createUrl as jest.Mock).mockReturnValue(mockedNewUrl);

    const req = createMockRequest({ longUrl });
    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(201);
    expect(urlStore.createUrl).toHaveBeenCalledWith({ longUrl, origin });
    expect(json.data).toEqual(mockedNewUrl);
  });

  it('should return 500 and call get500ResponseBody on unexpected error', async () => {
    const erroringRequest = {
      json: jest.fn().mockRejectedValue(new Error('broken JSON')),
    } as unknown as NextRequest;

    const res = await POST(erroringRequest);
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(get500ResponseBody).toHaveBeenCalled();
    expect(json.error).toMatchObject({
      hasError: true,
      message: 'mocked error message',
    });
  });
});
