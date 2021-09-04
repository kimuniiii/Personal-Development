export const getSrcAbsolutePath = (imgSrc: string): string => {
  const protocol = process.env.VERCEL_ENV === 'production' ? 'https:' : 'http:';
  const host = process.env.VERCEL_ENV === 'production' ? 'riot-ec-site.com' : 'localhost';

  return `${protocol}//${host}${imgSrc}`;
};
