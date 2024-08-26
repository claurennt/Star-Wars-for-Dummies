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
      {resources?.map((resource: any) => (
        <ResourceCard key={resource.name} resource={resource} />
      ))}
    </Stack>
  );
};
