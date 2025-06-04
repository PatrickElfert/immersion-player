import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
import { CreateFlashcardDto } from '@immersion-player/shared-types';

// Custom APIs for renderer
const api = {
  getLibrary: (folderPath) => ipcRenderer.invoke('get-library', folderPath),
  parseSubtitles: (srtPath) => ipcRenderer.invoke('parse-srt', srtPath),
  createFlashcard: (flashcard: CreateFlashcardDto) => ipcRenderer.invoke('create-flashcard', flashcard),
  selectMediaFolder: () => ipcRenderer.invoke('select-media-folder'),
  getUserSettings: () => ipcRenderer.invoke('get-user-settings'),
  loadNoteTypes: () => ipcRenderer.invoke('load-note-types'),
  loadFieldsByNoteType: (name: string) => ipcRenderer.invoke('load-fields-by-note-type', name),
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
