import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RootLayout } from './layout';
import App from 'src/pages/App';

interface Route {
  path: string;
  label: string;
  element: React.ReactElement;
}

export const routes: Route[] = [
  {
    path: '/',
    label: 'Intro',
    element: <App />,
  },
  {
    path: '/projects',
    label: 'Projects',
    element: <App />,
  },
  {
    path: '/comments',
    label: 'Comments',
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
