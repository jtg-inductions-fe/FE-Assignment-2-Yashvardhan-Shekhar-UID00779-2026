import {
    Box,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';

import { Button, Dialog } from '@components';

import { DeleteDialogProps } from './DeleteDialog.types';

export const DeleteDialog = (props: DeleteDialogProps) => {
    const { name, isProcessing, handleClose, handleConfirm } = props;

    return (
        <Dialog open={!!name} onClose={handleClose}>
            <DialogTitle variant="h4" fontWeight="bold">
                Delete Confirmation ?
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete{' '}
                    <Box component="strong" sx={{ color: 'primary.main' }}>
                        {name}
                    </Box>
                    ? This action cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                    color="error"
                    variant="outlined"
                    disabled={isProcessing}
                >
                    Cancel
                </Button>
                <Button
                    onClick={() => void handleConfirm()}
                    variant="contained"
                    color="error"
                    loading={isProcessing}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};
