import { ResourceCard } from '..';
import Stack from '@mui/material/Stack';

export const ResourcesList = ({ resources }: any) => {
  return (
    <Stack
      direction='column'
      spacing={4}
      justifyContent='center'
      flexWrap='wrap'
    >
      {resources?.map((resource: any, index: number) => (
        <ResourceCard
          key={`main-${resource.name}-${index}`}
          resource={resource}
        />
      ))}
    </Stack>
  );
};
