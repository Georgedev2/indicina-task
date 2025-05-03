import { GET } from '../route';
import { NextRequest } from 'next/server';
import { urlList } from '../../dataStore';

jest.mock('../../dataStore', () => ({
  urlList,
}));

describe('GET handler', () => {
  it('should return filtered urls based on query', async () => {
    const url = new URL('http://localhost/api?search=merlin');
    const mockRequest = {
      nextUrl: {
        searchParams: url.searchParams,
      },
    } as unknown as NextRequest;

    const response = GET(mockRequest);
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data).toHaveLength(1);
    expect(json.data[0].LongUrl).toContain('merlin');
  });

  it('should return all urls if no query is provided', async () => {
    const url = new URL('http://localhost/api/list');
    const mockRequest = {
      nextUrl: {
        searchParams: url.searchParams,
      },
    } as unknown as NextRequest;

    const response = GET(mockRequest);
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data.length).toBe(urlList.length);
  });

  it('should handle errors and return 500', async () => {
    jest.spyOn(Array.prototype, 'filter').mockImplementationOnce(() => {
      throw new Error('Mock error');
    });

    const url = new URL('http://localhost/api/list?search=test');
    const mockRequest = {
      nextUrl: {
        searchParams: url.searchParams,
      },
    } as unknown as NextRequest;

    const response = GET(mockRequest);
    const json = await response.json();

    expect(response.status).toBe(500);
    expect(json.success).toBe(false);
    expect(json.message).toBeDefined();

    jest.restoreAllMocks();
  });
});
