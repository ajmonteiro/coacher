import { SetupPaths, path } from '@resourge/react-router';

const Routes = SetupPaths({
	AUTH: path('auth').routes({
		LOGIN: path('login')
	}),
	DASHBOARD: path(''),
	NOT_FOUND: path('*')
});

export default Routes;
