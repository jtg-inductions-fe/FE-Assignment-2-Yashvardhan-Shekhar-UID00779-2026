import { AlertColor } from '@mui/material';

import { AppDispatch, updateAlert } from '@store';

/**
 * Creates and dispatches an alert with the specified severity and message.
 *
 * @param {AlertColor} severity - Severity level of the alert.
 * @param {string} message - Message to display in the alert.
 * @param {AppDispatch} dispatch - Redux dispatch function used to update the alert state.
 * @returns {void} No value is returned.
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
 *
 * @param {unknown} error - Error value received from a failed operation.
 * @param {AppDispatch} dispatch - Redux dispatch function used to display the error alert.
 * @returns {void} No value is returned.
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
