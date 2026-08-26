import { useEffect, useState } from 'react';

import { AlertProps as MuiAlertProps, Snackbar } from '@mui/material';

import { StyledAlert } from './Alert.styles';

type AlertProps = Pick<MuiAlertProps, 'severity'> & {
    message: string;
};

export const Alert = (alertProp: AlertProps) => {
    const { severity, message } = alertProp;

    const [isOpen, setIsOpen] = useState(false);

    const handleAlertClose = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        if (message) setIsOpen(true);
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
