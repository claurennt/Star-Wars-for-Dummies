import { ResourceCard } from '..';

export const ResourcesList = ({ resources }: any) => {
  return (
    <div className='flex'>
      {resources.map((resource: any) => (
        <ResourceCard key={resources.name} {...resource} />
      ))}
    </div>
  );
};
