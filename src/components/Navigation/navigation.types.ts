import { User } from '@types';

/**
 * Represents the properties required by the navigation bar components.
 * @type {
 *     handleProfileClick: (event: HTMLButtonElement) => void;
 *     user: User;
 *     activeTab: string;
 *     cartCount: number;
 *     navigate: NavigateFunction;
 * };
 */
export type BarProps = {
    handleProfileClick: (event: HTMLButtonElement) => void;
    user: User;
    activeTab: string;
    cartCount: number;
};

/**
 * Represents the properties required by the navigation Menu components.
 * @type {
 *  isMenuOpen: boolean;
 *  anchorEl: null | HTMLElement;
 *  user: User;
 *  handleMenuClose: () => void;
 *  dispatch: AppDispatch;
 * }
 */
export type ProfileMenuProps = {
    isMenuOpen: boolean;
    anchorEl: null | HTMLElement;
    user: User;
    handleMenuClose: () => void;
    handleLogOut: () => void;
};
