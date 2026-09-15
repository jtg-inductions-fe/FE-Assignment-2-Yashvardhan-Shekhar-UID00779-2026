import { useState } from 'react';

import { Navigate, Outlet, useLocation } from 'react-router';

import { Box, LinearProgress } from '@mui/material';

import { BottomBar, Navbar, ProfileMenu } from '@components';
import { PATH } from '@constant';
import { useAppSelector } from '@store';

import { StyledContainer } from './Home.styles';

export const Home = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { pathname } = useLocation();

    const isLoading = useAppSelector((state) => state.loading.isLoading);
    const isInitializing = useAppSelector(
        (state) => state.loading.isStartupLoading,
    );
    const user = useAppSelector((state) => state.user);
    const cartCount: number = useAppSelector((state) =>
        state.cart.cartItems.reduce((sum, el) => sum + el.quantity, 0),
    );

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

    if (isInitializing) {
        return <LinearProgress />;
    }

    if (!user.id) {
        return <Navigate to={PATH.LOGIN} />;
    }

    return (
        <Box height="100vh">
            <Navbar
                handleProfileClick={handleProfileClick}
                user={user}
                activeTab={pathname}
                cartCount={cartCount}
                isLoading={isLoading || isInitializing}
            />
            <ProfileMenu
                isMenuOpen={!!anchorEl}
                anchorEl={anchorEl}
                user={user}
                handleMenuClose={handleMenuClose}
            />
            <StyledContainer maxWidth="xl">
                <Outlet />
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
