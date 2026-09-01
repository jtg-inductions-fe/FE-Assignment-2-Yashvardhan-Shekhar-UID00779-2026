import { MenuItem } from '@types';

/**
 * @type {
 *     menuItem: MenuItem;
 *     isProcessing: boolean;
 *     isOpen: boolean;
 *     onClose: () => void;
 *     handleEditMenuItem: (data: MenuItem) => Promise<void>;
 *     handleCreateMenuItem: (data: MenuItem) => Promise<void>;
 * };
 */
export type MenuFormDialogProps = {
    menuItem: MenuItem;
    isProcessing: boolean;
    isOpen: boolean;
    onClose: () => void;
    handleEditMenuItem: (data: MenuItem) => Promise<void>;
    handleCreateMenuItem: (data: MenuItem) => Promise<void>;
};
