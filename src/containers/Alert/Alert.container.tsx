import { Alert as MuiAlert, Slide, Snackbar, useTheme } from '@mui/material';

import { closeAlert, useAppDispatch, useAppSelector } from '@store';

export const Alert = () => {
    const { severity, message, isOpen } = useAppSelector(
        (state) => state.alert,
    );

    const theme = useTheme();
    const dispatch = useAppDispatch();

    /** closing alert Snackbar */
    const handleAlertClose = () => {
        dispatch(closeAlert());
    };

    return (
        <Snackbar
            open={isOpen}
            autoHideDuration={3000}
            onClose={handleAlertClose}
            TransitionComponent={Slide}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <MuiAlert
                sx={{ boxShadow: theme.shadows[24] }}
                severity={severity}
                onClose={handleAlertClose}
                variant="standard"
                elevation={10}
            >
                {message}
            </MuiAlert>
        </Snackbar>
    );
};
