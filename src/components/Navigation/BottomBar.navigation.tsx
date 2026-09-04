import { useNavigate } from 'react-router';

import {
    History,
    HomeOutlined,
    ShoppingCartOutlined,
} from '@mui/icons-material';
import { Badge, BottomNavigation, BottomNavigationAction } from '@mui/material';

import { Avatar } from '@components';
import { PATH } from '@constant';

import { StyledPaper } from './navigation.styles';
import { BarProps } from './navigation.types';

export const BottomBar = (props: BarProps) => {
    const { handleProfileClick, user, activeTab, cartCount } = props;

    const navigate = useNavigate();

    return (
        <StyledPaper elevation={10}>
            <BottomNavigation showLabels value={activeTab}>
                <BottomNavigationAction
                    label="Restaurants"
                    value="/restaurants"
                    icon={<HomeOutlined />}
                    onClick={() => void navigate(PATH.HOME)}
                />
                {user?.role === 'customer' && (
                    <BottomNavigationAction
                        label="Cart"
                        value="/cart"
                        icon={
                            <Badge badgeContent={cartCount} color="primary">
                                <ShoppingCartOutlined />
                            </Badge>
                        }
                        onClick={() => void navigate(PATH.CART)}
                    />
                )}
                <BottomNavigationAction
                    onClick={() => void navigate(PATH.ORDERS)}
                    label="Orders"
                    value="/orders"
                    icon={<History />}
                />
                <BottomNavigationAction
                    label="Profile"
                    value="/profile"
                    icon={<Avatar name={user?.name} />}
                    onClick={(event) => {
                        handleProfileClick(event.currentTarget);
                    }}
                />
            </BottomNavigation>
        </StyledPaper>
    );
};
