import { useEffect, useState } from 'react';

import { Outlet, useLocation, useNavigate } from 'react-router';

import { Box } from '@mui/material';

import { BottomBar, Navbar, ProfileMenu } from '@components';
import { useAppDispatch, useAppSelector } from '@store';
import { navigateUserBasedOnState } from '@utils';

import { StyledContainer } from './Home.styles';

export const Home = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const isLoading = useAppSelector((state) => state.loading.isLoading);
    const isStartupLoading = useAppSelector(
        (state) => state.loading.isStartupLoading,
    );
    const user = useAppSelector((state) => state.user);
    const cartCount: number = useAppSelector((state) =>
        state.cart.cartItems.reduce((sum, el) => sum + el.quantity, 0),
    );

    // const userPresent = !!user.id;
    // console.log(userPresent);
    const { pathname } = useLocation();

    /**
     *  Opens the profile menu by setting the clicked element as its anchor.
     * @param event event of the click
     */
    const handleProfileClick = (target: HTMLButtonElement): void => {
        setAnchorEl(target);
    };

    /** Closes the profile menu.*/
    const handleMenuClose = (): void => {
        setAnchorEl(null);
    };

    useEffect(() => {
        void navigateUserBasedOnState(dispatch, navigate, false);
    }, [dispatch, navigate]);

    return (
        <Box height="100vh">
            <Navbar
                handleProfileClick={handleProfileClick}
                user={user}
                activeTab={pathname}
                cartCount={cartCount}
                isLoading={isLoading || isStartupLoading}
            />
            <ProfileMenu
                isMenuOpen={!!anchorEl}
                anchorEl={anchorEl}
                user={user}
                handleMenuClose={handleMenuClose}
            />
            <StyledContainer maxWidth="xl">
                {!!user.id && <Outlet />}
            </StyledContainer>
            <BottomBar
                handleProfileClick={handleProfileClick}
                user={user}
                activeTab={pathname}
                cartCount={cartCount}
            />
        </Box>
    );
};
