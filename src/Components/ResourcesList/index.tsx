import { ResourceCard } from '..';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { ResourcesListProps } from '../../types';

export const ResourcesList = <T,>({ resources }: ResourcesListProps<T>) => {
  return (
    <Box
      component='section'
      sx={{
        overflow: 'scroll',
      }}
    >
      <Stack
        direction='row'
        spacing={4}
        justifyContent='center'
        sx={{ width: 'min-content', margin: '14px' }}
        useFlexGap
      >
        {resources?.map((resource: any, index: number) => (
          <ResourceCard
            key={`main-${resource.created}-${index}`}
            resource={resource}
          />
        ))}{' '}
      </Stack>
    </Box>
  );
};
