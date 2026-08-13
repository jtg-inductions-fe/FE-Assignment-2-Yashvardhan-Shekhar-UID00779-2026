import { Home, OnBoarding } from './pages';
import { AppDispatch, useAppDispatch } from './store';
import { updateUser } from './store/userSlice';
import { User } from './types/User.types';

const App = () => {
    const temp = {
        name: 'Amir',
        email: 'Amir@gmail.com',
        id: '7890hyui',
        role: 'customer',
    };
    localStorage.setItem('user', JSON.stringify(temp));

    const user = JSON.parse(localStorage.getItem('user') || '') as User;

    const isPresent =
        user && user.name && user.email && user.id && user.role ? true : false;

    const dispatch: AppDispatch = useAppDispatch();

    if (isPresent) {
        dispatch(updateUser(user));
    }

    return isPresent ? <Home {...user} /> : <OnBoarding />;
};
export default App;
