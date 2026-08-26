import { Container } from '@mui/material';

import { Alert } from '@components';
import { Home, OnBoarding } from '@pages';
import { updateUser, useAppDispatch, useAppSelector } from '@store';
import { Alert as AlertType, User } from '@types';
import { handleErrorFeedback, mockDataSetup } from '@utils';

export const Main = () => {
    mockDataSetup();

    const dispatch = useAppDispatch();

    const uid = useAppSelector((state) => state.user.id) as string;

    const alert = useAppSelector((state) => state.alert) as AlertType;

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
        <Container maxWidth="xl">
            <Alert {...alert} />
            {uid ? <Home /> : <OnBoarding />}
        </Container>
    );
};
