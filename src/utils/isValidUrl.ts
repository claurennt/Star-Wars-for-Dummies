// Function to check if a value is an array of URLs
export const isArrayOfUrls = (value: any) =>
  Array.isArray(value) &&
  value.every((item) => typeof item === 'string' && item.startsWith('http'));

// Function to check if a value is a valid URL
export const isValueUrl = (value: any) =>
  typeof value === 'string' && value.startsWith('http');
