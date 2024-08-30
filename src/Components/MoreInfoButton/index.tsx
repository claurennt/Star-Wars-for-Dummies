import Button, { ButtonProps } from '@mui/material/Button';
import { MoreInfoButtonProps } from '../../types';
import { styled } from '@mui/material/styles';

const CustomButton = styled(Button)<ButtonProps>({
  display: 'block',
  background: '#333333',
  color: '#34D399',
  fontWeight: 'bold',
  top: '10px',
  margin: '5px',
  '&:hover': {
    backgroundColor: '#258a65',
    color: 'white',
  },
  '&:active': {
    backgroundColor: '#333333',
    color: '#34D399',
  },
});
export const MoreInfoButton = ({
  onClick,
  value,
  topic,
}: MoreInfoButtonProps) => (
  <CustomButton
    onClick={onClick}
    variant={typeof value === 'string' ? 'outlined' : 'contained'}
    data-url={JSON.stringify(value)}
  >
    {topic}
  </CustomButton>
);
