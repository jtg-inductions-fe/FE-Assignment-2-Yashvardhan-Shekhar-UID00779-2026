import { Container } from '@mui/material';

import { Alert } from '@components';
import { OnBoarding } from '@pages';
import { useAppSelector } from '@store';

export const Main = () => {
    const alert = useAppSelector((state) => state.alert);

    return (
        <Container maxWidth="xl">
            <Alert {...alert} />
            <OnBoarding />
        </Container>
    );
};
