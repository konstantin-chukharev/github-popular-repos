export type ArrayItem<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ItemType)[] ? ItemType : never;

export const isArrayValue = <ArrayType extends unknown[]>(
  array: ArrayType,
  value: unknown,
): value is ArrayItem<ArrayType> =>
  Array.isArray(array) && array.includes(value);
