import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from 'src/App';

const routes = [
  {
    path: '/',
    element: <App />,
  },
];

export const RoutesProvider = () => (
  <BrowserRouter>
    <Routes>
      {routes.map((route) => (
        <Route path={route.path} element={route.element} />
      ))}
    </Routes>
  </BrowserRouter>
);
