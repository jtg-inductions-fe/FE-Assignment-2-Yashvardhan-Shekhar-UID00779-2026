import { Navigate, Outlet } from 'react-router';

import { Box, LinearProgress, Typography } from '@mui/material';

import onboardingImg from '@assets/images/onboarding-bg.webp';
import { PATH } from '@constant';
import { useAppSelector } from '@store';

import {
    BrandingColumn,
    FormCard,
    OnboardingImage,
    PageContainer,
} from './OnBoarding.styles';

export const OnBoarding = () => {
    const isInitializing = useAppSelector(
        (state) => state.loading.isStartupLoading,
    );
    const isUserPresent = useAppSelector((state) => !!state.user.id);

    if (isInitializing) {
        return <LinearProgress />;
    }

    if (isUserPresent) {
        return <Navigate to={PATH.HOME} />;
    }

    return (
        <PageContainer>
            <BrandingColumn>
                <Box textAlign="center">
                    <Typography
                        variant="h3"
                        component="h1"
                        gutterBottom
                        fontWeight="bold"
                    >
                        Apna Restaurant
                    </Typography>
                    <Typography color="text.secondary">
                        Discover local flavors as a customer or track kitchen
                        tickets as an owner. A single, fast platform designed
                        for both sides of the table.
                    </Typography>
                </Box>
                <OnboardingImage
                    component="img"
                    src={onboardingImg}
                    alt="Onboarding-Illustration"
                />
            </BrandingColumn>
            <FormCard>
                <Outlet />
            </FormCard>
        </PageContainer>
    );
};
