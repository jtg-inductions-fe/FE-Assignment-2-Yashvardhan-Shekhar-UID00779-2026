import { useNavigate } from 'react-router';
import { BarProps } from 'types';

import HistoryIcon from '@mui/icons-material/History';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Badge, BottomNavigation, BottomNavigationAction } from '@mui/material';

import { StyledAvatar, StyledPaper } from './navigation.styles';

export const BottomBar = ({
    handleProfileClick,
    user,
    activeTab,
    cartCount,
}: BarProps) => {
    const navigate = useNavigate();
    return (
        <StyledPaper elevation={10}>
            <BottomNavigation showLabels value={activeTab}>
                <BottomNavigationAction
                    label="Home"
                    value="home"
                    icon={<HomeOutlinedIcon />}
                    onClick={() => void navigate('/home')}
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
                        onClick={() => void navigate('/cart')}
                    />
                )}
                <BottomNavigationAction
                    onClick={() => void navigate('/orders')}
                    label="Orders"
                    value="orders"
                    icon={<HistoryIcon />}
                />
                <BottomNavigationAction
                    label="Profile"
                    value="profile"
                    icon={
                        <StyledAvatar>
                            {user?.name?.[0]?.toUpperCase()}
                        </StyledAvatar>
                    }
                    onClick={handleProfileClick}
                />
            </BottomNavigation>
        </StyledPaper>
    );
};
