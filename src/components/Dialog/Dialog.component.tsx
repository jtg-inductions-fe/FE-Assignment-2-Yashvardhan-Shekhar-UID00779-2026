import { Box, DialogActions, DialogTitle } from '@mui/material';

import { Button } from '@components';

import { StyledDialog } from './Dialog.styles';
import { DialogProps } from './Dialog.types';

export const Dialog = (props: DialogProps) => {
    const {
        isOpen,
        title,
        onClose,
        onSubmit,
        isProcessing,
        submitText,
        color,
        children,
    } = props;

    return (
        <StyledDialog open={isOpen} onClose={onClose} fullWidth>
            <Box component="form" onSubmit={onSubmit}>
                <DialogTitle variant="h4" fontWeight="bold">
                    {title}
                </DialogTitle>
                {children}
                <DialogActions
                    sx={{
                        p: 4,
                        gap: 1,
                    }}
                >
                    <Button
                        onClick={onClose}
                        variant="outlined"
                        disabled={isProcessing}
                        color={color}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        loading={isProcessing}
                        color={color}
                    >
                        {submitText}
                    </Button>
                </DialogActions>
            </Box>
        </StyledDialog>
    );
};
