import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Loading, ResourceCard } from '..'; // Adjust import path as needed
import Stack from '@mui/material/Stack';

export const ResourcesList = ({ resources }: any) => {
  const [extraResource, setExtraResource] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    const linksToExtraResources = e.currentTarget.getAttribute('data-url');
    const id1 = e.currentTarget.getAttribute('data-name');
    console.log(id1, id);
    // Convert the string back into an array
    const parsedUrls = linksToExtraResources
      ? JSON.parse(linksToExtraResources)
      : [];

    const isArrayOfUrls = Array.isArray(parsedUrls);

    try {
      let response;
      if (isArrayOfUrls) {
        // Handle multiple URLs
        response = await Promise.all(
          parsedUrls.map((url: string) => axios.get(url))
        );
      } else {
        // Handle a single URL
        response = await axios.get(parsedUrls);
      }

      // Check if the response is an array or a single object and process accordingly
      const data = isArrayOfUrls
        ? (response as AxiosResponse[]).map((res) => res.data)
        : (response as AxiosResponse).data;

      setExtraResource(Array.isArray(data) ? data : [data]);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  return (
    <Stack
      direction='column'
      spacing={4}
      justifyContent='center'
      flexWrap='wrap'
    >
      {resources.map((resource: any, index: string) => (
        <ResourceCard
          id={resource.name}
          key={resource.name}
          resource={resource}
          onClick={(e) => handleClick(e, resource.name)}
          extraResource={extraResource}
        />
      ))}
    </Stack>
  );
};
