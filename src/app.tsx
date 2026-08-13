
import {Home, OnBoarding} from './pages';
import {AppDispatch, useAppDispatch, useAppSelector } from './store'
import { updateUser } from './store/userSlice'
import {User} from './types/User.types';

const App = () => {
	const temp = {
        name:'Amir',
        email:'Amir@gmail.com',
        id:'7890hyui',
        role:'customer'
    }
	localStorage.setItem('user',JSON.stringify(temp))

	let user:User = JSON.parse(localStorage.getItem('user'));
	
    const isPresent = user && user.name && user.email && user.id && user.role ? true : false;
	
    if( isPresent ){
		const dispatch: AppDispatch  = useAppDispatch();
        dispatch(updateUser(user));
	}

	return isPresent ? <Home {...user} /> : <OnBoarding/>;
}
export default App;
