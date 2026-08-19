import mockDataSetup from 'services/mockDataSetUp';

import { Container } from '@mui/material';

import { Home } from '@pages';
import { ThemeProvider } from '@providers';
import { updateUser, useAppDispatch } from '@store';
import { AppDispatch, User } from '@types';
import { theme } from '@theme';
import { Alert as AlertType, User } from '@types';
import { mockDataSetup } from '@utils';

import { Home, OnBoarding } from './pages';
import { AppDispatch, useAppDispatch, useAppSelector } from './store';
import { updateUser } from './store';

export const App = () => {
    mockDataSetup();

    const dispatch: AppDispatch = useAppDispatch();
    setUpDispatch(dispatch);

    const handleAlertClose = () => {
        dispatch(
            updateAlert({ severity: null, message: 'something went wrong' }),
        );
    };

    const alert: AlertType = useAppSelector((state) => state.alert);
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
                {alert.severity && (
                    <Snackbar
                        open={true}
                        autoHideDuration={3000}
                        onClose={handleAlertClose}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    >
                        <Alert
                            severity={alert.severity || 'warning'}
                            onClose={handleAlertClose}
                            sx={{
                                boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                            }}
                        >
                            {alert.message}
                        </Alert>
                    </Snackbar>
                )}

                {uid ? <Home /> : <OnBoarding />}
            </Container>
        </ThemeProvider>
    );
};
