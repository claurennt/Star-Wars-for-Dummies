import axios, { AxiosResponse } from 'axios';
import './App.css';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Loading, Error, ResourceCard } from './Components';

interface ApiReturnDataStructure {
  count: number;
  previous: null | string;
  next: null | string;
  results: [{ [key: string]: any }] | null;
}
function App() {
  const [resources, setResources] = useState<string[]>([]); //TODO: get from localstorage
  const [selectedData, setSelectedData] = useState<{
    [key: string]: ApiReturnDataStructure;
  }>({}); //TODO: get from localstorage
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const { data } = await axios.get<AxiosResponse>(
          'https://swapi.dev/api/'
        );
        const nameOfResources = Object.keys(data);

        //TODO: save to localstorage
        setResources(nameOfResources);
        setSelectedData(
          Object.fromEntries(
            nameOfResources.map((resource) => [
              resource,
              { count: 0, previous: null, next: null, results: null },
            ])
          )
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

  const dataType =
    selectedData &&
    Object.entries(selectedData)
      .filter(([key, value]) => value.count)
      .map(([key, _]) => key);

  const chosenResource = dataType[dataType.length - 1];
  console.log(selectedData[chosenResource]?.results);
  const chosenResourceCount = (
    selectedData[chosenResource] as ApiReturnDataStructure
  )?.count;

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
        <>
          <p>It seems like you have selected {chosenResource}</p>
          <p>
            Did you know that in the world of Star Wars there are
            {chosenResourceCount} {chosenResource}?
          </p>
        </>
      ) : null}
      <Stack
        direction='row'
        spacing={4}
        justifyContent='center'
        flexWrap='wrap'
        useFlexGap
      >
        {selectedData[chosenResource]?.results?.map((result: any) => (
          <ResourceCard {...result} key={result.name} />
        ))}
      </Stack>
    </div>
  );
}

export default App;
