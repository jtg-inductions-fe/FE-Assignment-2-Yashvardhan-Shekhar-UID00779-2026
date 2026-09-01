/**
 * @type {
 *    name: string | undefined;
 *    isProcessing: boolean;
 *    handleClose: () => void;
 *    handleConfirm: () => Promise<void>;
 * };
 */
export type DeleteDialogProps = {
    name: string | undefined;
    isProcessing: boolean;
    handleClose: () => void;
    handleConfirm: () => Promise<void>;
};
