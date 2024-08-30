import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { ResourcesList, Information } from './Components';
import { getFromLocalStorage, saveToLocalStorage } from './utils';
import { ResourceMapping, ResourceName, StoredData } from './types';

function App() {
  const [resources, setResources] = useState<ResourceName[]>([]);
  const [selectedField, setSelectedField] = useState<ResourceName | ''>('');
  const [allData, setAllData] = useState<
    Record<ResourceName, any> | undefined
  >();

  // Fetch resource names and update state
  const fetchResourcesName = async () => {
    try {
      const { data } = await axios.get<{ [key: string]: string }>(
        'https://swapi.dev/api/'
      );
      const nameOfResources = Object.keys(data) as ResourceName[];

      setResources(nameOfResources);
      saveToLocalStorage('nameOfResources', nameOfResources);
    } catch (err) {
      console.log(err);
    }
  };

  const isResourceName = (key: any): key is ResourceName => {
    return allData !== undefined && key in allData;
  };

  // Fetch data for each resource once resource names are available
  const fetchResources = async (nameOfResources: ResourceName[]) => {
    try {
      // Create a list of promises for fetching data
      const promises = nameOfResources.map((resource) =>
        axios.get<ResourceMapping[ResourceName]>(
          `https://swapi.dev/api/${resource}`
        )
      );

      // Wait for all promises to resolve
      const response = await Promise.all(promises);

      // Create a state with mapped data and cache data to local storage
      const resourceData = nameOfResources.reduce((acc, curr, index) => {
        acc[curr] = response[index].data;

        saveToLocalStorage(curr, response[index].data);
        return acc;
      }, {} as Record<ResourceName, any>);

      setAllData(resourceData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const storedResources = getFromLocalStorage('nameOfResources') as
      | ResourceName[]
      | null;

    // set state with cached data if available else fetch
    if (storedResources) {
      setResources(storedResources);
    } else {
      fetchResourcesName();
    }
  }, []);

  // Trigger fetching of actual resource data once resource names are available
  useEffect(() => {
    if (resources.length > 0) {
      // create mapped data structure from cached data
      const storedData: StoredData = resources.length
        ? resources.reduce((acc, curr) => {
            const data = getFromLocalStorage(curr);
            acc[curr] = data;

            return acc;
          }, {} as StoredData)
        : ({} as StoredData);

      // set state with cached data if available else fetch
      if (Object.values(storedData).every((data) => data)) {
        setAllData(storedData);
      } else {
        fetchResources(resources);
      }
    }
  }, [resources]);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.innerText.toLowerCase() as ResourceName;
    setSelectedField(value);
  };

  return (
    <div className='App'>
      <h1>Star Wars for Dummies</h1>
      <h2>To start exploring the world of Star Wars pick a resource below:</h2>
      <Stack direction='row' spacing={2} justifyContent='center'>
        {resources?.map((resource) => (
          <Button variant='contained' onClick={handleClick} key={resource}>
            {resource}
          </Button>
        ))}
      </Stack>
      <main>
        {isResourceName(selectedField) && allData?.[selectedField] && (
          <Information
            chosenResource={selectedField}
            chosenResourceCount={allData[selectedField]?.count}
          />
        )}
        <Stack
          direction='column'
          spacing={4}
          justifyContent='center'
          flexWrap='wrap'
          useFlexGap
        >
          {selectedField && (
            <ResourcesList resources={allData?.[selectedField]?.results} />
          )}
        </Stack>
      </main>
    </div>
  );
}

export default App;
