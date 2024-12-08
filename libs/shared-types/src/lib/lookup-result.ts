import {JMdictWord} from "@scriptin/jmdict-simplified-types";

export interface LookupResult {
  token: string;
  lookupResult: JMdictWord[];
}
