import { fn } from 'storybook/test';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { DeleteDialog } from './DeleteDialog.component';

const meta: Meta<typeof DeleteDialog> = {
    title: 'Delete Dialog',
    component: DeleteDialog,
    tags: ['autodocs'],
    args: {
        handleClose: fn(),
        handleConfirm: fn(),
        isProcessing: false,
    },
};

export default meta;
type Story = StoryObj<typeof DeleteDialog>;

export const Snackbar: Story = {
    args: {
        name: 'Restaurant/Dish',
    },
};
