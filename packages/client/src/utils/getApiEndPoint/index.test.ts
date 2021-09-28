import { STAGING_GRAPHQL_API_ENDPOINT, PRODUCTION_GRAPHQL_API_ENDPOINT } from 'src/constants';

import { getApiEndPoint } from '.';

describe('getApiEndPoint', () => {
  describe('undefinedの場合', () => {
    test('空文字を返却すること', () => {
      expect(getApiEndPoint()).toBe('');
    });
  });
  describe('開発環境の場合', () => {
    test('開発環境のAPIエンドポイントを返却すること', () => {
      expect(getApiEndPoint('development')).toBe(STAGING_GRAPHQL_API_ENDPOINT);
    });
  });
  describe('ステージング環境の場合', () => {
    test('ステージング環境のAPIエンドポイントを返却すること', () => {
      expect(getApiEndPoint('staging')).toBe(STAGING_GRAPHQL_API_ENDPOINT);
    });
  });
  describe('本番環境の場合', () => {
    test('本番環境のAPIエンドポイントを返却すること', () => {
      expect(getApiEndPoint('production')).toBe(PRODUCTION_GRAPHQL_API_ENDPOINT);
    });
  });
});
