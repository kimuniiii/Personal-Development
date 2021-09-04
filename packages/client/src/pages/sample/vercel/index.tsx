import { GetStaticProps, NextPage } from 'next';
import React from 'react';

type DisplayVercelEnvTestProps = {
  env: string;
};
const DisplayVercelEnvTest: NextPage<DisplayVercelEnvTestProps> = ({ env }) => {
  return (
    <React.Fragment>
      <div>{env}</div>
    </React.Fragment>
  );
};

export default DisplayVercelEnvTest;

// process.env.VERCEL_ENV が Falsy な値だった場合、empty の文字列を返す
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      env: process.env.VERCEL_ENV || 'empty',
    },
  };
};
