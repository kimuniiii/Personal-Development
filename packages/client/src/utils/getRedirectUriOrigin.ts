import { VERCEL_DEVELOPMENT_ORIGIN, STAGING_ORIGIN, PRODUCTION_ORIGIN } from 'src/constants';

/**
 * @概要 ログイン後のリダイレクト先のオリジンを取得する関数
 * @説明 開発環境と本番環境で、ログイン後のリダイレクト先のオリジンを出し分けたいため
 */
export const getRedirectUriOrigin = (): string => {
  if (process.env.VERCEL_ENV === 'development') {
    return VERCEL_DEVELOPMENT_ORIGIN;
  } else if (process.env.VERCEL_ENV === 'staging') {
    return STAGING_ORIGIN;
  } else {
    return PRODUCTION_ORIGIN;
  }
};
