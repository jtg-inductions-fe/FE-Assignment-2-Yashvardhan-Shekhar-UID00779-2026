import { useNavigate } from 'react-router';

import {
    History,
    HomeOutlined,
    ShoppingCartOutlined,
} from '@mui/icons-material';
import {
    Badge,
    Button,
    Container,
    IconButton,
    Link,
    Toolbar,
} from '@mui/material';

import { Avatar } from '@components';
import { PATH } from '@constant';

import { DesktopNavBox, StyledAppBar } from './navigation.styles';
import { BarProps } from './navigation.types';

export const Navbar = (props: BarProps) => {
    const { handleProfileClick, user, activeTab, cartCount } = props;

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
                        <Button
                            color={
                                activeTab === PATH.HOME ? 'primary' : 'inherit'
                            }
                            onClick={() => void navigate(PATH.HOME)}
                        >
                            <HomeOutlined sx={{ mr: 1 }} /> Restaurants
                        </Button>
                        {user?.role === 'customer' && (
                            <Button
                                color={
                                    activeTab === PATH.CART
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
                            </Button>
                        )}
                        <Button
                            color={
                                activeTab === PATH.ORDERS
                                    ? 'primary'
                                    : 'inherit'
                            }
                            onClick={() => void navigate(PATH.ORDERS)}
                        >
                            <History sx={{ mr: 1 }} /> Orders
                        </Button>
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
