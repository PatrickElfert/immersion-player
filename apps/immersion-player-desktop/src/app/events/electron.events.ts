/**
 * This module is responsible on handling all the inter process communications
 * between the frontend to the electron backend.
 */

import { app, ipcMain } from 'electron';
import { environment } from '../../environments/environment';
import {loadLibrary} from "@immersion-player/feature-content-provider";
import {parseSrt} from "@immersion-player/feature-dictionary-lookup";

export default class ElectronEvents {
  static bootstrapElectronEvents(): Electron.IpcMain {
    return ipcMain;
  }
}

// Retrieve app version
ipcMain.handle('get-app-version', (event) => {
  console.log(`Fetching application version... [v${environment.version}]`);

  return environment.version;
});

ipcMain.handle('get-library', async (event, folderPath: string) => {
  return loadLibrary(folderPath);
});

ipcMain.handle('parse-srt', async (event, srtPath: string) => {
  return parseSrt(srtPath);
});

// Handle App termination
ipcMain.on('quit', (event, code) => {
  app.exit(code);
});
