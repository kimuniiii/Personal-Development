import { getSrcAbsolutePath } from '.';

describe('getSrcAbsolutePath関数', () => {
  describe('本番環境の場合', () => {
    test('本番環境のオリジンに画像のパスを付与した絶対パスを返すこと', () => {
      expect(getSrcAbsolutePath('/images/ec_site.png', 'production')).toBe(
        'https://www.riot-ec-site.com:80/images/ec_site.png',
      );
    });
  });
  describe('本番環境以外の場合', () => {
    test('開発環境のオリジンに画像のパスを付与した絶対パスを返すこと', () => {
      expect(getSrcAbsolutePath('/images/ec_site.png', '')).toBe(
        'http://localhost:3020/images/ec_site.png',
      );
    });
  });
});
