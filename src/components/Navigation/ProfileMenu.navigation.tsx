import { User } from 'types';

import LogoutIcon from '@mui/icons-material/Logout';
import { ListItemIcon, ListSubheader, MenuItem } from '@mui/material';

import { logout } from '@services';

import { StyledMenu } from './navigation.styles';

type ProfileMenuProps = {
    isMenuOpen: boolean;
    anchorEl: null | HTMLElement;
    handleMenuClose: () => void;
    user: User;
};

export const ProfileMenu = ({
    isMenuOpen,
    anchorEl,
    handleMenuClose,
    user,
}: ProfileMenuProps) => (
    <StyledMenu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        // MenuListProps={{
        //   'aria-labelledby': 'basic-button',
        //   backgroundColor:'yellow',
        // }}
    >
        <ListSubheader>Hi, {user?.name}</ListSubheader>
        <MenuItem onClick={logout} sx={{ color: 'error.main' }}>
            <ListItemIcon sx={{ color: 'error.main' }}>
                <LogoutIcon fontSize="small" />
            </ListItemIcon>
            Logout
        </MenuItem>
    </StyledMenu>
);
