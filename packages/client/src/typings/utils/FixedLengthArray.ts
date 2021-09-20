/**
 * @概要 length（配列の要素数）が`L`の`T[]`型
 */
export type FixedLengthArray<T, L extends number> = T[] & {
  0: T;
  length: L;
};
