import { NavigateFunction } from 'react-router';

import { User } from '@types';

export type BarProps = {
    handleProfileClick: (event: React.MouseEvent<HTMLElement>) => void;
    user: User;
    activeTab: string;
    cartCount: number;
    navigate: NavigateFunction;
};
