/**
 * @概要 画像のパスを絶対パスにして返す関数
 * @説明 OGP画像のURLを生成するときに使用する
 */
export const getSrcAbsolutePath = (imgSrc: string, vercelEnv?: string): string => {
  const protocol = vercelEnv === 'production' ? 'https:' : 'http:';
  const host = vercelEnv === 'production' ? 'www.riot-ec-site.com' : 'localhost';
  const port = vercelEnv === 'production' ? ':80' : ':3020';

  return `${protocol}//${host}${port}${imgSrc}`;
};
