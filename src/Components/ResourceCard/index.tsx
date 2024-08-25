import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

interface ResourceCardProps {
  [key: string]: any;
}

export const ResourceCard = (props: ResourceCardProps) => {
  const data = Object.entries(props);

  // Filter out entries where the key is 'created' or 'edited'
  const relevantData = data.filter(
    ([key]) => !['created', 'edited'].includes(key)
  );

  return (
    <Card sx={{ maxWidth: 500 }}>
      {relevantData.map(([key, value]) => {
        // Determine if the value is an array of strings
        const isArrayOfStrings =
          Array.isArray(value) &&
          value.every((item) => typeof item === 'string');

        // Determine if the value should be rendered as a link
        const isLink =
          (typeof value === 'string' && value.startsWith('http')) ||
          (isArrayOfStrings && value.some((item) => item.startsWith('http')));

        // Prepare content string
        const content = `${key}: ${
          isArrayOfStrings ? value.join(', ') : value
        }`;

        return (
          <CardContent key={key}>
            {isArrayOfStrings ? (
              // Render a button if value is an array of links
              isLink ? (
                <Button
                  variant='contained'
                  color='primary'
                  href={value[0]} // Using the first URL as the button link
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Discover all related {key}
                </Button>
              ) : (
                <Typography>{content}</Typography>
              )
            ) : isLink ? (
              <a
                href={value as string}
                target='_blank'
                rel='noopener noreferrer'
              >
                <Typography>{content}</Typography>
              </a>
            ) : (
              <Typography>{content}</Typography>
            )}
          </CardContent>
        );
      })}
    </Card>
  );
};
