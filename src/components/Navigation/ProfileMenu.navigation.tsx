import LogoutIcon from '@mui/icons-material/Logout';
import { ListSubheader } from '@mui/material';

import { logout } from '@services';

import {
    StyledListItemIcon,
    StyledMenu,
    StyledMenuItem,
} from './navigation.styles';
import { ProfileMenuProps } from './navigation.types';

export const ProfileMenu = (props: ProfileMenuProps) => {
    const { isMenuOpen, anchorEl, user, handleMenuClose, dispatch } = props;

    return (
        <StyledMenu
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
        >
            <ListSubheader>Hi, {user?.name}</ListSubheader>
            <StyledMenuItem onClick={() => logout(dispatch)}>
                <StyledListItemIcon>
                    <LogoutIcon fontSize="small" />
                </StyledListItemIcon>
                Logout
            </StyledMenuItem>
        </StyledMenu>
    );
};
