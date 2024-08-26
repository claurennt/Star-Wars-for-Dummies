export const saveToLocalStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getFromLocalStorage = (key: string) => {
  const storedData = localStorage.getItem(key);
  return storedData && JSON.parse(storedData);
};
