import { SetupPaths, path, searchParam } from '@resourge/react-router';

const Routes = SetupPaths({
	AUTH: path('auth').routes({
		LOGIN: path('login'),
		REGISTER: path('register')
	}),
	DASHBOARD: path('dashboard').routes({
		MAIN: path('index'),
		USERS: path('users'),
		FOOD: path('food'),
		USER_PROFILE: path('profile').searchParams({
			userId: searchParam<{ userId: string }>
		})
	}),
	NOT_FOUND: path('*')
});

export default Routes;
