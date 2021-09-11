import {
  VERCEL_DEVELOPMENT_ORIGIN,
  VERCEL_STAGING_ORIGIN,
  VERCEL_PRODUCTION_ORIGIN,
} from 'src/constants';

import { getRedirectUriOrigin } from './';

describe('getRedirectUriOrigin', () => {
  describe('undefinedの場合', () => {
    test('空文字を返却すること', () => {
      expect(getRedirectUriOrigin()).toBe('');
    });
  });
  describe('開発環境の場合', () => {
    test('開発環境のオリジンを返却すること', () => {
      expect(getRedirectUriOrigin('development')).toBe(VERCEL_DEVELOPMENT_ORIGIN);
    });
  });
  describe('ステージング環境の場合', () => {
    test('ステージング環境のオリジンを返却すること', () => {
      expect(getRedirectUriOrigin('staging')).toBe(VERCEL_STAGING_ORIGIN);
    });
  });
  describe('本番環境の場合', () => {
    test('本番環境のオリジンを返却すること', () => {
      expect(getRedirectUriOrigin('production')).toBe(VERCEL_PRODUCTION_ORIGIN);
    });
  });
});

describe('開発環境でない場合', () => {
  describe('ステージング環境でない場合', () => {
    describe('本番環境でない場合', () => {
      test('空文字を返却すること', () => {
        expect(getRedirectUriOrigin('production')).toBe(VERCEL_PRODUCTION_ORIGIN);
      });
    });
  });
});
