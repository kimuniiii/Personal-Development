/**
 * @概要 各環境ごとに異なる「Auth0」の「clientId」を取得する関数
 */
export const getAuth0ClientId = (vercelEnv?: string): string => {
  switch (vercelEnv) {
    case 'development':
      return process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || '';
    case 'staging':
    case 'production':
      return process.env.AUTH0_CLIENT_ID || '';
    default:
      return '';
  }
};
