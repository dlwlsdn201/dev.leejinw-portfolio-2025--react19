import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RootLayout } from './layout';
import Intro from 'src/pages/Intro';

interface Route {
  path: string;
  label: string;
  element: React.ReactElement;
}

export const routes: Route[] = [
  {
    path: '/',
    label: 'Intro',
    element: <Intro />,
  },
  {
    path: '/projects',
    label: 'Projects',
    element: <Intro />,
  },
  {
    path: '/comments',
    label: 'Comments',
    element: <Intro />,
  },
];

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: routes,
  },
]);

export const Router = () => <RouterProvider router={router} />;
