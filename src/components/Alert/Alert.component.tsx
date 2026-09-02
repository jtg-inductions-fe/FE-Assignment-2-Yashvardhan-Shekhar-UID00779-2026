import { useEffect, useState } from 'react';

import { Snackbar } from '@mui/material';

import { Alert as AlertTypeProp } from '@types';

import { StyledAlert } from './Alert.styles';

export const Alert = (alertProp: AlertTypeProp) => {
    const { severity, message } = alertProp;

    const [isOpen, setIsOpen] = useState(false);

    /**
     * closing alert Snackbar
     */
    const handleAlertClose = (): void => {
        setIsOpen(false);
    };

    /**
     * based on changing the message and if exist then showing alert
     */
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
            <StyledAlert severity={severity} onClose={handleAlertClose}>
                {message}
            </StyledAlert>
        </Snackbar>
    );
};
