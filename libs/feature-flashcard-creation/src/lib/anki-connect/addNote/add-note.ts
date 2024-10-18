import axios from 'axios';
import {ankiConnectUrl, version} from "../config";

interface StoreMediaFile {
  path: string;
  fields: string[]
  filename: string;
}

export interface AddNotePayload {
  deckName: string;
  fields: object;
  options: {
    allowDuplicate: boolean;
  }
  picture?: StoreMediaFile[];
  audio?: StoreMediaFile[];
  modelName: string;
}

export interface AddNoteResult {
  result: number;
  error: string | null;
}

export async function addNote(payload: AddNotePayload): Promise<AddNoteResult> {
  return (await axios.post(ankiConnectUrl, {
    action: 'addNote',
    version,
    params: {
      note: {
        ...payload,
      }
    },
  })).data;
}
