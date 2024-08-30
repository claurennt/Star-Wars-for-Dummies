export type InformationProps = {
  chosenResourceCount: number;
  chosenResource: string;
};

export type MoreInfoButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  value: string | string[];
  topic: string;
};

export interface ResourceCardProps<T> {
  isNested?: boolean;
  resource: T;
}

export interface ResourcesListProps<T> {
  resources: T[];
}
