import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  getLibrary: (folderPath: string) => ipcRenderer.invoke('get-library', folderPath),
  parseSubtitles: (srtPath: string) => ipcRenderer.invoke('parse-srt', srtPath),
  platform: process.platform,
});
