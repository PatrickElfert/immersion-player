export type LookupResult = {
  token: string;
  definitions: PossibleDefinitions;
};
export type PossibleDefinitions = { [token: string]: { text: string; description: string }[] };
