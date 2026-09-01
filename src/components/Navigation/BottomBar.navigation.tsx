import { useNavigate } from 'react-router';

import HistoryIcon from '@mui/icons-material/History';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
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
                    value="restaurants"
                    icon={<HomeOutlinedIcon />}
                    onClick={() => void navigate(PATH.HOME)}
                />
                {user?.role === 'customer' && (
                    <BottomNavigationAction
                        label="Cart"
                        value="cart"
                        icon={
                            <Badge badgeContent={cartCount} color="primary">
                                <ShoppingCartOutlinedIcon />
                            </Badge>
                        }
                        onClick={() => void navigate(PATH.CART)}
                    />
                )}
                <BottomNavigationAction
                    onClick={() => void navigate(PATH.ORDERS)}
                    label="Orders"
                    value="orders"
                    icon={<HistoryIcon />}
                />
                <BottomNavigationAction
                    label="Profile"
                    value="profile"
                    icon={<Avatar name={user?.name} />}
                    onClick={handleProfileClick}
                />
            </BottomNavigation>
        </StyledPaper>
    );
};
