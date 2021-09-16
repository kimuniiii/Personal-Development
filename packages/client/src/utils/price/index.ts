/**
 * @概要 日本円表記で価格を返す関数
 * @具体例 1000000 → ￥1,000,000
 */
export const priceToJapaneseYen = (price: number): string => {
  return price.toLocaleString('ja-JP', { currency: 'JPY', style: 'currency' });
};
