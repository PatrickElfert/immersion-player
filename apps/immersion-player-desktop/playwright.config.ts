import { defineConfig, devices } from '@playwright/test';
import { nxE2EPreset } from '@nx/playwright/preset';
import { fileURLToPath } from 'node:url';
import { SerenityFixtures, SerenityWorkerFixtures } from '@serenity-js/playwright-test';
// eslint-disable-next-line @typescript-eslint/no-unused-vars

// For CI, you may want to set BASE_URL to the deployed application.

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const __filename = fileURLToPath(import.meta.url);

export default defineConfig<SerenityFixtures, SerenityWorkerFixtures>({
  webServer: {
    command: `npx nx run immersion-player-ui:serve`,
    port: 4200,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  timeout: 60000,
  ...nxE2EPreset(__filename, { testDir: './e2e' }),
  retries: 1,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  reporter: [
    [ 'html', { open: 'never' } ],
    [ '@serenity-js/playwright-test', {
      crew: [
        '@serenity-js/console-reporter',
      ]
    }]
  ],
});
