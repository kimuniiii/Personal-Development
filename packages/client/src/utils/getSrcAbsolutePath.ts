/**
 * @概要 画像のパスを絶対パスにして返す関数
 * @説明 OGP画像のURLを生成するときに使用する
 */
export const getSrcAbsolutePath = (imgSrc: string): string => {
  const protocol = process.env.VERCEL_ENV === 'production' ? 'https:' : 'http:';
  const host = process.env.VERCEL_ENV === 'production' ? 'www.riot-ec-site.com' : 'localhost';

  return `${protocol}//${host}${imgSrc}`;
};
