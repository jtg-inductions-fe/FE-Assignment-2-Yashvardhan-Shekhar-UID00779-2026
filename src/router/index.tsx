import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';

import { Cart } from '@components';
import { MenuItems } from '@components';
import { Orders } from '@components';
import { Restaurants } from '@components';
import { Home } from '@pages';
import { updateAlert, useAppDispatch } from '@store';

const PageNotFound = () => {
    const dispatch = useAppDispatch();

    dispatch(
        updateAlert({
            severity: 'warning',
            message: 'Requested page does not exist.',
        }),
    );

    return <Navigate to="/home" replace />;
};

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        children: [
            {
                index: true,
                element: <Navigate to="/home" replace />,
            },
            {
                path: 'home',
                element: <Restaurants />,
            },
            {
                path: 'restaurant:restaurantId',
                element: <MenuItems />,
            },
            {
                path: 'orders',
                element: <Orders />,
            },
            {
                path: 'cart',
                element: <Cart />,
            },
        ],
    },
    {
        path: '*',
        Component: PageNotFound,
    },
]);

const Router = () => <RouterProvider router={router} />;

export { Router };
