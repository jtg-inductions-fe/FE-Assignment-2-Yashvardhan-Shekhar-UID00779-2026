import { dispatch, updateAlert } from '@store';
import { Severity } from '@types';

// to create alert
export const alert = (severity: Severity, message: string) => {
    dispatch(
        updateAlert({
            severity: severity,
            message: message,
        }),
    );
};

// handle error feedback
export const handleErrorFeedback = (error: unknown) => {
    if (error instanceof Error) {
        alert('error', error.message);
    } else {
        alert('error', 'Unknown error has occurred');
    }
};
