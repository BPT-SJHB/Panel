type NullToUndefined<T> = T extends null
  ? undefined
  : T extends (infer U)[]
    ? NullToUndefined<U>[]
    : T extends object
      ? { [K in keyof T]: NullToUndefined<T[K]> }
      : T;

export function deepNullToUndefined<T>(input: T): NullToUndefined<T> {
  // null → undefined
  if (input === null || (typeof input === 'number' && isNaN(input))) {
    return undefined as NullToUndefined<T>;
  }

  // array → map each element
  if (Array.isArray(input)) {
    const arr = input.map((item) => deepNullToUndefined(item));
    return arr as unknown as NullToUndefined<T>;
  }

  // object → recursively transform each property
  if (typeof input === 'object') {
    const result = {} as { [K in keyof T]: NullToUndefined<T[K]> };
    for (const key in input) {
      result[key] = deepNullToUndefined(input[key]);
    }
    return result as NullToUndefined<T>;
  }

  // primitive value
  return input as NullToUndefined<T>;
}
