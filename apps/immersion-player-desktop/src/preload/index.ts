import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
import { CreateFlashcardDto, ModelFields, UpdateFieldMappingPayload } from '@immersion-player/shared-types';

// Custom APIs for renderer
const api = {
  getLibrary: (folderPath) => ipcRenderer.invoke('get-library', folderPath),
  parseSubtitles: (srtPath) => ipcRenderer.invoke('parse-srt', srtPath),
  createFlashcard: (flashcard: CreateFlashcardDto) => ipcRenderer.invoke('create-flashcard', flashcard),
  selectMediaFolder: () => ipcRenderer.invoke('select-media-folder'),
  getUserSettings: () => ipcRenderer.invoke('get-user-settings'),
  loadModelFields: () => ipcRenderer.invoke('load-model-fields'),
  selectModelFields: (payload: UpdateFieldMappingPayload) => ipcRenderer.invoke('select-model-fields', payload),
  getKnownWordsStats: () => ipcRenderer.invoke('get-known-words-stats'),
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
