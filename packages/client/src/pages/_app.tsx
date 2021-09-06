import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Auth0Provider } from '@auth0/auth0-react';
import { css, Global } from '@emotion/react';
import App, { AppContext, AppInitialProps } from 'next/app';
import React from 'react';

import type { AppProps } from 'next/app';

import { GLOBAL_STYLE } from 'src/styles/global_style';

import { getRedirectUriOrigin } from 'src/utils/getRedirectUriOrigin';

const createApolloClient = new ApolloClient({
  uri: 'http://localhost:8080/v1/graphql',
  cache: new InMemoryCache(),
});

type CustomAppProps = AppProps & {
  origin?: string;
};

const CustomApp = ({ Component, pageProps, origin }: CustomAppProps): JSX.Element => {
  // ログイン後のリダイレクト先を指定
  const redirectUri = `${origin}/my-page`;
  console.log(redirectUri);

  const auth0Domain: string =
    process.env.NEXT_PUBLIC_AUTH0_DOMAIN || process.env.VERCEL_AUTH0_DOMAIN || '';

  const auth0ClientId: string =
    process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID ||
    process.env.VERCEL_STAGING_AUTH0_CLIENT_ID ||
    process.env.VERCEL_PRODUCTION_AUTH0_CLIENT_ID ||
    '';

  console.log('NEXT_PUBLIC_AUTH0_DOMAIN', process.env.NEXT_PUBLIC_AUTH0_DOMAIN);
  console.log('VERCEL_AUTH0_DOMAIN ', process.env.VERCEL_AUTH0_DOMAIN);
  console.log('NEXT_PUBLIC_AUTH0_CLIENT_ID', process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID);
  console.log('VERCEL_STAGING_AUTH0_CLIENT_ID', process.env.VERCEL_STAGING_AUTH0_CLIENT_ID);
  console.log('VERCEL_PRODUCTION_AUTH0_CLIENT_ID', process.env.VERCEL_PRODUCTION_AUTH0_CLIENT_ID);

  return (
    <React.Fragment>
      <Auth0Provider domain={auth0Domain} clientId={auth0ClientId} redirectUri={redirectUri}>
        <ApolloProvider client={createApolloClient}>
          <Global
            styles={css`
              ${GLOBAL_STYLE}
            `}
          />
          <Component {...pageProps} />
        </ApolloProvider>
      </Auth0Provider>
    </React.Fragment>
  );
};

export default CustomApp;

type CustomAppInitialProps = AppInitialProps & {
  origin: string;
};

CustomApp.getInitialProps = async (appContext: AppContext): Promise<CustomAppInitialProps> => {
  const origin = getRedirectUriOrigin();
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps, origin };
};
