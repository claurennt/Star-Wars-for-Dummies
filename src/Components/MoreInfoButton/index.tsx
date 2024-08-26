import Button from '@mui/material/Button';
import React from 'react';

type MoreInfoButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  value: string | string[];
  variant: 'outlined' | 'contained';
  topic: string;
};
export const MoreInfoButton = ({
  onClick,
  value,
  variant,
  topic,
}: MoreInfoButtonProps) => (
  <Button onClick={onClick} variant={variant} data-url={JSON.stringify(value)}>
    {variant === 'contained'
      ? `Discover all related ${topic}`
      : `Discover more info about ${topic}`}
  </Button>
);
