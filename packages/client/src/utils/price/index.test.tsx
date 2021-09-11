import { priceToJapaneseYen } from './';

describe('priceToJapaneseYen', () => {
  test('日本円表記で価格を返す関数', () => {
    expect(priceToJapaneseYen(1000000)).toBe('￥1,000,000');
  });
});
