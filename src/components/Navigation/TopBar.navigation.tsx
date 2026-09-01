import { useNavigate } from 'react-router';

import {
    History,
    HomeOutlined,
    ShoppingCartOutlined,
} from '@mui/icons-material';
import { Badge, Container, IconButton, Link, Toolbar } from '@mui/material';

import { Avatar } from '@components';
import { PATH } from '@constant';

import {
    DesktopNavBox,
    StyledAppBar,
    StyledNavButton,
} from './navigation.styles';
import { BarProps } from './navigation.types';

export const Navbar = (props: BarProps) => {
    const { handleProfileClick, user, activeTab, cartCount } = props;
    const activeTabPath = '/' + activeTab;

    const navigate = useNavigate();

    return (
        <StyledAppBar position="sticky" elevation={1}>
            <Container maxWidth="xl">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Link
                        variant="h6"
                        component="button"
                        onClick={() => void navigate(PATH.HOME)}
                        fontWeight="700"
                        underline="none"
                    >
                        Apna Restaurant
                    </Link>

                    <DesktopNavBox>
                        <StyledNavButton
                            color={
                                activeTabPath === PATH.HOME
                                    ? 'primary'
                                    : 'inherit'
                            }
                            onClick={() => void navigate(PATH.HOME)}
                        >
                            <HomeOutlined sx={{ mr: 1 }} /> Restaurants
                        </StyledNavButton>

                        {user?.role === 'customer' && (
                            <StyledNavButton
                                color={
                                    activeTabPath === PATH.CART
                                        ? 'primary'
                                        : 'inherit'
                                }
                                onClick={() => void navigate(PATH.CART)}
                            >
                                <Badge
                                    badgeContent={cartCount}
                                    color="primary"
                                    sx={{ mr: 1 }}
                                >
                                    <ShoppingCartOutlined />
                                </Badge>
                                Cart
                            </StyledNavButton>
                        )}

                        <StyledNavButton
                            color={
                                activeTabPath === PATH.ORDERS
                                    ? 'primary'
                                    : 'inherit'
                            }
                            onClick={() => void navigate(PATH.ORDERS)}
                        >
                            <History sx={{ mr: 1 }} /> Orders
                        </StyledNavButton>

                        <IconButton
                            color="inherit"
                            onClick={(event) => {
                                handleProfileClick(event.currentTarget);
                            }}
                            size="small"
                            aria-label="opening the profile menu"
                        >
                            <Avatar name={user?.name} />
                        </IconButton>
                    </DesktopNavBox>
                </Toolbar>
            </Container>
        </StyledAppBar>
    );
};
