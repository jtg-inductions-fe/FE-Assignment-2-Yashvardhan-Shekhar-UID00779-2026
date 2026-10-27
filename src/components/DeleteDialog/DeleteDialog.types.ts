/**
 * Represents the props for the delete dialog.
 */
export type DeleteDialogProps = {
    /** name of the item */
    name: string | undefined;
    /** whether the delete operation is processing */
    isProcessing: boolean;
    /** closes the dialog */
    handleClose: () => void;
    /** confirms the delete operation */
    handleConfirm: () => Promise<void>;
};
