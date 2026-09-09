import { FormEvent, ReactNode } from 'react';

import { ButtonOwnProps } from '@mui/material';

/**dialog props */
export type DialogProps = Pick<ButtonOwnProps, 'color'> & {
    /** dialog is open or not */
    isOpen: boolean;
    /**action on close */
    onClose: () => void;
    /** title of the dialog */
    title: string;
    /** dialogContent Element */
    children: ReactNode;
    /** form fields content */
    form?: FormFields;
};

/** form fields content */
export type FormFields = Pick<ButtonOwnProps, 'color'> & {
    /**action on submit */
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    /** isProcessing to disable close temporarily */
    isProcessing: boolean;
    /** submit button text eg delete/save/add */
    submitText: string;
};
