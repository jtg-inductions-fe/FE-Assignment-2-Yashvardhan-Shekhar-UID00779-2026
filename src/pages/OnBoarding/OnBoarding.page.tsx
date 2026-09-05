import { useEffect } from 'react';

import { Outlet, useNavigate } from 'react-router';

import { Box, LinearProgress, Typography } from '@mui/material';

import onboardingImg from '@assets/images/onboarding-bg.webp';
import { useAppDispatch, useAppSelector } from '@store';
import { navigateUserBasedOnState } from '@utils';

import {
    BrandingColumn,
    FormCard,
    OnboardingImage,
    PageContainer,
} from './OnBoarding.styles';

export const OnBoarding = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isLoading = useAppSelector(
        (state) => state.loading.isStartupLoading || !!state.user.id,
    );

    useEffect(() => {
        void navigateUserBasedOnState(dispatch, navigate, true);
    }, [dispatch, navigate]);

    return isLoading ? (
        <LinearProgress />
    ) : (
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
