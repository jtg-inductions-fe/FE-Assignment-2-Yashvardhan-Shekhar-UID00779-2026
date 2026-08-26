import { AlertColor } from '@mui/material';

import { AppDispatch, updateAlert } from '@store';

// to create alert
export const alert = (
    severity: AlertColor,
    message: string,
    dispatch: AppDispatch,
) => {
    dispatch(
        updateAlert({
            severity: severity,
            message: message,
        }),
    );
};

// handle error feedback
export const handleErrorFeedback = (error: unknown, dispatch: AppDispatch) => {
    if (error instanceof Error) {
        alert('error', error.message, dispatch);
    } else {
        alert('error', 'Unknown error has occurred', dispatch);
    }
};
