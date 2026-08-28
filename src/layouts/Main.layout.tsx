import { Container } from '@mui/material';

import { Alert } from '@components';
import { Home, OnBoarding } from '@pages';
import { updateUser, useAppDispatch, useAppSelector } from '@store';
import { User } from '@types';
import { handleErrorFeedback } from '@utils';

export const Main = () => {
    const dispatch = useAppDispatch();

    const uid = useAppSelector((state) => state.user.id);

    const alert = useAppSelector((state) => state.alert);

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
