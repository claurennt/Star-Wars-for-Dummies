import axios, { AxiosResponse } from 'axios';
import './App.css';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { ResourcesList, Information } from './Components';
import { getFromLocalStorage, saveToLocalStorage } from './utils';

interface ApiReturnDataStructure {
  count: number;
  previous: null | string;
  next: null | string;
  results: [{ [key: string]: any }] | null;
}
function App() {
  const [resources, setResources] = useState<string[]>([]);
  const [selectedField, setSelectedField] = useState<string>('');
  const [allData, setAllData] = useState<{
    [key: string]: ApiReturnDataStructure;
  }>({});

  // Fetch resource names and update state
  const fetchResourcesName = async () => {
    try {
      const { data } = await axios.get<AxiosResponse>('https://swapi.dev/api/');
      const nameOfResources = Object.keys(data);

      setResources(nameOfResources);
      saveToLocalStorage('nameOfResources', nameOfResources);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch data for each resource once resource names are available
  const fetchResources = async (nameOfResources: string[]) => {
    try {
      const promises = nameOfResources.map((resource: string) =>
        axios.get(`https://swapi.dev/api/${resource}`)
      );
      const response = await Promise.all(promises);

      // create state with mapped data and cache data to localstorage
      const resourceData = nameOfResources.reduce((acc, curr, index) => {
        acc[curr] = response[index].data;

        saveToLocalStorage(curr, response[index].data);
        return acc;
      }, {} as Record<string, any>);

      setAllData(resourceData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const storedResources = getFromLocalStorage('nameOfResources') as
      | string[]
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
    // create mapped data structure from cached data
    const storedData = resources.length
      ? resources.reduce((acc, curr, index) => {
          const data = getFromLocalStorage(curr);
          acc[curr] = data;

          return acc;
        }, {} as Record<string, any>)
      : {};

    // set state with cached data if available else fetch
    if (Object.values(storedData).every((data) => data)) {
      setAllData(storedData);
    } else {
      fetchResources(resources);
    }
  }, [resources]);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.innerText.toLowerCase();
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
        {allData[selectedField] && (
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
            <ResourcesList resources={allData[selectedField]?.results} />
          )}
        </Stack>
      </main>
    </div>
  );
}

export default App;
