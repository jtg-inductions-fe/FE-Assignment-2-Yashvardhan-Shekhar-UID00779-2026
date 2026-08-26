import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
    useNavigate,
} from 'react-router';

import { Cart } from '@components';
import { MenuItems } from '@components';
import { Orders } from '@components';
import { Restaurants } from '@components';
import { Home } from '@pages';
import { alert } from '@utils';

const PageNotFound = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        alert('warning', 'Requested page does not exist', dispatch);
        void navigate('/home', { replace: true });
    }, [navigate, dispatch]);

    return null;
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
                path: 'restaurant/:restaurantId',
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

export const Router = () => <RouterProvider router={router} />;
