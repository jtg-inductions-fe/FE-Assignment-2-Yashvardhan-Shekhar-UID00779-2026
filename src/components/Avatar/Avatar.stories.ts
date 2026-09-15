import type { Meta, StoryObj } from '@storybook/react-vite';

import { Avatar } from './Avatar.component';

const meta: Meta<typeof Avatar> = {
    title: 'Avatar',
    component: Avatar,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Snackbar: Story = {
    args: {
        name: 'Aurthur Morgon',
    },
};
