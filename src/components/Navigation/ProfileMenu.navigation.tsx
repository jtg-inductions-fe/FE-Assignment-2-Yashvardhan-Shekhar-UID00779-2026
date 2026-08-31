import LogoutIcon from '@mui/icons-material/Logout';
import { ListSubheader } from '@mui/material';

import {
    StyledListItemIcon,
    StyledMenu,
    StyledMenuItem,
} from './navigation.styles';
import { ProfileMenuProps } from './navigation.types';

export const ProfileMenu = (props: ProfileMenuProps) => {
    const { isMenuOpen, anchorEl, user, handleMenuClose, handleLogOut } = props;

    return (
        <StyledMenu
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
        >
            <ListSubheader>Hi, {user?.name}</ListSubheader>
            <StyledMenuItem onClick={handleLogOut}>
                <StyledListItemIcon>
                    <LogoutIcon fontSize="small" />
                </StyledListItemIcon>
                Logout
            </StyledMenuItem>
        </StyledMenu>
    );
};
