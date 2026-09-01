import { AppDispatch } from '@store';
import { MenuItem } from '@types';

/**
 * Menu card props for the menu cards
 * @type {
 *    item: MenuItem;
 *    isOwnerView?: boolean;
 *    dispatch: AppDispatch;
 *    onEdit?: (id: string) => void;
 *    onDelete?: (id: string) => void;
 * };
 */
export type MenuCardProps = {
    item: MenuItem;
    isOwnerView?: boolean;
    dispatch: AppDispatch;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
};
