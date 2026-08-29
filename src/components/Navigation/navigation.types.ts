import { NavigateFunction } from 'react-router';

import { AppDispatch } from '@store';
import { User } from '@types';

/**
 * Represents the properties required by the navigation bar components.
 */
export type BarProps = {
    handleProfileClick: (event: React.MouseEvent<HTMLElement>) => void;
    user: User;
    activeTab: string;
    cartCount: number;
    navigate: NavigateFunction;
};

/**
 * Represents the properties required by the navigation Menu components.
 */
export type ProfileMenuProps = {
    isMenuOpen: boolean;
    anchorEl: null | HTMLElement;
    user: User;
    handleMenuClose: () => void;
    dispatch: AppDispatch;
};
