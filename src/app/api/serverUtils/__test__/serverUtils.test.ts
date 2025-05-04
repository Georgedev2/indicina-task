import { decodeBase62, encodeBase62, get500ResponseBody } from '..';

describe('get500ResponseBody', () => {
  it('should return a standardized error response with provided error message and stack', () => {
    const error = {
      hasError: true,
      message:
        "We're sorry, something went wrong on the server. Please try later",
      status: 500,
      cause: "We're sorry, something went wrong on the server. Please try later",
      code: 'server_error',
      stack: 'Error stack trace',
    };
    const response = get500ResponseBody(error);

    expect(response).toEqual({
      error:error 
    });
  });

});

describe('encodeBase62', () => {
  it('should return "0" when input is 0', () => {
    expect(encodeBase62(0)).toBe('0');
  });

  it('should correctly encode numbers into base62', () => {
    expect(encodeBase62(1)).toBe('1');
    expect(encodeBase62(61)).toBe('z');
    expect(encodeBase62(62)).toBe('10');
    expect(encodeBase62(3843)).toBe('zz'); // 62^2 - 1
  });
});

describe('decodeBase62', () => {
  it('should correctly decode base62 strings into numbers', () => {
    expect(decodeBase62('0')).toBe(0);
    expect(decodeBase62('1')).toBe(1);
    expect(decodeBase62('z')).toBe(61);
    expect(decodeBase62('10')).toBe(62);
    expect(decodeBase62('zz')).toBe(3843);
  });
});

describe('Base62 encode/decode consistency', () => {
  it('should correctly round-trip numbers through encodeBase62 and decodeBase62', () => {
    for (let i = 0; i <= 10000; i++) {
      const encoded = encodeBase62(i);
      const decoded = decodeBase62(encoded);
      expect(decoded).toBe(i);
    }
  });
});
