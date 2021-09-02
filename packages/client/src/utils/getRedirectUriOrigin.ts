import type { IncomingMessage } from 'http';

/**
 * @概要 ログイン後のリダイレクト先のオリジンを取得する関数
 * @説明 開発環境と本番環境で、ログイン後のリダイレクト先のオリジンを出し分けたいため
 */
export const getRedirectUriOrigin = (req?: IncomingMessage): string | undefined => {
  if (process.env.RIOT_DEVELOPMENT !== 'development') {
    return req?.headers?.origin;
  } else {
    return 'http://localhost:3001';
  }
};
