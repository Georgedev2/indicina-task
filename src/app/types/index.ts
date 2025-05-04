export interface ServerError {
  message: string;
  code?: number | null;
  hasError?: boolean;
  cause?: string | string[];
  stack?: string;
}
export interface IurlDetail {
  id:number
  shortUrlId: string;
  longUrl: string;
  shortURL: string;
  created: number;
  clicks: number;
  isActive?: boolean;
}

export type TCatchBlockError = { message: string; stack: unknown };

export type StripUndefined<T> = {
  [K in keyof T as undefined extends T[K] ? never : K]: T[K];
};