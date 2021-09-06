/**
 * @概要 ログイン後のリダイレクト先のオリジンを取得する関数
 * @説明 開発環境と本番環境で、ログイン後のリダイレクト先のオリジンを出し分けたいため
 */
export const getRedirectUriOrigin = (): string => {
  if (process.env.VERCEL_ENV === 'development') {
    return 'http://localhost:3001';
  } else if (process.env.VERCEL_ENV === 'staging') {
    return 'https://personal-development-client-git-develop-kimuniiii.vercel.app';
  } else {
    return 'https://riot-ec-site.com';
  }
};
