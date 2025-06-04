import { app, shell, BrowserWindow, ipcMain, protocol } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import { rendererAppName } from './constants.js';
import { loadLibrary } from '@immersion-player/feature-content-provider';
import { parseSrt } from '@immersion-player/feature-dictionary-lookup';
import * as path from 'path';
import { CreateFlashcardDto } from '@immersion-player/shared-types';
import { createFlashcard } from '@immersion-player/feature-flashcard-creation';
import {
  loadFieldsByNoteType,
  loadModelFields,
  loadSettings,
  selectMediaFolder,
} from '@immersion-player/feature-settings';
import ffmpegPath from 'ffmpeg-static';
import { path as ffprobePath } from 'ffprobe-static';
import ffmpeg from 'fluent-ffmpeg';

protocol.registerSchemesAsPrivileged([
  {
    scheme: 'media',
    privileges: {
      secure: true,
      supportFetchAPI: true,
      bypassCSP: true,
      stream: true,
    },
  },
]);

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 1280,
    minHeight: 720,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.mjs'),
      sandbox: false,
    },
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '..', '..', rendererAppName, 'index.html'));
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  if (ffmpegPath && ffprobePath) {
    ffmpeg.setFfmpegPath(ffmpegPath.replace('app.asar', 'app.asar.unpacked'));
    ffmpeg.setFfprobePath(ffprobePath.replace('app.asar', 'app.asar.unpacked'));
  }

  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron');

  /** https://github.com/electron/electron/issues/38749 **/
  protocol.registerFileProtocol('media', (request, callback) => {
    const url = new URL(request.url);
    const filePath = path.normalize(decodeURIComponent(url.pathname));
    callback(filePath);
  });

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  ipcMain.handle('get-library', async (event) => {
    return loadLibrary();
  });

  ipcMain.handle('parse-srt', async (event, srtPath: string) => {
    return parseSrt(srtPath);
  });

  ipcMain.handle('create-flashcard', async (event, flashcard: CreateFlashcardDto) => {
    return createFlashcard(flashcard);
  });

  ipcMain.handle('select-media-folder', async (event) => selectMediaFolder());
  ipcMain.handle('get-user-settings', (event) => loadSettings());
  ipcMain.handle('load-model-fields', (event) => loadModelFields());

  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
