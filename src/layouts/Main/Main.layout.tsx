import { Alert } from '@components';
import { Router } from '@router';
import { useAppSelector } from '@store';

export const Main = () => {
    const alert = useAppSelector((state) => state.alert);

    return (
        <>
            <Alert {...alert} />
            <Router />
        </>
    );
};
