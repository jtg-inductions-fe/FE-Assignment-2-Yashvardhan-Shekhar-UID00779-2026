import React, { useState } from 'react';

import { Outlet, useLocation } from 'react-router';

import { Box } from '@mui/material';

import { BottomBar, Navbar, ProfileMenu } from '@components';
import { useAppDispatch, useAppSelector } from '@store';

import { StyledContainer } from './Home.styles';

export const Home = () => {
    const dispatch = useAppDispatch();

    const activeTab = useLocation().pathname.substring(1) || 'home';

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const user = useAppSelector((state) => state.user);
    const cartCount: number = useAppSelector((state) =>
        state.cart.reduce((sum, el) => sum + el.quantity, 0),
    );

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileClick = (event: React.MouseEvent<HTMLElement>) =>
        setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    return (
        <Box height="100vh">
            <Navbar
                handleProfileClick={handleProfileClick}
                user={user}
                activeTab={activeTab}
                cartCount={cartCount}
            />

            <ProfileMenu
                isMenuOpen={isMenuOpen}
                anchorEl={anchorEl}
                user={user}
                handleMenuClose={handleMenuClose}
                dispatch={dispatch}
            />

            <StyledContainer maxWidth="xl">
                <Outlet />
            </StyledContainer>

            <BottomBar
                handleProfileClick={handleProfileClick}
                user={user}
                activeTab={activeTab}
                cartCount={cartCount}
            />
        </Box>
    );
};
