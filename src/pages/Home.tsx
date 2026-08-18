import { logout } from 'services/auth';

import { StyledButton } from '@styles';

const Home = () => {
    const handleChnage = () => {
        logout();
    };

    return (
        <>
            <StyledButton
                color="secondary"
                variant="contained"
                onClick={handleChnage}
            >
                hello this is home{' '}
            </StyledButton>
        </>
    );
};
export { Home };
