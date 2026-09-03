import { Outlet } from 'react-router';

import { Box, Typography } from '@mui/material';

import onboardingImg from '@assets/images/onboarding-bg.webp';

import {
    BrandingColumn,
    FormCard,
    OnboardingImage,
    PageContainer,
} from './OnBoarding.styles';

export const OnBoarding = () => (
    <PageContainer>
        <BrandingColumn>
            <Box textAlign="center">
                <Typography
                    variant="h3"
                    component="h2"
                    gutterBottom
                    fontWeight="bold"
                >
                    Apna Restaurant
                </Typography>
                <Typography color="text.secondary">
                    Discover local flavors as a customer or track kitchen
                    tickets as an owner. A single, fast platform designed for
                    both sides of the table.
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
