const CACHE_EXPIRATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

export const saveToLocalStorage = (key: string, data: any) => {
  const cache = {
    timestamp: Date.now(), // Store the current time to track when the data was cached
    data,
  };
  localStorage.setItem(key, JSON.stringify(cache));
};

export const getFromLocalStorage = (key: string) => {
  const storedData = localStorage.getItem(key);
  if (storedData) {
    const { timestamp, data } = JSON.parse(storedData);
    // Return data if within expiration time
    if (Date.now() - timestamp < CACHE_EXPIRATION_MS) {
      return data;
    }
  }
  // Return null if data is expired or not available so that the fetch will be performed
  return null;
};
