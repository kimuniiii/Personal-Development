import { NextPage } from 'next';
import Head from 'next/head';

import {
  COPY_RIGHT,
  FACEBOOK_ADMIN_ID,
  FACEBOOK_APP_ID,
  VERCEL_PRODUCTION_ORIGIN,
  VERCEL_STAGING_ORIGIN,
} from 'src/constants';

import { getSrcAbsolutePath } from 'src/utils/getSrcAbsolutePath';

type HeadTemplateProps = {
  /**
   * @概要 オリジン = スキーム + ホスト（ドメイン）+ ポート番号 のこと
   * @説明 スキーム、ホスト、ポートがすべて一致した場合のみ、2つのオブジェクトは同じオリジンと言える
   */
  pageOrigin?: string;
  /**
   * @概要 サイト内で評価される正規URLをGoogleの検索エンジンに認識させるURL
   * @説明 重複コンテンツを解消する目的・リンクの評価を集約する目的
   */
  pageCanonicalUrl?: `${'https://www.riot-ec-site.com'}${string}`;
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
  /**
   * @概要 検索を避けるための判定フラグ
   * @説明 低品質なページや、ユーザーにとって価値のないページの場合「true」
   * @説明 普通にインデックスもクロールもして欲しい場合は「false」
   */
  isNoIndex?: boolean;
  /**
   * @概要 SSRでOGPを動的に生成するため
   * @説明1 ogpUrl : ページの正規URL・パラメーターの無いURL・「絶対パス」で指定
   * @説明2 ogpImageUrl : シェアされた時に表示される画像のURL・「絶対パス」で指定
   */
  dynamicOgp?: {
    ogpUrl?: string;
    ogpImageWidth: number;
    ogpImageHeight: number;
    ogpImageUrl?: string;
  };
};

/**
 * @概要 OGP・metaタグ用のコンポーネント
 * @説明 各ページごとにOGP・metaタグは変更される使い方が想定される
 */
export const HeadTemplate: NextPage<HeadTemplateProps> = ({
  pageOrigin,
  pageCanonicalUrl,
  pageTitle = 'Riot ECサイト',
  pageDescription = 'このサイトはRiotのECサイトです',
  isNoIndex = false,
  dynamicOgp = {
    ogpUrl: 'https://www.riot-ec-site.com/',
    ogpImageWidth: 1200,
    ogpImageHeight: 630,
    ogpImageUrl: getSrcAbsolutePath('/images/ec_site.png', process.env.VERCEL_ENV),
  },
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
      <meta property='og:image:width' content={String(dynamicOgp?.ogpImageWidth)} />
      <meta property='og:image:height' content={String(dynamicOgp?.ogpImageHeight)} />
      <meta property='fb:admins' content={FACEBOOK_ADMIN_ID} />
      <meta property='fb:app_id' content={FACEBOOK_APP_ID} />
      {/* TODO : TwitterでOGPを表示させるときの「表示タイプ」をどうするのか要件を決める */}
      <meta name='twitter:card' content='summary' />
      <link rel='canonical' href={pageCanonicalUrl} />
      {pageOrigin === VERCEL_PRODUCTION_ORIGIN ? (
        <link rel='icon' href='/favicon/production_favicon.ico' />
      ) : pageOrigin === VERCEL_STAGING_ORIGIN ? (
        <link rel='icon' href='/favicon/staging_favicon.ico' />
      ) : (
        <link rel='icon' href='/favicon/development_favicon.ico' />
      )}
    </Head>
  );
};
