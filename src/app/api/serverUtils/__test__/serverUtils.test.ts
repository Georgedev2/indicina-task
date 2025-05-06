import { get500ResponseBody } from '..';

describe('get500ResponseBody', () => {
  it('should return a standardized error response with provided error message and stack', () => {
    const error = {
      hasError: true,
      message:
        "We're sorry, something went wrong on the server. Please try later",
      status: 500,
      cause:
        "We're sorry, something went wrong on the server. Please try later",
      code: 'server_error',
      stack: 'Error stack trace',
    };
    const response = get500ResponseBody(error);

    expect(response).toEqual({
      error: error,
    });
  });
});
