import { Logout } from '@mui/icons-material';
import { ListItemIcon, ListSubheader, MenuItem, useTheme } from '@mui/material';

import { StyledMenu } from './navigation.styles';
import { ProfileMenuProps } from './navigation.types';

export const ProfileMenu = (props: ProfileMenuProps) => {
    const { isMenuOpen, anchorEl, user, handleMenuClose, handleLogOut } = props;
    const theme = useTheme();

    return (
        <StyledMenu
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
        >
            <ListSubheader>Hi, {user?.name}</ListSubheader>
            <MenuItem
                onClick={handleLogOut}
                sx={{ color: theme.palette.error.main }}
            >
                <ListItemIcon sx={{ color: theme.palette.error.main }}>
                    <Logout fontSize="small" />
                </ListItemIcon>
                Logout
            </MenuItem>
        </StyledMenu>
    );
};
