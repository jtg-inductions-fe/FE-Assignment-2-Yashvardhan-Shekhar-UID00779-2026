import { AppDispatch,updateAlert } from '@store';
import { Severity } from '@types';

// to create alert
export const alert = (severity: Severity, message: string, dispatch: AppDispatch) => {
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
