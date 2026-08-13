
import { User } from 'types/User.types';

import { Button } from '@mui/material';

const Home = (user:User) => 
    (
        <>  
        {JSON.stringify(user)}
        <Button>hello {user.name} </Button>
        </>
    )
;

export default Home;


