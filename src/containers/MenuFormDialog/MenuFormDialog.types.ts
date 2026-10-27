import { MenuItem } from '@types';

/**MenuItem props */
export type MenuFormDialogProps = {
    /**details of Menu Item */
    menuItem: MenuItem;
    /**is processing true/false */
    isProcessing: boolean;
    /** id dialog is open */
    isOpen: boolean;
    /**function to close dialog */
    onClose: () => void;
    /**function ot edit menu Item */
    handleEditMenuItem: (data: MenuItem) => Promise<void>;
    /**function ot create new menu Item */
    handleCreateMenuItem: (data: MenuItem) => Promise<void>;
};
