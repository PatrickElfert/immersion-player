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

export type SelectedModelFields = {
  [modelName: string]: {
    selectedFields: string[];
  }
}

export type UpdateFieldMappingPayload = {
  modelName: string;
  selectedFields: string[];
}
