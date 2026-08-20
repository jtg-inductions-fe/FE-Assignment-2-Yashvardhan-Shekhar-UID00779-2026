import {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';

import { StyledButton, StyledDialog } from '@styles';
import { theme } from '@theme';

type DeleteRestaurantDialogProps = {
    restaurantName: string;
    isProcessing: boolean;
    onClose: () => void;
    onConfirm: () => void;
};

export const DeleteRestaurantDialog = ({
    restaurantName,
    isProcessing,
    onClose,
    onConfirm,
}: DeleteRestaurantDialogProps) => (
    <StyledDialog open={true} onClose={onClose}>
        <DialogTitle variant="h5" sx={{ fontWeight: 'bold' }}>
            Delete Restaurant?
        </DialogTitle>

        <DialogContent>
            <DialogContentText>
                Are you sure you want to delete{' '}
                <strong style={{ color: theme.palette.primary.main }}>
                    {restaurantName}
                </strong>
                ? This action cannot be undone.
            </DialogContentText>
        </DialogContent>

        <DialogActions>
            <StyledButton
                onClick={onClose}
                color="inherit"
                disabled={isProcessing}
            >
                Cancel
            </StyledButton>
            <StyledButton
                onClick={onConfirm}
                variant="contained"
                color="error"
                loading={isProcessing}
                loadingPosition="end"
            >
                {'\u00A0 Delete \u00A0'}
            </StyledButton>
        </DialogActions>
    </StyledDialog>
);
