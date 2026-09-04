import { User } from '@types';

/** Represents the properties required by the navigation bar components. */
export type BarProps = {
    /** function to trigger Profile menu */
    handleProfileClick: (event: HTMLButtonElement) => void;
    /** user object */
    user: User;
    /** active tab */
    activeTab: string;
    /** cart items count */
    cartCount: number;
    /** loading state */
    isLoading?: boolean;
};

/**
 * Represents the properties required by the navigation Menu components.
 */
export type ProfileMenuProps = {
    /** state of menu */
    isMenuOpen: boolean;
    /** anchorEl Element which triggers */
    anchorEl: null | HTMLElement;
    /** user object */
    user: User;
    /** toggle menu close */
    handleMenuClose: () => void;
};
