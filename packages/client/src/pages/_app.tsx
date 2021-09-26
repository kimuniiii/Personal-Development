import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Auth0Provider, AppState } from '@auth0/auth0-react';
import { css, Global } from '@emotion/react';
import App, { AppContext, AppInitialProps } from 'next/app';
import Router from 'next/router';
import React from 'react';

import type { AppProps } from 'next/app';

import { HeadTemplate } from 'src/components/templates/HeadTemplate';

import { getAuth0ClientId } from 'src/lib/getAuth0ClientId';
import { getAuth0Domain } from 'src/lib/getAuth0Domain';

import { GLOBAL_STYLE } from 'src/styles/global_style';

import { getApiEndPoint } from 'src/utils/getApiEndPoint';
import { getRedirectUriOrigin } from 'src/utils/getRedirectUriOrigin';

type CustomAppProps = AppProps & {
  origin?: string;
  endPoint?: string;
  auth0Domain: string;
  auth0ClientId: string;
};

const CustomApp = ({
  Component,
  pageProps,
  origin,
  endPoint,
  auth0Domain,
  auth0ClientId,
}: CustomAppProps): JSX.Element => {
  console.log('endPoint', endPoint);
  const createApolloClient = new ApolloClient({
    uri: endPoint,
    cache: new InMemoryCache(),
    headers: {
      'x-hasura-admin-secret': 'heroku-staging',
    },
  });

  // ログイン後のリダイレクト先を指定
  const redirectUri = `${origin}/my-page`;
  console.log(redirectUri);

  console.log('NEXT_PUBLIC_AUTH0_DOMAIN', process.env.NEXT_PUBLIC_AUTH0_DOMAIN);
  console.log('VERCEL_AUTH0_DOMAIN ', process.env.VERCEL_AUTH0_DOMAIN);

  console.log('NEXT_PUBLIC_AUTH0_CLIENT_ID', process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID);
  console.log('VERCEL_STAGING_AUTH0_CLIENT_ID', process.env.VERCEL_STAGING_AUTH0_CLIENT_ID);
  console.log('VERCEL_PRODUCTION_AUTH0_CLIENT_ID', process.env.VERCEL_PRODUCTION_AUTH0_CLIENT_ID);

  console.log('auth0Domain', auth0Domain);
  console.log('auth0ClientId', auth0ClientId);

  const onRedirectCallback = (appState: AppState): void => {
    console.log('appState', appState);
    console.log('appState?.returnTo', appState?.returnTo);
    Router.replace(appState?.returnTo || '/my-page');
  };

  return (
    <React.Fragment>
      <HeadTemplate pageOrigin={origin} />
      <Auth0Provider
        domain={auth0Domain}
        clientId={auth0ClientId}
        redirectUri={redirectUri}
        audience={origin}
        onRedirectCallback={onRedirectCallback}
      >
        <ApolloProvider client={createApolloClient}>
          <Global
            styles={css`
              ${GLOBAL_STYLE}
            `}
          />
          <Component
            {...pageProps}
            origin={origin}
            auth0Domain={auth0Domain}
            auth0ClientId={auth0ClientId}
          />
        </ApolloProvider>
      </Auth0Provider>
    </React.Fragment>
  );
};

export default CustomApp;

type CustomAppInitialProps = AppInitialProps & {
  origin: string;
  endPoint: string;
  auth0Domain: string;
  auth0ClientId: string;
};

CustomApp.getInitialProps = async (appContext: AppContext): Promise<CustomAppInitialProps> => {
  const origin = getRedirectUriOrigin(process.env.VERCEL_ENV);
  const endPoint = getApiEndPoint(process.env.VERCEL_ENV);
  const auth0Domain = getAuth0Domain();
  const auth0ClientId = getAuth0ClientId();
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps, origin, endPoint, auth0Domain, auth0ClientId };
};
