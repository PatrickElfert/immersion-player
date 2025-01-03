import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { resolve } from 'path';

export default defineConfig({
  main: {
    root: __dirname,
    build: {
      outDir: '../../dist/apps/immersion-player-desktop/main',
      rollupOptions: {
        input: {
          index: resolve(__dirname, "/src/main/index.ts"),
        }
      }
    },
    plugins: [externalizeDepsPlugin(), nxViteTsPaths()]
  },
  preload: {
    root: __dirname,
    plugins: [externalizeDepsPlugin(), nxViteTsPaths()],
    build: {
      outDir: '../../dist/apps/immersion-player-desktop/preload',
      emptyOutDir: true,
      rollupOptions: {
        input: {
          index: resolve(__dirname, "/src/preload/index.ts"),
        }
      }
    },
  },
})
