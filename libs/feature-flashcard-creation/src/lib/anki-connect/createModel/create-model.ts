import axios from 'axios';
import {ankiConnectUrl, version} from "../config";

export interface CreateModelPayload {
  modelName: string;
  inOrderFields: string[];
  css: string;
  isCloze: boolean;
  cardTemplate: [
    {
      Name: string;
      Front: string;
      Back: string;
    }
  ];
}

export async function createModel(payload: {
  modelName: string;
  css: string;
  isCloze: boolean;
  cardTemplates: { Front: string; Back: string; Name: string }[];
  inOrderFields: string[];
}) {
  return (
    await axios.post(ankiConnectUrl, {
      action: 'createModel',
      version,
      params: {
        ...payload,
      },
    })
  ).data;
}
