import {
  VERCEL_DEVELOPMENT_ORIGIN,
  VERCEL_STAGING_ORIGIN,
  VERCEL_PRODUCTION_ORIGIN,
} from 'src/constants';

/**
 * @概要 ログイン後のリダイレクト先のオリジンを取得する関数
 * @説明 開発環境と本番環境で、ログイン後のリダイレクト先のオリジンを出し分けたいため
 */
export const getRedirectUriOrigin = (vercelEnv?: string): string => {
  switch (vercelEnv) {
    case 'development':
      return VERCEL_DEVELOPMENT_ORIGIN;
    case 'staging':
      return VERCEL_STAGING_ORIGIN;
    case 'production':
      return VERCEL_PRODUCTION_ORIGIN;
    default:
      return '';
  }
};
