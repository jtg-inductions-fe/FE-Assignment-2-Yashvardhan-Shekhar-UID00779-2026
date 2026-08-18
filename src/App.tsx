import { Container, CssBaseline, ThemeProvider } from '@mui/material';

import { theme } from '@theme';

import { Home, OnBoarding } from './pages';
import { AppDispatch, useAppDispatch } from './store';
import { updateUser } from './store/userSlice';
import { User } from './types/User.types';

const App = () => {
    const temp = {
        name: 'User',
        email: 'user@gmail.com',
        id: 'userid98',
        role: 'customer',
    };
    localStorage.setItem('user', JSON.stringify(temp));

    const user = JSON.parse(localStorage.getItem('user') || '') as User;

    const isPresent =
        user && user.name && user.email && user.id && user.role ? true : false;

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
