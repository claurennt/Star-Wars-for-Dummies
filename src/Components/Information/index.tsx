type InformationProp = {
  chosenResourceCount: number;
  chosenResource: string;
};
export const Information = ({
  chosenResourceCount,
  chosenResource,
}: InformationProp) => {
  return (
    <>
      <h3>It seems like you have selected {chosenResource}</h3>
      <h4>
        Did you know that in the world of Star Wars there are {''}
        {chosenResourceCount} {chosenResource}?
      </h4>
    </>
  );
};
