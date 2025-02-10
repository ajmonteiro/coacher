import { SetupPaths, path } from '@resourge/react-router';

const Routes = SetupPaths({
	AUTH: path('auth').routes({
		LOGIN: path('login'),
		REGISTER: path('register')
	}),
	DASHBOARD: path('dashboard').routes({
		MAIN: path('index'),
		USERS: path('users')
	}),
	NOT_FOUND: path('*')
});

export default Routes;
