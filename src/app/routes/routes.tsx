import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RootLayout } from './layout';
import Intro from 'src/pages/Intro';
import { CommentPage } from '@/pages/Comment';

export type Path = '/' | '/projects' | '/comment';

interface Route {
  path: Path;
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
    path: '/comment',
    label: 'Comment',
    element: <CommentPage />,
  },
];

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: routes,
  },
]);

export const Router = () => <RouterProvider router={router} />;
