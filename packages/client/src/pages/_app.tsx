import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { UserProvider } from '@auth0/nextjs-auth0';
import { css, Global } from '@emotion/react';
import App, { AppContext, AppInitialProps, AppProps } from 'next/app';
import React from 'react';

import { HeadTemplate } from 'src/components/templates/HeadTemplate';

import { GLOBAL_STYLE } from 'src/styles/global_style';

const createApolloClient = new ApolloClient({
  uri: 'http://localhost:8080/v1/graphql',
  cache: new InMemoryCache(),
});

const CustomApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  const { user } = pageProps;

  return (
    <React.Fragment>
      <HeadTemplate />
      <UserProvider user={user}>
        <ApolloProvider client={createApolloClient}>
          <Global
            styles={css`
              ${GLOBAL_STYLE}
            `}
          />
          <Component {...pageProps} />
        </ApolloProvider>
      </UserProvider>
    </React.Fragment>
  );
};

export default CustomApp;

CustomApp.getInitialProps = async (appContext: AppContext): Promise<AppInitialProps> => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};
