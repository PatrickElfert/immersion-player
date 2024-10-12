import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run immersion-player-ui:serve',
        production: 'nx run immersion-player-ui:preview',
      },
      ciWebServerCommand: 'nx run immersion-player-ui:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
