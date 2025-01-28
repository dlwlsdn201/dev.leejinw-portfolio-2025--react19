import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import '@mantine/core/styles.css';
import { RoutesProvider } from './app/routes/routes';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RoutesProvider />
  </StrictMode>
);
