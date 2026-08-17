import React from 'react';

import { logOut } from 'services/auth';
import { User } from 'types';

import LogoutIcon from '@mui/icons-material/Logout';
import { ListItemIcon, ListSubheader, Menu, MenuItem } from '@mui/material';

type ProfileMenuProps = {
    isMenuOpen: boolean;
    anchorEl: null | HTMLElement;
    handleMenuClose: () => void;
    user: User;
};

const ProfileMenu = ({
    isMenuOpen,
    anchorEl,
    handleMenuClose,
    user,
}: ProfileMenuProps) => (
    <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
            elevation: 3,
            sx: { mt: 1.5, minWidth: 180, borderRadius: 2 },
        }}
    >
        <ListSubheader>Hi, {user?.name}</ListSubheader>
        <MenuItem onClick={logOut} sx={{ color: 'error.main' }}>
            <ListItemIcon sx={{ color: 'error.main' }}>
                <LogoutIcon fontSize="small" />
            </ListItemIcon>
            Logout
        </MenuItem>
    </Menu>
);

export default ProfileMenu;
