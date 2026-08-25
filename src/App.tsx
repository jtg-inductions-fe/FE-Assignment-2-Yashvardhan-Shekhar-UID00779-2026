import { Container } from '@mui/material';

import { Home, OnBoarding } from '@pages';
import { ThemeProvider } from '@providers';
import { updateUser, useAppDispatch } from '@store';
import { AppDispatch, User } from '@types';

export const App = () => {
    const user = JSON.parse(localStorage.getItem('user') || '') as User;

    const isPresent =
        false && user && user.name && user.email && user.id && user.role;

    const dispatch: AppDispatch = useAppDispatch();

    if (isPresent) {
        dispatch(updateUser(user));
    }

    return (
        <ThemeProvider>
            <Container maxWidth="xl">
                {isPresent ? <Home /> : <OnBoarding />};
            </Container>
        </ThemeProvider>
    );
};
