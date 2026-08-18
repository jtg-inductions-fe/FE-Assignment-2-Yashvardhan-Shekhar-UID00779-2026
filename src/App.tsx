import { Container, CssBaseline, ThemeProvider } from '@mui/material';

import { theme } from '@theme';

import { Home, OnBoarding } from './pages';
import { AppDispatch, useAppDispatch } from './store';
import { updateUser } from './store/userSlice';
import { User } from './types/User.types';

const App = () => {
    const user = JSON.parse(localStorage.getItem('user') || '') as User;

    const isPresent =
        false && user && user.name && user.email && user.id && user.role;

    const dispatch: AppDispatch = useAppDispatch();

    if (isPresent) {
        dispatch(updateUser(user));
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="xl">
                {isPresent ? <Home {...user} /> : <OnBoarding />};
            </Container>
        </ThemeProvider>
    );
};
export { App };
