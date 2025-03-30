import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import '@shared/styles/animation.css';
import '@mantine/core/styles.css';
import { Router } from './app/routes/routes';
import { MantineProvider } from '@mantine/core';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider defaultColorScheme="dark">
      <Router />
    </MantineProvider>
  </StrictMode>
);
