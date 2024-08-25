import React from 'react';

type LoadingProps = {
  isLoading: boolean;
};
export const Loading = ({ isLoading }: LoadingProps) => {
  return isLoading ? <div>Loading resources</div> : null;
};
