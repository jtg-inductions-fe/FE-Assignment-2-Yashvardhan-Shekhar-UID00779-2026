import React, { useState } from 'react';

import { Outlet, useLocation, useNavigate } from 'react-router';

import { Box } from '@mui/material';

import { BottomBar, Navbar, ProfileMenu } from '@components';
import { useAppDispatch, useAppSelector } from '@store';

import { StyledContainer } from './Home.styles';

export const Home = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const user = useAppSelector((state) => state.user);
    const cartCount: number = useAppSelector((state) =>
        state.cart.cartItems.reduce((sum, el) => sum + el.quantity, 0),
    );

    const activeTab = useLocation().pathname.substring(1) || 'home';
    const isMenuOpen = Boolean(anchorEl);

    // Opens the profile menu by setting the clicked element as its anchor.
    const handleProfileClick = (event: React.MouseEvent<HTMLElement>): void => {
        setAnchorEl(event.currentTarget);
    };

    // Closes the profile menu.
    const handleMenuClose = (): void => {
        setAnchorEl(null);
    };

    return (
        <Box height="100vh">
            <Navbar
                handleProfileClick={handleProfileClick}
                user={user}
                activeTab={activeTab}
                cartCount={cartCount}
                navigate={navigate}
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
                navigate={navigate}
            />
        </Box>
    );
};
