import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Auth0Provider, AppState } from '@auth0/auth0-react';
import { css, Global } from '@emotion/react';
import App, { AppContext, AppInitialProps } from 'next/app';
import Router from 'next/router';
import React, { useMemo } from 'react';

import type { AppProps } from 'next/app';

import { HeadTemplate } from 'src/components/templates/HeadTemplate';

import { X_HASURA_ADMIN_SECRET } from 'src/constants';

import { getAuth0ClientId } from 'src/lib/getAuth0ClientId';
import { getAuth0Domain } from 'src/lib/getAuth0Domain';

import { GLOBAL_STYLE } from 'src/styles/global_style';

import { getApiEndPoint } from 'src/utils/getApiEndPoint';
import { getRedirectUriOrigin } from 'src/utils/getRedirectUriOrigin';

type CustomAppProps = AppProps & {
  origin: string;
  endPoint: string;
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

  // MEMO : `useMemo`で`絶対に`キャッシュ化をしないといけない
  // MEMO : なぜなら「ブラウザバック」の時と「Router.push()」の時にデータを取得できないから
  const createApolloClient = useMemo(() => {
    console.log('1回目は走るけど2回目以降は走らない');
    return new ApolloClient({
      uri: endPoint,
      cache: new InMemoryCache(),
      headers: {
        'x-hasura-admin-secret': X_HASURA_ADMIN_SECRET,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ログイン後のリダイレクト先を指定
  const redirectUri = `${origin}/my-page`;
  console.log(redirectUri);

  console.log('App Component');
  console.log('NEXT_PUBLIC_VERCEL_ENV', process.env.NEXT_PUBLIC_VERCEL_ENV);

  console.log('NEXT_PUBLIC_AUTH0_DOMAIN は 開発環境では値が入る');
  console.log('NEXT_PUBLIC_AUTH0_DOMAIN', process.env.NEXT_PUBLIC_AUTH0_DOMAIN);
  console.log('process.env.AUTH0_DOMAIN は ステージングと本番環境では値が入る');
  console.log('process.env.AUTH0_DOMAIN', process.env.AUTH0_DOMAIN);

  console.log('NEXT_PUBLIC_AUTH0_CLIENT_ID は 開発環境では値が入る');
  console.log('NEXT_PUBLIC_AUTH0_CLIENT_ID', process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID);
  console.log('process.env.AUTH0_CLIENT_ID は ステージングと本番環境では値が入る');
  console.log('process.env.AUTH0_CLIENT_ID', process.env.AUTH0_CLIENT_ID);

  console.log('初期描画時は auth0Domain に値は入る。ログイン後は入らない');
  console.log('auth0Domain', auth0Domain);

  console.log('初期描画時は auth0ClientId に値は入る。ログイン後は入らない');
  console.log('auth0ClientId', auth0ClientId);

  const cacheAuth0Domain = useMemo(() => {
    return auth0Domain;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cacheAuth0ClientId = useMemo(() => {
    return auth0ClientId;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRedirectCallback = (appState: AppState): void => {
    console.log('appState', appState);
    console.log('appState?.returnTo', appState?.returnTo);
    Router.replace(appState?.returnTo || '/my-page');
  };

  return (
    <React.Fragment>
      <HeadTemplate pageOrigin={origin} />
      <Auth0Provider
        domain={cacheAuth0Domain}
        clientId={cacheAuth0ClientId}
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
            auth0Domain={cacheAuth0Domain}
            auth0ClientId={cacheAuth0ClientId}
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
  // VERCEL_ENV : Vercel の ダッシュボードで登録した環境変数
  const origin = getRedirectUriOrigin(process.env.VERCEL_ENV);
  const endPoint = getApiEndPoint(process.env.VERCEL_ENV);
  const auth0Domain = getAuth0Domain(process.env.VERCEL_ENV);
  const auth0ClientId = getAuth0ClientId(process.env.VERCEL_ENV);
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps, origin, endPoint, auth0Domain, auth0ClientId };
};
