import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';

import { Main } from '@layouts';
import { ThemeProvider } from '@providers';
import { store } from '@store';

const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
    <StrictMode>
        <Provider store={store}>
            <ThemeProvider>
                <Main />
            </ThemeProvider>
        </Provider>
    </StrictMode>,
);
