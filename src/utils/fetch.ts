import axios, { AxiosResponse } from 'axios';

// Function to fetch data from provided URLs
export const getFetchedData = async (
  linksToExtraResources: string
): Promise<AxiosResponse<any, any>[]> => {
  // Parse URLs from the input string to array
  const parsedUrls = linksToExtraResources
    ? JSON.parse(linksToExtraResources)
    : [];

  try {
    // Fetch data for all URLs (either a single URL or an array of URLs).
    const response = await Promise.all(
      Array.isArray(parsedUrls)
        ? parsedUrls.map((url: string) => axios.get(url))
        : [axios.get(parsedUrls)]
    );

    const data = response.map((res) => res.data);

    return data;
  } catch (err) {
    console.error('Error fetching data:', err);

    // Return an empty array in case of error
    return [];
  }
};
