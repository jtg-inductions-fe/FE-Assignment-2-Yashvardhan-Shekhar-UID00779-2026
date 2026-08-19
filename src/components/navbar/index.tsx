import { useNavigate } from 'react-router';
import { BarProps } from 'types';

import HistoryIcon from '@mui/icons-material/History';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {
    AppBar,
    Avatar,
    Badge,
    Box,
    Button,
    Container,
    IconButton,
    Link,
    Toolbar,
} from '@mui/material';

import { COLORS } from '@constant';

const Navbar = ({
    handleProfileClick,
    user,
    activeTab,
    cartCount,
}: BarProps) => {
    const navigate = useNavigate();

    return (
        <AppBar
            position="sticky"
            elevation={1}
            sx={{ bgcolor: 'background.paper', color: 'text.primary' }}
        >
            <Container maxWidth="xl">
                <Toolbar
                    disableGutters
                    sx={{ justifyContent: 'space-between' }}
                >
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
                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            gap: 1,
                            alignItems: 'center',
                            color: COLORS.textSecondary,
                        }}
                    >
                        <Button
                            color={activeTab === 'home' ? 'primary' : 'inherit'}
                            onClick={() => void navigate('/home')}
                        >
                            <HomeOutlinedIcon sx={{ mr: 1 }} /> Home
                        </Button>

                        {user?.role === 'customer' && (
                            <Button
                                color={
                                    activeTab === 'cart' ? 'primary' : 'inherit'
                                }
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
                            </Button>
                        )}

                        <Button
                            color={
                                activeTab === 'orders' ? 'primary' : 'inherit'
                            }
                            onClick={() => void navigate('/orders')}
                        >
                            <HistoryIcon sx={{ mr: 1 }} /> Orders
                        </Button>

                        {/* Profile Menu Trigger */}
                        <IconButton
                            color="inherit"
                            onClick={handleProfileClick}
                            size="small"
                            sx={{ ml: 1 }}
                        >
                            <Avatar
                                sx={{
                                    width: 32,
                                    height: 32,
                                    bgcolor: 'primary.main',
                                }}
                            >
                                {user?.name?.[0]?.toUpperCase()}
                            </Avatar>
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export { Navbar };
