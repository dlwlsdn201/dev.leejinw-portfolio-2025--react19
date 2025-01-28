import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from 'src/App';
import { RootLayout } from './layout';

const routes = [
  {
    path: '/',
    element: <App />,
  },
];

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: routes,
  },
]);

export const Router = () => <RouterProvider router={router} />;
