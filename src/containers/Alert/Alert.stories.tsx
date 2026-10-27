import { Provider } from 'react-redux';

import { AlertColor } from '@mui/material';

import { store, useAppDispatch } from '@store';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { alert } from '@utils';

import { Alert } from './Alert.container';

const ReduxProvider = (props: { color: AlertColor; message: string }) => (
    <Provider store={store}>
        <AlertContainer {...props} />
    </Provider>
);

const AlertContainer = ({
    color,
    message,
}: {
    color: AlertColor;
    message: string;
}) => {
    const dispatch = useAppDispatch();
    alert(color, message, dispatch);
    return <Alert />;
};

const meta: Meta<typeof ReduxProvider> = {
    title: 'Alert',
    component: ReduxProvider,
    tags: ['autodocs'],
    argTypes: {
        color: {
            control: 'select',
            options: ['success', 'warning', 'error', 'info'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof ReduxProvider>;

export const Snackbar: Story = {
    args: {
        color: 'success',
        message: 'This is default message',
    },
};
