import { Box, DialogActions, DialogTitle } from '@mui/material';

import { Button } from '@components';

import { StyledDialog } from './Dialog.styles';
import { DialogProps } from './Dialog.types';

export const Dialog = (props: DialogProps) => {
    const { isOpen, title, onClose, form, children } = props;

    return (
        <StyledDialog open={isOpen} onClose={onClose} fullWidth>
            {form && (
                <Box component="form" onSubmit={form.onSubmit}>
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
                            disabled={form.isProcessing}
                            color={form.color}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            loading={form.isProcessing}
                            color={form.color}
                        >
                            {form.submitText}
                        </Button>
                    </DialogActions>
                </Box>
            )}
        </StyledDialog>
    );
};
