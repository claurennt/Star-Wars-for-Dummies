import { ResourceCard } from '..';
import Stack from '@mui/material/Stack';
import { ResourcesListProps } from '../../types';

export const ResourcesList = <T,>({ resources }: ResourcesListProps<T>) => {
  return (
    <Stack
      direction='column'
      spacing={4}
      justifyContent='center'
      flexWrap='wrap'
    >
      {resources?.map((resource: any, index: number) => (
        <ResourceCard
          key={`main-${resource.created}-${index}`}
          resource={resource}
        />
      ))}
    </Stack>
  );
};
