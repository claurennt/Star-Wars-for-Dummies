import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Loading, Error } from './Components';

function App() {
  const [resources, setResources] = useState<string[]>([]); //TODO: get from localstorage
  const [selectedData, setSelectedData] = useState<{ [key: string]: {} }>({}); //TODO: get from localstorage
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const { data } = await axios.get('https://swapi.dev/api/');
        const nameOfResources = Object.keys(data);

        //TODO: save to localstorage
        setResources(nameOfResources);
        setSelectedData(
          Object.fromEntries(nameOfResources.map((resource) => [resource, {}]))
        );
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setIsError(true);
      }
    };

    fetchResources();
  }, []);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.innerText.toLowerCase();

    try {
      const { data } = await axios.get(`https://swapi.dev/api/${value}?page=1`);

      //TODO: save to localstorage
      setSelectedData((prev) => ({
        ...prev,
        [value]: data,
      }));
    } catch (err) {
      setIsError(true);
    }
  };

  // Extract keys from selectedData where the associated values are non-empty objects
  const dataType = Object.entries(selectedData)
    .filter(([_, value]) => {
      // Check if the value object has one or more properties
      return Object.keys(value).length > 0;
    })
    .map(([key, _]) => key); // Extract only the key from the filtered entries

  return (
    <div className='App'>
      <h1>Star Wars for Dummies</h1>
      <h2>To start exploring the world of Star Wars pick a resource below:</h2>
      <Loading isLoading={isLoading} />
      <Stack direction='row' spacing={2} justifyContent='center'>
        {resources?.map((resource) => (
          <Button variant='contained' onClick={handleClick} key={resource}>
            {resource}
          </Button>
        ))}
      </Stack>
      <Error isError={isError} />
      {dataType.length ? (
        <p>It seems like you have selected {dataType[dataType.length - 1]}</p>
      ) : null}
    </div>
  );
}

export default App;
