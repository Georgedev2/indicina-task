export interface ServerError {
  message: string;
  code?: number | null;
  hasError?: boolean;
  cause?: string | string[];
  stack?: string;
}
export interface IurlDetail {
  id:string
  shortUrlId: string;
  LongUrl: string;
  shortURL: string;
  created: number;
  clicks: number;
  isActive: boolean;
}

export type TCatchBlockError = { message: string; stack: unknown };
