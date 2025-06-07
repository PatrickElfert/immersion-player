import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app.js';
import { createHashRouter, Navigate, RouterProvider } from 'react-router-dom';
import { FeatureContentLibrary } from '@immersion-player/feature-content-library-ui';
import { FeatureSettingsUi } from '@immersion-player/feature-settings-ui';
import { FeatureMediaPlayerUi } from '@immersion-player/feature-media-player-ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { toastConfig } from 'react-simple-toasts';
import { Themes } from 'react-simple-toasts';
import 'node_modules/react-simple-toasts/dist/style.css';
import 'node_modules/react-simple-toasts/dist/theme/moonlight.css';
import 'node_modules/react-simple-toasts/dist/theme/success.css';
import 'node_modules/react-simple-toasts/dist/theme/failure.css';

toastConfig({ theme: Themes.MOONLIGHT, position: 'top-right' });

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Navigate to="Library" replace={true} />,
      },
      {
        path: 'Library',
        element: <FeatureContentLibrary />,
      },
      {
        path: 'Library/Player',
        element: <FeatureMediaPlayerUi />,
      },
      {
        path: 'Settings',
        element: <FeatureSettingsUi />,
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
});

persistQueryClient({
  queryClient,
  persister: localStoragePersister,
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
