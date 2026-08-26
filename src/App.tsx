import { Container } from '@mui/material';

import { Alert } from '@containers';
import { Home, OnBoarding } from '@pages';
import { ThemeProvider } from '@providers';
import { updateUser, useAppDispatch, useAppSelector } from '@store';
import { User } from '@types';
import { handleErrorFeedback, mockDataSetup } from '@utils';

// import { Alert as AlertType, User } from './types';

export const App = () => {
    mockDataSetup();

    const dispatch = useAppDispatch();

    const uid = useAppSelector((state) => state.user.id);

    if (!uid) {
        try {
            const user = JSON.parse(
                localStorage.getItem('user') || 'null',
            ) as User;

            const isPresent =
                user && user.name && user.email && user.role && user.id;

            if (isPresent) dispatch(updateUser(user));
        } catch (error) {
            handleErrorFeedback(error, dispatch);
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
