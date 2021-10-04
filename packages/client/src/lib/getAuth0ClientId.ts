/**
 * @概要 各環境ごとに異なる「Auth0」の「clientId」を取得する関数
 */
export const getAuth0ClientId = (): string => {
  if (process.env.VERCEL_ENV === 'development') {
    return process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || '';
  } else if (process.env.VERCEL_ENV === 'staging') {
    return process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || '';
  } else {
    return process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || '';
  }
};
