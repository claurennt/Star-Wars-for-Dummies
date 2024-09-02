const memoize = <T extends (...args: any[]) => any>(fn: T): T => {
  const cache: { [key: string]: ReturnType<T> } = {};

  return function (...args: Parameters<T>): ReturnType<T> {
    const key = JSON.stringify(args);

    if (cache[key]) {
      return cache[key]; // Return cached result if it exists
    }

    const result = fn(...args); // Compute the result if not cached
    cache[key] = result; // Store the result in cache

    return result;
  } as T;
};

export const transformFieldName = (fieldName: string): string => {
  return fieldName
    .replace(/([A-Z])/g, ' $1') // Handle camelCase by adding spaces before uppercase letters
    .replace(/_/g, ' ') // Replace underscores with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
};
export const memoizedTransformFieldName = memoize(transformFieldName);
