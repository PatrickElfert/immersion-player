import SquirrelEvents from './app/events/squirrel.events';
import ElectronEvents from './app/events/electron.events';
import {app, BrowserWindow, protocol} from 'electron';
import App from './app/app';

export default class Main {
  static initialize() {


    protocol.registerSchemesAsPrivileged([
      {
        scheme: 'media',
        privileges: {
          secure: true,
          supportFetchAPI: true,
          bypassCSP: true,
          stream: true
        }
      }
    ]);

    if (SquirrelEvents.handleEvents()) {
      // squirrel event handled (except first run event) and app will exit in 1000ms, so don't do anything else
      app.quit();
    }
  }

  static bootstrapApp() {
    App.main(app, BrowserWindow);
  }

  static bootstrapAppEvents() {
    ElectronEvents.bootstrapElectronEvents();

    // initialize auto updater service
    if (!App.isDevelopmentMode()) {
      // UpdateEvents.initAutoUpdateService();
    }
  }
}

// handle setup events as quickly as possible
Main.initialize();

// bootstrap app
Main.bootstrapApp();
Main.bootstrapAppEvents();
