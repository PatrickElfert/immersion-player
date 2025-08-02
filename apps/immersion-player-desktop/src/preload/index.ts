import { contextBridge, ipcRenderer } from 'electron';
import { CreateFlashcardDto, UpdateFieldMappingPayload } from '@immersion-player/shared-types';
import log from 'electron-log/renderer.js';

// Custom APIs for renderer
const api = {
  getLibrary: () => ipcRenderer.invoke('get-library'),
  parseSubtitles: (srtPath: string) => ipcRenderer.invoke('parse-srt', srtPath),
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
log.info('Preload script running');
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    log.error(error);
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
