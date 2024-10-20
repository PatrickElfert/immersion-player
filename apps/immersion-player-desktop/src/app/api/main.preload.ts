import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  getLibrary: (folderPath: string) => ipcRenderer.invoke('get-library', folderPath),
  platform: process.platform,
});
