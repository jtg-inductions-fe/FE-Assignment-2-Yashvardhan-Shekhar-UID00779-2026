import { FormEvent, ReactNode } from 'react';

import { ButtonOwnProps } from '@mui/material';

/**dialog props */
export type DialogProps = Pick<ButtonOwnProps, 'color'> & {
    /** dialog is open or not */
    isOpen: boolean;
    /** title of the dialog */
    title: string;
    /**action on close */
    onClose: () => void;
    /**action on submit */
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    /** isProcessing to disable close temporarily */
    isProcessing: boolean;
    /** submit button text eg delete/save/add */
    submitText: string;
    /** dialogContent Element */
    children: ReactNode;
};
