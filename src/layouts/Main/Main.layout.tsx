import { useEffect } from 'react';

import { RouterProvider } from 'react-router';

import { Alert } from '@components';
import { router } from '@router';
import { initializeAuth } from '@services';
import { useAppDispatch, useAppSelector } from '@store';

export const Main = () => {
    const alert = useAppSelector((state) => state.alert);
    const dispatch = useAppDispatch();

    useEffect(() => {
        void initializeAuth(dispatch);
    }, [dispatch]);

    return (
        <>
            <Alert {...alert} />
            <RouterProvider router={router} />
        </>
    );
};
