import { dispatch, updateAlert } from '@store';
import { Severity } from '@types';

export const alert = (severity: Severity, message: string) => {
    dispatch(
        updateAlert({
            severity: severity,
            message: message,
        }),
    );
};
