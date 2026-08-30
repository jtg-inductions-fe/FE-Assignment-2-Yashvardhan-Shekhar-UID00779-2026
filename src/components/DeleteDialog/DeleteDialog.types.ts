export type DeleteDialogProps = {
    name: string | undefined;
    isProcessing: boolean;
    handleClose: () => void;
    onConfirm: () => Promise<void>;
};
