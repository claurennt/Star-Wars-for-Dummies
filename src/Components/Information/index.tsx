import React from 'react';
type InformationProp = {
  dataType: string[];
  chosenResourceCount: number;
  chosenResource: string;
};
export const Information = ({
  dataType,
  chosenResourceCount,
  chosenResource,
}: InformationProp) => {
  return dataType.length ? (
    <>
      <h3>It seems like you have selected {chosenResource}</h3>
      <h4>
        Did you know that in the world of Star Wars there are {''}
        {chosenResourceCount} {chosenResource}?
      </h4>
    </>
  ) : null;
};
