import { Add } from '@mui/icons-material';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from './Button.component';

const meta: Meta<typeof Button> = {
    title: 'Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['outlined', 'contained'],
        },
        size: {
            control: 'select',
            options: ['small', 'medium'],
        },
        isAddButton: {
            control: 'boolean',
        },
        disabled: {
            control: 'boolean',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        children: 'Button',
        variant: 'contained',
        isAddButton: false,
    },
};

export const Secondary: Story = {
    args: {
        children: 'Outlined Button',
        variant: 'outlined',
    },
};

export const PrimarySmall: Story = {
    args: {
        children: 'Button',
        variant: 'contained',
        size: 'small',
        isAddButton: false,
    },
};

export const SecondarySmall: Story = {
    args: {
        children: 'Outlined Button',
        size: 'small',
        variant: 'outlined',
    },
};

export const AddButton: Story = {
    args: {
        isAddButton: true,
        variant: 'outlined',
        startIcon: <Add />,
    },
};
