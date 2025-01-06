import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { createHashRouter, Navigate, RouterProvider } from 'react-router-dom';
import { FeatureContentLibrary } from '@immersion-player/feature-content-library-ui';
import { FeatureMediaPlayerUi } from '@immersion-player/feature-media-player-ui';
import {QueryClient, QueryClientProvider} from 'react-query';
import {persistQueryClient} from "react-query/persistQueryClient-experimental";
import {createWebStoragePersistor} from "react-query/createWebStoragePersistor-experimental";
import { toastConfig } from 'react-simple-toasts';
import toast, { Themes } from 'react-simple-toasts';
import 'node_modules/react-simple-toasts/dist/style.css';
import 'node_modules/react-simple-toasts/dist/theme/moonlight.css'
import 'node_modules/react-simple-toasts/dist/theme/success.css'
import 'node_modules/react-simple-toasts/dist/theme/failure.css'

toastConfig({theme: Themes.MOONLIGHT, position: 'top-right'})

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
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

const localStoragePersistor = createWebStoragePersistor({storage: window.localStorage})

persistQueryClient({
  queryClient,
  persistor: localStoragePersistor,
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
