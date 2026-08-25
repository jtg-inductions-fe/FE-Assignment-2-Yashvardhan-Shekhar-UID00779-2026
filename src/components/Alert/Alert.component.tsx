import { updateAlert, useAppDispatch } from 'store';

import { Alert, Snackbar } from '@mui/material';

import { BORDER_RADIUS } from '@constant';
import { useAppSelector } from '@store';
import { theme } from '@theme';
import { Alert as AlertType } from '@types';

export const AlertComponent = () => {
    
    const dispatch = useAppDispatch();

    const handleAlertClose = () => {
        dispatch(
            updateAlert({ severity: null, message: 'something went wrong' }),
        );
    };

    const alert: AlertType = useAppSelector((state) => state.alert);

    return alert.severity ? (
        <Snackbar
            open={true}
            autoHideDuration={3000}
            onClose={handleAlertClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert
                severity={alert.severity || 'warning'}
                onClose={handleAlertClose}
                sx={{
                    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                    borderRadius: theme.typography.pxToRem(BORDER_RADIUS),
                }}
            >
                {alert.message}
            </Alert>
        </Snackbar>
    ) : (
        <></>
    );
};
