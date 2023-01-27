export const COPY_RIGHT = `Copyright(c) ${new Date().getFullYear()} Kimura inc. All Rights Reserved`;

// 開発環境・ステージング環境・本番環境の「HASURA_GRAPHQL_ADMIN_SECRET」
// GraphQL EndPoint を「管理者シークレット」で保護するため
export const X_HASURA_ADMIN_SECRET = 'heroku-admin-secret';

// 開発環境・ステージング環境・本番環境の「オリジン」
export const VERCEL_DEVELOPMENT_ORIGIN = 'http://localhost:3020';
export const VERCEL_STAGING_ORIGIN =
  'https://personal-development-client-git-develop-kimuniiii.vercel.app';
export const VERCEL_PRODUCTION_ORIGIN = 'https://www.riot-ec-site.com';

// ステージング環境・本番環境の「APIエンドポイント」
export const STAGING_GRAPHQL_API_ENDPOINT = 'https://riot-ec-site-staging.herokuapp.com/v1/graphql';
export const PRODUCTION_GRAPHQL_API_ENDPOINT = 'https://riot-ec-site.herokuapp.com/v1/graphql';

// TODO : FacebookでOGPを動的に生成したかったら必ず必要になる
export const FACEBOOK_ADMIN_ID = '';
export const FACEBOOK_APP_ID = '';
