import { useEffect } from 'react';

import { RouterProvider } from 'react-router';

import { Alert } from '@components';
import { ThemeProvider } from '@providers';
import { router } from '@router';
import { initializeAuth } from '@services';
import { useAppDispatch } from '@store';

export const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        void initializeAuth(dispatch);
    }, [dispatch]);

    return (
        <ThemeProvider>
            <RouterProvider router={router} />
            <Alert />
        </ThemeProvider>
    );
};
