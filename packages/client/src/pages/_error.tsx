import Head from 'next/head';
import React from 'react';

import type { NextPage, NextPageContext } from 'next';

type ErrorPageProps = {
  title: string;
  errorCode: number;
};

const ErrorPage: NextPage<ErrorPageProps> = ({ title, errorCode }) => {
  console.log('Error Page Title', title);
  console.log('Error Page statusCode', errorCode);

  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
      </Head>
      <div>
        <h1>{errorCode}</h1>
        <p>エラーが発生しているので修正してください</p>
      </div>
    </React.Fragment>
  );
};

// resが存在する時はSSR・resがない場合はCSR
ErrorPage.getInitialProps = async ({ res }: NextPageContext): Promise<ErrorPageProps> => {
  if (res !== undefined) {
    return {
      errorCode: res.statusCode,
      title: `Error: ${res.statusCode}`,
    };
  } else {
    return {
      errorCode: 404,
      title: 'Error',
    };
  }
};

export default ErrorPage;
