import { Box, DialogContent, DialogContentText } from '@mui/material';

import { Dialog } from '@components';

import { DeleteDialogProps } from './DeleteDialog.types';

export const DeleteDialog = (props: DeleteDialogProps) => {
    const { name, isProcessing, handleClose, handleConfirm } = props;

    return (
        <Dialog
            isOpen={!!name}
            title="Delete Confirmation ?"
            onClose={handleClose}
            form={{
                isProcessing: isProcessing,
                onSubmit: (e) => {
                    e.preventDefault();
                    void handleConfirm();
                },
                submitText: 'Delete',
                color: 'error',
            }}
        >
            <DialogContent sx={{ py: 0 }}>
                <DialogContentText>
                    Are you sure you want to delete{' '}
                    <Box component="strong" color="primary.main">
                        {name}
                    </Box>
                    ? This action cannot be undone.
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
};
