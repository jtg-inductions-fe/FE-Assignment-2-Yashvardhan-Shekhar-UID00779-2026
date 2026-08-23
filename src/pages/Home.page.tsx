import React, { useState } from 'react';

import { Outlet, useLocation } from 'react-router';

import { Box } from '@mui/material';

import { BottomBar, Navbar, ProfileMenu } from '@components';
import { useAppSelector } from '@store';
import { User } from '@types';

import { StyledContainer } from './Home.styles';

export const Home = () => {
    const activeTab = useLocation().pathname.substring(1) || 'home';

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const user: User = useAppSelector((state) => state.user);
    const cartCount: number = useAppSelector((state) => state.cart.length);

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
                handleMenuClose={handleMenuClose}
                user={user}
            />

            <StyledContainer>
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
