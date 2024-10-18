/**
 * The Prettify helper is a utility type that takes an object type and makes
 * the hover overlay more readable.
 *
 * @link https://www.totaltypescript.com/concepts/the-prettify-helper
 */
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
