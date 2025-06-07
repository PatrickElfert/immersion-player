export type AnkiFields = {
  modelName: string;
  fields: string[];
};

export type ModelFields = {
  [modelName: string]: {
    fields: {
      text: string;
      selected: boolean;
    }[];
  };
};
