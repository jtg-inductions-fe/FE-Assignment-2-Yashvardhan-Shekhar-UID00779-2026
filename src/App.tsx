import mockDataSetup from 'services/mockDataSetUp';

import { Container } from '@mui/material';
import { Alert } from 'components';
import { setUpDispatch } from 'store';

import { Container, CssBaseline, ThemeProvider } from '@mui/material';

import { Home } from '@pages';
import { ThemeProvider } from '@providers';
import { updateUser, useAppDispatch } from '@store';
import { AppDispatch, User } from '@types';
import { Home, OnBoarding } from '@pages';
import {
    AppDispatch,
    updateUser,
    useAppDispatch,
    useAppSelector,
} from '@store';

import { Home, OnBoarding } from './pages';
import { AppDispatch, useAppDispatch, useAppSelector } from './store';
import { updateUser } from './store';

export const App = () => {
    mockDataSetup();

    const dispatch: AppDispatch = useAppDispatch();
    setUpDispatch(dispatch);

    const uid: string | undefined = useAppSelector((state) => state.user.id);

    if (!uid) {
        const user = JSON.parse(localStorage.getItem('user') || 'null') as User;

        const isPresent =
            user && user.name && user.email && user.role && user.id;

        if (isPresent) dispatch(updateUser(user));
    }

    return (
        <ThemeProvider>
            <Container maxWidth="xl">
                <Alert />

                {uid ? <Home /> : <OnBoarding />}
            </Container>
        </ThemeProvider>
    );
};
