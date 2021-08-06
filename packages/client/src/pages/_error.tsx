import { NextPage, NextPageContext } from 'next';
import Head from 'next/head';
import React from 'react';

type Props = {
  title: string;
  errorCode: number;
};

const ErrorPage: NextPage<Props> = ({ title, errorCode }) => {
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
ErrorPage.getInitialProps = async ({ res }: NextPageContext): Promise<Props> => {
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
