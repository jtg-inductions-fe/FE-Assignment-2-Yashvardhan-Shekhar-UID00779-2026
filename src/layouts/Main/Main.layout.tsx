import { RouterProvider } from 'react-router';

import { Alert } from '@components';
import { router } from '@router';
import { useAppSelector } from '@store';

export const Main = () => {
    const alert = useAppSelector((state) => state.alert);

    return (
        <>
            <Alert {...alert} />
            <RouterProvider router={router} />;
        </>
    );
};
