// Function to check if a value is an array of URLs
export const isArrayOfUrls = (value: any) =>
  Array.isArray(value) && value.length && value.every(isValueUrl);

// Function to check if a value is a url
export const isValueUrl = (value: any): boolean => {
  if (typeof value === 'string') {
    const schemes = ['http://', 'https://'];
    if (schemes.some((scheme) => value.startsWith(scheme))) {
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    }
  }
  return false;
};
