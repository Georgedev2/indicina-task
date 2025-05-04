export const get500ResponseBody = (error: {
    message: string;
    stack: unknown;
  }) => {
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
  const base62chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  
  export const  encodeBase62=(num:number)=> {
    if (num === 0) return base62chars[0];
    let encoded = '';
    while (num > 0) {
      encoded = base62chars[num % 62] + encoded;
      num = Math.floor(num / 62);
    }
    return encoded;
  }
  
  export const decodeBase62=(str:string) =>{
    let decoded = 0;
    for (let i = 0; i < str.length; i++) {
      decoded = decoded * 62 + base62chars.indexOf(str[i]);
    }
    return decoded;
  }
  