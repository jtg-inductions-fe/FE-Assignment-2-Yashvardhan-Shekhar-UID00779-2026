import { useEffect, useState } from 'react';

import { Alert as MuiAlert, Snackbar, useTheme } from '@mui/material';

import { Alert as AlertTypeProp } from '@types';

export const Alert = (alertProp: AlertTypeProp) => {
    const { severity, message } = alertProp;

    const theme = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    /** closing alert Snackbar */
    const handleAlertClose = () => {
        setIsOpen(false);
    };

    /** based on changing the message and if exist then showing alert */
    useEffect(() => {
        if (message) {
            setIsOpen(true);
        }
    }, [message]);

    return (
        <Snackbar
            open={isOpen}
            autoHideDuration={3000}
            onClose={handleAlertClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <MuiAlert
                sx={{ boxShadow: theme.shadows[24], marginTop: 0 }}
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
