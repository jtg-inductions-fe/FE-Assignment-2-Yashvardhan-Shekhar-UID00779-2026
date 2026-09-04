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

    const user = useAppSelector((state) => state.user);
    const isLoading = !user.id;
    const cartCount: number = useAppSelector((state) =>
        state.cart.cartItems.reduce((sum, el) => sum + el.quantity, 0),
    );

    const { pathname } = useLocation();
    const isMenuOpen = Boolean(anchorEl);

    /**
     *  Opens the profile menu by setting the clicked element as its anchor.
     * @param event event of the click
     */
    const handleProfileClick = (target: HTMLButtonElement): void => {
        setAnchorEl(target);
    };

    /**
     *  Closes the profile menu.
     */
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
                isLoading={isLoading}
            />
            <ProfileMenu
                isMenuOpen={isMenuOpen}
                anchorEl={anchorEl}
                user={user}
                handleMenuClose={handleMenuClose}
            />
            <StyledContainer maxWidth="xl">
                {!isLoading && <Outlet />}
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
