import { useState, useCallback } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { getFromLocalStorage, isArrayOfUrls, isValueUrl } from '../../utils';
import { MoreInfoButton } from '..';

interface ResourceCardProps {
  isNested?: boolean;
  resource: any;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  isNested,
  resource,
}) => {
  const [extraResource, setExtraResource] = useState<any[]>([]);

  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>, key: string) => {
      // Check for cached data
      const storedData = getFromLocalStorage(key);

      // if storedData value is truthy get it from localstorage
      if (storedData && Object.values(storedData).every((data) => data)) {
        setExtraResource(storedData.results ?? storedData);
      } else {
        // Get URL data from the button
        const linksToExtraResources = e.currentTarget.getAttribute('data-url');
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

          // Extract and update extra resource data
          const data = response.map((res) => res.data);
          setExtraResource(data);
        } catch (err) {
          console.error('Error fetching data:', err);
        }
      }
    },
    []
  );

  const renderContent = (key: string, value: any, content: string) => {
    // if field is array of urls show button with fetch functionality

    if (isArrayOfUrls(value) || isValueUrl(value)) {
      return isNested ? null : (
        <MoreInfoButton
          topic={key}
          onClick={(e) => handleClick(e, key)}
          value={value as string}
        />
      );
    }

    // show field only if it has content
    if (Boolean(value?.length)) {
      return <Typography>{content}</Typography>;
    }

    return null;
  };

  return (
    <Stack
      direction={extraResource?.length ? 'row' : 'column'}
      spacing={4}
      justifyContent='center'
      flexWrap='nowrap'
      useFlexGap
      key={resource.name}
    >
      <Card
        sx={{
          minWidth: 250,
          maxWidth: 500,
          minHeight: 500,
          background: isNested ? 'lightblue' : 'lightpurple',
        }}
      >
        {Object.entries(resource)
          .filter(([key]) => !['created', 'edited', 'url'].includes(key))
          .map(([key, value]) => {
            const content = `${key}: ${
              Array.isArray(value) ? value.join(', ') : value
            }`;

            return (
              <CardContent key={key}>
                {renderContent(key, value, content)}
              </CardContent>
            );
          })}
      </Card>
      {/* resursively  render ResourceCard to display extra fetched resource */}
      {extraResource.length
        ? extraResource.map((resource: any) => (
            <ResourceCard isNested key={resource.name} resource={resource} />
          ))
        : null}
    </Stack>
  );
};
