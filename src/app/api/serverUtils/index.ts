export const get500ResponseBody = (error: {
    message: string;
    stack: unknown;
  }) => {
    console.error(error);
    return {
      error: {
        hasError: true,
        message:
          "We're sorry, something went wrong on the server. Please try later",
        status: 500,
        cause: error.message,
        code: 'server_error',
        stack: error?.stack,
      },
    };
  };