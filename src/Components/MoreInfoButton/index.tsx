import Button from '@mui/material/Button';
import { MoreInfoButtonProps } from '../../types';

export const MoreInfoButton = ({
  onClick,
  value,
  topic,
}: MoreInfoButtonProps) => (
  <Button
    onClick={onClick}
    variant={typeof value === 'string' ? 'outlined' : 'contained'}
    data-url={JSON.stringify(value)}
  >
    {typeof value === 'string'
      ? `Discover more info about ${topic}`
      : `Discover all related ${topic}`}
  </Button>
);
