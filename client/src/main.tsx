import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Router } from './app/routes/routes';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import './index.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider defaultColorScheme="dark">
      <Notifications />
      <Router />
    </MantineProvider>
  </StrictMode>
);
