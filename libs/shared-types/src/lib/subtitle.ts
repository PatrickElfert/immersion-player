import { LookupResult } from './lookup-result.js';

export interface Subtitle {
  index: number
  startTime: string
  endTime: string
  text: string[],
  lookupResult: LookupResult[]
}
