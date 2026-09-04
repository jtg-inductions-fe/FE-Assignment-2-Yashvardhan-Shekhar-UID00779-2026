import { AppDispatch } from '@store';
import { MenuItem } from '@types';

/**Menu card props for the menu cards */
export type MenuCardProps = {
    /**Menu Item */
    item: MenuItem;
    /**true if user is an owner */
    isOwnerView: boolean;
    /**store dispatch */
    dispatch: AppDispatch;
    /**onEdit method to trigger form dialog */
    onEdit: (id: string) => void;
    /**onDelete method to trigger delete dialog */
    onDelete: (id: string) => void;
};
