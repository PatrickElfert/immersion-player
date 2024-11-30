import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { createHashRouter, Navigate, RouterProvider } from 'react-router-dom';
import { FeatureContentLibrary } from '@immersion-player/feature-content-library-ui';
import { FeatureMediaPlayerUi } from '@immersion-player/feature-media-player-ui';
import {QueryClient, QueryClientProvider} from 'react-query';

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
