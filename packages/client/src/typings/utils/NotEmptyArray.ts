/**
 * @概要 空でない配列の型を表現する型
 * @具体例 コンパイルエラー → const numbers1 : NotEmptyArray<string> = [];
 */
export type NotEmptyArray<T> = [T, ...T[]];
