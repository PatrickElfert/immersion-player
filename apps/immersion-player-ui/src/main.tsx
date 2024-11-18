import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import {FeatureContentLibrary} from "@immersion-player/feature-content-library-ui";
import {FeatureMediaPlayerUi} from "@immersion-player/feature-media-player-ui";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/content-library"/>
      },
      {
        path: 'content-library',
        element: <FeatureContentLibrary/>
      },
      {
        path: 'media-player',
        element: <FeatureMediaPlayerUi/>
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
);
