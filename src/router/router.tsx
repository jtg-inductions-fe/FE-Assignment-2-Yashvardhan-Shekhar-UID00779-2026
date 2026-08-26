import { createBrowserRouter, Navigate } from 'react-router';

import { PATH } from '@constant';
import { Login, PageNotFound, Signup } from '@containers';
import { Menu, Restaurants } from '@containers';
import { Home } from '@layouts';
import { OnBoarding } from '@pages';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <OnBoarding />,
        children: [
            {
                path: 'signup',
                element: <Signup />,
            },
            {
                path: 'login',
                element: <Login />,
            },
        ],
    },
    {
        path: '/',
        element: <Home />,
        children: [
            {
                index: true,
                element: <Navigate to={PATH.HOME} replace />,
            },
            {
                path: 'restaurants',
                element: <Restaurants />,
            },
            {
                path: 'restaurant/:restaurantId',
                loader: () => {
                    const res = getRestaurantDetails();
                    return res ? res : redirect(`/home`);
                },
                Component: Menu,
            },
            {
                path: 'orders',
                element: <>orders</>,
            },
            {
                path: 'cart',
                element: <>cart</>,
            },
        ],
    },
    {
        path: '*',
        Component: PageNotFound,
    },
]);
