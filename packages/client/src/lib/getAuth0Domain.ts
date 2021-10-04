/**
 * @概要 各環境ごとに異なる「Auth0」の「clientId」を取得する関数
 */
export const getAuth0Domain = (): string => {
  if (process.env.VERCEL_ENV === 'development') {
    return process.env.NEXT_PUBLIC_AUTH0_DOMAIN || '';
  }

  if (process.env.VERCEL_ENV === 'staging') {
    return process.env.NEXT_PUBLIC_AUTH0_DOMAIN || '';
  }

  if (process.env.VERCEL_ENV === 'production') {
    return process.env.NEXT_PUBLIC_AUTH0_DOMAIN || '';
  }

  return '';
};
