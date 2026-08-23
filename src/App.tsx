import { Alert } from 'components';
import { setUpDispatch } from 'store';

import { Container } from '@mui/material';

import { ThemeProvider } from '@components';
import { Home, OnBoarding } from '@pages';
import { updateUser, useAppDispatch, useAppSelector } from '@store';
import { AppDispatch, User } from '@types';
import { handleErrorFeedback, mockDataSetup } from '@utils';

// import { Alert as AlertType, User } from './types';

export const App = () => {
    mockDataSetup();

    const dispatch: AppDispatch = useAppDispatch();
    setUpDispatch(dispatch);

    const uid: string | undefined = useAppSelector((state) => state.user.id);

    if (!uid) {
        try {
            const user = JSON.parse(
                localStorage.getItem('user') || 'null',
            ) as User;

            const isPresent =
                user && user.name && user.email && user.role && user.id;

            if (isPresent) dispatch(updateUser(user));
        } catch (error) {
            handleErrorFeedback(error);
        }
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
