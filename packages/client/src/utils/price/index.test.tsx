import { priceToJapaneseYen } from './';

describe('priceToJapaneseYen', () => {
  describe('数値を入力した場合', () => {
    test('文字列の日本円表記で価格を返すこと', () => {
      expect(priceToJapaneseYen(1000000)).toBe('￥1,000,000');
    });
  });
});
