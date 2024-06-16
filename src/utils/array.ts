export const isArrayValue = <Array extends unknown[]>(array: Array, value: unknown): value is Array[0] =>
  Array.isArray(array) && array.includes(value);
