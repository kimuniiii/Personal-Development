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

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      env: process.env.VERCEL_ENV,
    },
  };
};
