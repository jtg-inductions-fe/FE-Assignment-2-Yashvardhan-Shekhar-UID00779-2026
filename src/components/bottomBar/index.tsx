import React from 'react';

import { BarProps } from 'types';

import HistoryIcon from '@mui/icons-material/History';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
    Avatar,
    Badge,
    BottomNavigation,
    BottomNavigationAction,
    Paper,
} from '@mui/material';

const BottomBar = ({
    handleProfileClick,
    user,
    activeTab,
    cartCount,
}: BarProps) => (
    <Paper
        sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            display: { xs: 'block', md: 'none' },
            zIndex: (theme) => theme.zIndex.appBar,
        }}
        elevation={10}
    >
        <BottomNavigation showLabels value={activeTab}>
            <BottomNavigationAction
                label="Home"
                value="home"
                icon={<HomeIcon />}
            />
            {user?.role === 'customer' && (
                <BottomNavigationAction
                    label="Cart"
                    value="cart"
                    icon={
                        <Badge badgeContent={cartCount} color="primary">
                            <ShoppingCartIcon />
                        </Badge>
                    }
                />
            )}
            <BottomNavigationAction
                onClick={() => {
                    window.history.replaceState({ page: 1 }, '', '/orders');
                }}
                label="Orders"
                value="orders"
                icon={<HistoryIcon />}
            />
            <BottomNavigationAction
                label="Profile"
                value="profile"
                icon={
                    <Avatar
                        sx={{
                            width: 32,
                            height: 32,
                            bgcolor: 'primary.main',
                        }}
                    >
                        {user?.name?.[0]?.toUpperCase()}
                    </Avatar>
                }
                onClick={handleProfileClick}
            />
        </BottomNavigation>
    </Paper>
);

export default BottomBar;
