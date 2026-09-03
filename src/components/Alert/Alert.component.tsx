import { useEffect, useState } from 'react';

import { Alert as MuiAlert, Snackbar, useTheme } from '@mui/material';

import { Alert as AlertTypeProp } from '@types';

export const Alert = (alertProp: AlertTypeProp) => {
    const { severity, message } = alertProp;

    const theme = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    /** closing alert Snackbar */
    const handleAlertClose = (): void => {
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
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <MuiAlert
                sx={{ boxShadow: theme.shadows[5] }}
                severity={severity}
                onClose={handleAlertClose}
            >
                {message}
            </MuiAlert>
        </Snackbar>
    );
};
