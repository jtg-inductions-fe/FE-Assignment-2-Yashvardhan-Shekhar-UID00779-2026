import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux'

import { Container, CssBaseline, ThemeProvider } from '@mui/material';

import { theme } from '@theme';

import App from './app';
import { store } from './store'

const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <Container maxWidth="lg">
                    <CssBaseline />
                    <App />
                </Container>
            </Provider>
        </ThemeProvider>
    </StrictMode>,
);
