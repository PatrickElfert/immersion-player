export type AnkiFields = {
  modelName: string;
  fields: string[];
};

export type SelectedAnkiFields = {
  modelName: string;
  fields: {
    text: string;
    selected: boolean;
  }[]
};
