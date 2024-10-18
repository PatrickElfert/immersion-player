import axios from 'axios';
import {ankiConnectUrl, version} from "./config";

export interface BasicModel {
  Front: string;
  Back: string;
}

interface StoreMediaFile {
  path: string;
  fields: string[]
  filename: string;
}

export interface AddNotePayload {
  deckName: string;
  fields: BasicModel;
  options: {
    allowDuplicate: boolean;
  }
  picture?: StoreMediaFile[];
  audio?: StoreMediaFile[];
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
        modelName: 'Basic',
        ...payload,
      }
    },
  })).data;
}
