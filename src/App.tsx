import { Provider } from 'react-redux';

import { Main } from '@layouts';
import { ThemeProvider } from '@providers';
import { store } from '@store';

export const App = () => (
    <Provider store={store}>
        <ThemeProvider>
            <Main />
        </ThemeProvider>
    </Provider>
);
