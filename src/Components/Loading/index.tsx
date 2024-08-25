import React from 'react';

type LoadingProps = {
  isLoading: boolean;
};
export const Loading = ({ isLoading }: LoadingProps) => {
  return isLoading ? <div>Something went wrong, please try again</div> : null;
};
