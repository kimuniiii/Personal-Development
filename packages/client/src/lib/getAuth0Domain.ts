/**
 * @概要 各環境ごとに異なる「Auth0」の「Domain」を取得する関数
 */
export const getAuth0Domain = (vercelEnv?: string): string => {
  switch (vercelEnv) {
    case 'development':
      return process.env.NEXT_PUBLIC_AUTH0_DOMAIN || '';
    case 'staging':
    case 'production':
      return process.env.AUTH0_DOMAIN || '';
    default:
      return '';
  }
};
