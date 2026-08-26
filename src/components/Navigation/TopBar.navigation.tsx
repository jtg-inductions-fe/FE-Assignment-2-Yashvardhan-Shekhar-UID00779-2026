import HistoryIcon from '@mui/icons-material/History';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Badge, Container, IconButton, Link } from '@mui/material';

import {
    DesktopNavBox,
    StyledAppBar,
    StyledAvatar,
    StyledNavButton,
    StyledToolbar,
} from './navigation.styles';
import { BarProps } from './navigation.types';

export const Navbar = ({
    handleProfileClick,
    user,
    activeTab,
    cartCount,
    navigate,
}: BarProps) => (
    <StyledAppBar position="sticky" elevation={1}>
        <Container maxWidth="xl">
            <StyledToolbar disableGutters>
                {/* Brand Logo / Home Link */}
                <Link
                    variant="h6"
                    component="button"
                    onClick={() => void navigate('/')}
                    fontWeight="700"
                    underline="none"
                >
                    Apna Restaurant
                </Link>

                {/* Desktop Menu Links */}
                <DesktopNavBox>
                    <StyledNavButton
                        color={activeTab === 'home' ? 'primary' : 'inherit'}
                        onClick={() => void navigate('/home')}
                    >
                        <HomeOutlinedIcon sx={{ mr: 1 }} /> Home
                    </StyledNavButton>

                    {user?.role === 'customer' && (
                        <StyledNavButton
                            color={activeTab === 'cart' ? 'primary' : 'inherit'}
                            onClick={() => void navigate('/cart')}
                        >
                            <Badge
                                badgeContent={cartCount}
                                color="primary"
                                sx={{ mr: 1 }}
                            >
                                <ShoppingCartOutlinedIcon />
                            </Badge>
                            Cart
                        </StyledNavButton>
                    )}

                    <StyledNavButton
                        color={activeTab === 'orders' ? 'primary' : 'inherit'}
                        onClick={() => void navigate('/orders')}
                    >
                        <HistoryIcon sx={{ mr: 1 }} /> Orders
                    </StyledNavButton>

                    {/* Profile Menu Trigger */}
                    <IconButton
                        color="inherit"
                        onClick={handleProfileClick}
                        size="small"
                        aria-label="opening the profile menu"
                    >
                        <StyledAvatar>
                            {user?.name?.[0]?.toUpperCase()}
                        </StyledAvatar>
                    </IconButton>
                </DesktopNavBox>
            </StyledToolbar>
        </Container>
    </StyledAppBar>
);
