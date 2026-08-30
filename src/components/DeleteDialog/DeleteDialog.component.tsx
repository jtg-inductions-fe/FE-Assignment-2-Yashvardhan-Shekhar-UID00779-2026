import {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';

import { Button, Dialog } from '@components';
import { theme } from '@theme';

import { DeleteDialogProps } from './DeleteDialog.types';

export const DeleteDialog = (props: DeleteDialogProps) => {
    const { name, isProcessing, handleClose, onConfirm } = props;

    return (
        <Dialog open={!!name} onClose={handleClose}>
            <DialogTitle variant="h5" sx={{ fontWeight: 'bold' }}>
                Delete Restaurant?
            </DialogTitle>

            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete{' '}
                    <strong style={{ color: theme.palette.primary.main }}>
                        {name}
                    </strong>
                    ? This action cannot be undone.
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button
                    onClick={handleClose}
                    color="inherit"
                    disabled={isProcessing}
                >
                    Cancel
                </Button>
                <Button
                    onClick={() => void onConfirm()}
                    variant="contained"
                    color="error"
                    loading={isProcessing}
                    loadingPosition="end"
                >
                    {'\u00A0 Delete \u00A0'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
