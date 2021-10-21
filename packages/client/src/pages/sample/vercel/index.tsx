import React from 'react';

import type { GetStaticProps, NextPage } from 'next';

type DisplayVercelEnvTestProps = {
  env: string;
};

/**
 * @概要 Vercel の環境変数確認のためのページコンポーネント
 * @説明 ローカル : development | デプロイ : staging | 本番 : production が返却されれば目的達成
 */
const DisplayVercelEnvTest: NextPage<DisplayVercelEnvTestProps> = ({ env }) => {
  return (
    <React.Fragment>
      <p>Staging環境が更新されているかを確認します</p>
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
