import { APP_NAME } from './globalConstant';

export type Env = 'development' | 'production' | 'test';
const environment: Env = process.env.NODE_ENV;
export const PORT = 3000;

export const PLATFORM_EMAIL = `no-reply@mail-${APP_NAME.toLowerCase()}.com`;

export const LOCAL_HOST = `http://localhost:${PORT}`;

const DOMAIN_ = (env: Env) => {
  switch (env) {
    case 'development':
      return LOCAL_HOST;
    default:
      return process.env.APP_PRODUCTION_URL;
  }
};

export const DOMAIN = DOMAIN_(environment) as string;

const prefix='/api'
export const MY_URL_LIST_PATH=`${prefix}/list`