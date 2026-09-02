import { AlertColor } from '@mui/material';

import { AppDispatch, updateAlert } from '@store';

/**
 * Creates and dispatches an alert with the specified severity and message.
 * @param severity - Severity level of the alert.
 * @param message - Message to display in the alert.
 * @param dispatch - Redux dispatch function used to update the alert state.
 */
export const alert = (
    severity: AlertColor,
    message: string,
    dispatch: AppDispatch,
): void => {
    dispatch(
        updateAlert({
            severity: severity,
            message: message,
        }),
    );
};

/**
 * Handles an error by displaying its message as an error alert.
 * @param error - Error value received from a failed operation.
 * @param  dispatch - Redux dispatch function used to display the error alert.
 */
export const handleErrorFeedback = (
    error: unknown,
    dispatch: AppDispatch,
): void => {
    if (error instanceof Error) {
        alert('error', error.message, dispatch);
    } else {
        alert('error', 'Unknown error has occurred', dispatch);
    }
};
