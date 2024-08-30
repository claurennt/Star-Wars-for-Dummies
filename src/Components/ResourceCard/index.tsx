import { useState } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import {
  getFetchedData,
  getFromLocalStorage,
  isArrayOfUrls,
  isValueUrl,
  memoizedTransformFieldName,
} from '../../utils';
import { ResourceCardProps, StarWarsResource } from '../../types';

import { MoreInfoButton } from '..';

const filterFields = ([key]: [string, any]): boolean =>
  !['created', 'edited', 'url'].includes(key);

const getContent = (key: string, value: any) =>
  `${key}: ${Array.isArray(value) ? value.join(', ') : value}`;

export const ResourceCard = ({
  isNested,
  resource,
}: ResourceCardProps<StarWarsResource>) => {
  const [extraResource, setExtraResource] = useState<any[]>([]);

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
    key: string
  ) => {
    // Check for cached data
    const storedData = getFromLocalStorage(key);

    // if storedData value is truthy get it from localstorage
    if (storedData && Object.values(storedData).every((data) => data)) {
      setExtraResource(storedData.results ?? storedData);
    } else {
      // Get URL data from the button
      const linksToExtraResources =
        e.currentTarget.getAttribute('data-url') || '';
      const data = await getFetchedData(linksToExtraResources);
      setExtraResource(data);
    }
  };

  const renderContent = (
    key: string,
    value: string | string[],
    content: string
  ) => {
    // if field is array of urls show button with fetch functionality

    if (isArrayOfUrls(value) || isValueUrl(value)) {
      return isNested ? null : (
        <MoreInfoButton
          key={key}
          topic={key}
          onClick={(e) => handleClick(e, key)}
          value={value as string}
        />
      );
    }

    // show field only if it has content
    if (Boolean(value?.length)) {
      return (
        <Typography key={key}>{memoizedTransformFieldName(content)}</Typography>
      );
    }

    return null;
  };
  const cardContent: React.ReactNode[] = Object.entries(resource)
    .filter(filterFields)
    .map(([key, value]) => {
      const content = getContent(key, value);
      return renderContent(key, value, content);
    });
  return (
    <Stack
      direction={extraResource?.length ? 'row' : 'column'}
      spacing={4}
      justifyContent='center'
      flexWrap='nowrap'
      useFlexGap
    >
      <Card
        raised
        sx={{
          minWidth: 250,
          maxWidth: 500,
          minHeight: 500,
          background: isNested ? 'lightblue' : 'lightpurple',
        }}
      >
        <CardContent style={{ lineHeight: '80px' }}>{cardContent}</CardContent>
      </Card>
      {/* resursively  render ResourceCard to display extra fetched resource */}
      {extraResource.length
        ? extraResource.map((resource: StarWarsResource, index: number) => (
            <ResourceCard
              isNested
              key={`nested-${resource.created}-${index}`}
              resource={resource}
            />
          ))
        : null}
    </Stack>
  );
};
