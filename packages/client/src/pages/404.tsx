import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

const Custom404Page: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>404Page</title>
      </Head>
      <div>
        <h1>404Page - Page not found！</h1>
        <p>エラーが発生しているので修正してください</p>
      </div>
    </React.Fragment>
  );
};

export default Custom404Page;
