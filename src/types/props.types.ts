import { User } from './auth.types';

export type BarProps = {
    handleProfileClick: (event: React.MouseEvent<HTMLElement>) => void;
    user: User;
    activeTab: string;
    cartCount: number;
};
