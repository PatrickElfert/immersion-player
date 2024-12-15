import { LookupResult } from './lookup-result';

export interface Subtitle {
  index: number
  startTime: string
  endTime: string
  text: string[],
  tokens: LookupResult[]
}
