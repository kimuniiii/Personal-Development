import { NextPage } from 'next';
import Head from 'next/head';

import { COPY_RIGHT, FACEBOOK_ADMIN_ID, FACEBOOK_APP_ID } from 'src/constants';

type HeadTemplateProps = {
  /**
   * @概要 サイト内の各ページで個別の内容になるように設定すること
   * @説明 全角35文字以下
   */
  pageTitle?: string;
  /**
   * @概要 サイト内の各ページで個別の内容になるように設定すること
   * @説明 全角80〜110文字以内・適当に書いたり自動抽出するくらいなら全く書かない方がマシ
   */
  pageDescription?: string;
  pageUrl?: string;
  /**
   * @概要 検索を避けるための判定フラグ
   * @説明 低品質なページや、ユーザーにとって価値のないページの場合「true」
   * @説明 普通にインデックスもクロールもして欲しい場合は「false」
   */
  isNoIndex?: boolean;
  /**
   * @概要 SSRでOGPを動的に生成するため
   * @説明 ogpUrl・ogpImageUrl は「絶対パス」で指定する
   */
  dynamicOgp?: { ogpUrl?: string; ogpImageUrl?: string };
};

export const HeadTemplate: NextPage<HeadTemplateProps> = ({
  pageTitle = 'Riot ECサイト',
  pageDescription = 'このサイトはRiotのECサイトです',
  pageUrl,
  isNoIndex = false,
  dynamicOgp,
}) => {
  return (
    <Head>
      <title>{pageTitle}</title>
      <meta charSet='UTF-8' />
      <meta httpEquiv='x-ua-compatible' content='ie=edge' />
      <meta name='description' content={pageDescription} />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta name='author' content='ADVENTURE inc.' />
      <meta name='theme-color' content='#1ba1ff' />
      <meta name='copyright' content={COPY_RIGHT} />
      {isNoIndex ? <meta name='robots' content='noindex,nofollow' /> : ''}
      <meta property='og:title' content={pageTitle} />
      <meta property='og:site_name' content={pageTitle} />
      <meta property='og:description' content={pageDescription} />
      <meta property='og:type' content='website' />
      {/* TODO : dynamicOgp?.ogpUrl ? dynamicOgp.ogpUrl : 'https://riot.jp' みたいな感じにする */}
      <meta property='og:url' content={dynamicOgp?.ogpUrl} />
      {/* TODO : dynamicOgp?.ogpImageUrl ? dynamicOgp.ogpImageUrl : getSrcAbsolutePath('/img/ogp_image.png') みたいな感じにする */}
      <meta property='og:image' content={dynamicOgp?.ogpImageUrl} />
      <meta property='fb:admins' content={FACEBOOK_ADMIN_ID} />
      <meta property='fb:app_id' content={FACEBOOK_APP_ID} />
      {/* TODO : TwitterでOGPを表示させるときの「表示タイプ」をどうするのか要件を決める */}
      <meta name='twitter:card' content='summary' />
      <link rel='canonical' href={pageUrl} />
    </Head>
  );
};
