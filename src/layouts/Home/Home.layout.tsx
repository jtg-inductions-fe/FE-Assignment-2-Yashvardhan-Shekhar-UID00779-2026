import { useEffect, useState } from 'react';

import { Outlet, useLocation, useNavigate } from 'react-router';

import { Box } from '@mui/material';

import { BottomBar, Navbar, ProfileMenu } from '@components';
import { logout } from '@services';
import { useAppDispatch, useAppSelector } from '@store';
import { handleUser } from '@utils';

import { StyledContainer } from './Home.styles';

export const Home = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const user = useAppSelector((state) => state.user);
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

    /**
     *  logout functionality
     */
    const handleLogOut = (): void => {
        logout(dispatch);
    };

    useEffect(() => {
        handleUser(dispatch, navigate);
    }, [user, dispatch, navigate]);

    return (
        <Box height="100vh">
            <Navbar
                handleProfileClick={handleProfileClick}
                user={user}
                activeTab={pathname}
                cartCount={cartCount}
            />
            <ProfileMenu
                isMenuOpen={isMenuOpen}
                anchorEl={anchorEl}
                user={user}
                handleMenuClose={handleMenuClose}
                handleLogOut={handleLogOut}
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
