type ErrorProps = {
  isError: boolean;
};
export const Error = ({ isError }: ErrorProps) => {
  return isError ? <div>Something went wrong, please try again</div> : null;
};
