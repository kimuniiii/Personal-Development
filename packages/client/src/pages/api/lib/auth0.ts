import { initAuth0 } from '@auth0/nextjs-auth0';

// 参考文献 : https://auth0.github.io/nextjs-auth0/modules/config.html#optional
export default initAuth0({
  secret: process.env.AUTH0_SECRET,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  baseURL: process.env.AUTH0_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  routes: {
    callback: process.env.AUTH0_CALLBACK,
    postLogoutRedirect: process.env.AUTH0_POST_LOGOUT_REDIRECT,
  },
});
