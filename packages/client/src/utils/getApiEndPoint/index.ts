import { STAGING_GRAPHQL_API_ENDPOINT, PRODUCTION_GRAPHQL_API_ENDPOINT } from 'src/constants';

/**
 * @概要 ログイン後のリダイレクト先のオリジンを取得する関数
 * @説明 開発環境と本番環境で、ログイン後のリダイレクト先のオリジンを出し分けたいため
 */
export const getApiEndPoint = (vercelEnv?: string): string => {
  switch (vercelEnv) {
    case 'development':
    case 'staging':
      return STAGING_GRAPHQL_API_ENDPOINT;
    case 'production':
      return PRODUCTION_GRAPHQL_API_ENDPOINT;
    default:
      return '';
  }
};
