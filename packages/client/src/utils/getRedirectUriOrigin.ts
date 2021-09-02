/**
 * @概要 ログイン後のリダイレクト先のオリジンを取得する関数
 * @説明 開発環境と本番環境で、ログイン後のリダイレクト先のオリジンを出し分けたいため
 */
export const getRedirectUriOrigin = (): string => {
  if (process.env.NEXT_PUBLIC_RIOT_DEVELOPMENT === 'development') {
    return 'http://localhost:3001';
  } else {
    return 'https://riot-ec-site.com/';
  }
};
