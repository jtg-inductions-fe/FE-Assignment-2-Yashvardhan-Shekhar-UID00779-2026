import { Container } from '@mui/material';

import { Home } from '@pages';
import { ThemeProvider } from '@providers';

export const App = () => (
    <ThemeProvider>
        <Container maxWidth="xl">
            <Home />
        </Container>
    </ThemeProvider>
);
