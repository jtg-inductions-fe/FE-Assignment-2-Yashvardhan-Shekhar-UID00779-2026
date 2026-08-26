import { Snackbar } from '@mui/material';

import { Alert as AlertComponent } from '@components'
import { updateAlert, useAppDispatch, useAppSelector } from '@store';
import { Alert as alt } from '@types';

export const Alert = () => {
    
    const dispatch = useAppDispatch();

    const handleAlertClose = () => {
        dispatch(
            updateAlert({ severity: null, message: '' }),
        );
    };

    const {severity, message} = useAppSelector((state) => state.alert) as alt;
    const open = Boolean(severity) && Boolean(message);

    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleAlertClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <AlertComponent
                severity={severity || 'warning'}
                onClose={handleAlertClose}
            >
                {message}
            </AlertComponent>
        </Snackbar>
    );
};
