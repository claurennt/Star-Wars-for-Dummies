import { styled } from '@mui/material/styles';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button, { ButtonProps } from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { ResourcesButtonsProps } from '../../types';

const CustomButton = styled(Button)<ButtonProps & { index: number }>({
  color: '#333333',
  background: '#34D399',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#258a65',
    color: 'white',
  },
  '&:active': {
    backgroundColor: '#333333',
    color: '#34D399',
  },
});

export const ResourcesButtons = ({
  resources,
  handleClick,
}: ResourcesButtonsProps) => (
  <Stack direction='row' spacing={2} justifyContent='center'>
    <ButtonGroup
      variant='outlined'
      aria-label='Star Wars resources'
      sx={{ gap: '10px' }}
    >
      {resources?.map((resource, index: number) => (
        <CustomButton
          variant='contained'
          onClick={handleClick}
          key={resource}
          index={index}
        >
          {resource}
        </CustomButton>
      ))}
    </ButtonGroup>
  </Stack>
);
