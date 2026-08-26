import { User } from 'types';

import LogoutIcon from '@mui/icons-material/Logout';
import { ListSubheader } from '@mui/material';

import { logout } from '@services';
import { AppDispatch } from '@store';

import {
    StyledListItemIcon,
    StyledMenu,
    StyledMenuItem,
} from './navigation.styles';

type ProfileMenuProps = {
    isMenuOpen: boolean;
    anchorEl: null | HTMLElement;
    user: User;
    handleMenuClose: () => void;
    dispatch: AppDispatch;
};

export const ProfileMenu = ({
    isMenuOpen,
    anchorEl,
    user,
    handleMenuClose,
    dispatch,
}: ProfileMenuProps) => (
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
