import Cart from 'components/cart';
import MenuItems from 'components/menuItems';
import Orders from 'components/orders';
import Restaurants from 'components/restaurants';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import { updateAlert, useAppDispatch } from 'store';

import Home from '../pages/Home';

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

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
