import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { isArrayOfUrls, isValueUrl } from '../../utils';

interface ResourceCardProps {
  isNested?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  [key: string]: any;
}

export const ResourceCard: React.FC<ResourceCardProps> = (props) => {
  const { isNested, onClick, resource, extraResource } = props;

  return (
    <Stack
      direction={extraResource?.length ? 'row' : 'column'}
      spacing={4}
      justifyContent='center'
      flexWrap='nowrap'
      useFlexGap
    >
      <Card
        sx={{
          minWidth: 250,
          maxWidth: 500,
          minHeight: 500,
          background: isNested ? 'lightblue' : 'lightpurple',
        }}
      >
        {Object.entries(resource)
          .filter(([key, value]) => {
            // exclude those two fields from shown data
            if (['created', 'edited'].includes(key)) {
              return false;
            }
            // filter out if nested and the value is a URL or an array of URLs
            return isNested
              ? !(isValueUrl(value) || isArrayOfUrls(value))
              : true;
          })
          .map(([key, value]) => {
            const content = `${key}: ${
              Array.isArray(value) ? value.join(', ') : value
            }`;

            return (
              <CardContent key={key}>
                {!isNested ? (
                  isArrayOfUrls(value) ? (
                    <Button
                      data-name={resource.name}
                      onClick={onClick}
                      variant='contained'
                      data-url={JSON.stringify(value)}
                    >
                      Discover all related {key}
                    </Button>
                  ) : isValueUrl(value) ? (
                    <Button
                      data-name={resource.name}
                      onClick={onClick}
                      variant='outlined'
                      data-url={JSON.stringify(value)}
                    >
                      Discover more information about {key}
                    </Button>
                  ) : (
                    <Typography>{content}</Typography>
                  )
                ) : (
                  <Typography>{content}</Typography>
                )}
              </CardContent>
            );
          })}
      </Card>
      {extraResource?.length &&
        extraResource.map((resource: any) => (
          <ResourceCard isNested key={resource.name} resource={resource} />
        ))}
    </Stack>
  );
};
