import { useNavigate } from 'react-router';

import HomeIcon from '@mui/icons-material/Home';
import { Stack, Typography } from '@mui/material';

import { Button } from '@components';
import { PATH } from '@constant';

import { StyledNotFoundContainer } from './PageNotFound.styles';

export const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <StyledNotFoundContainer maxWidth="sm">
            <Stack spacing={5} textAlign="center">
                <Typography variant="h1" component="h1">
                    404 Page Not Found
                </Typography>

                <Typography variant="body1" color="text.secondary">
                    Oops! The page you are looking for does not exist, has been
                    removed, or is temporarily unavailable.
                </Typography>

                <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    startIcon={<HomeIcon />}
                    onClick={() => void navigate(PATH.HOME)}
                >
                    Back to Home
                </Button>
            </Stack>
        </StyledNotFoundContainer>
    );
};
