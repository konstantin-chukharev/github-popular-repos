export const isObjectKey = <O extends Record<string, unknown>>(
  object: O,
  key: keyof O | string,
): key is keyof O => key in object;
