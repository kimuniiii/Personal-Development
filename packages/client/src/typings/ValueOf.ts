/**
 * `Object`から`value`を取り出した`Union Types`
 */
export type ValueOf<T extends Record<string, unknown>> = T[keyof T];
