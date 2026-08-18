import { User } from 'types/User.types';

import { Button } from '@mui/material';

const Home = (user: User) => (
    <>
        {JSON.stringify(user)}
        <Button color="secondary" variant="contained">
            hello {user.name}{' '}
        </Button>
    </>
);
export { Home };
