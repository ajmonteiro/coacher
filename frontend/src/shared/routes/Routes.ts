import { SetupPaths, path, searchParam } from '@resourge/react-router';

const Routes = SetupPaths({
	AUTH: path('auth').routes({
		LOGIN: path('login')
	}),
	DASHBOARD: path('dashboard').routes({
		INITIAL: path(''),
		MAIN: path('index'),
		CLIENTS: path('clients'),
		FOOD: path('food'),
		DIET: path('diet').searchParams({
			dietId: searchParam<{ dietId?: string }>,
			userId: searchParam<{ userId?: string }>,
			refresh: searchParam<{ refresh?: Date }>
		}),
		MEAL: path('meal'),
		EXERCISES: path('exercises'),
		WORKOUTS_PLANS: path('workouts-plans').searchParams({
			userId: searchParam<{ userId?: string }>
		}),
		USER_PROFILE: path('profile').searchParams({
			userId: searchParam<{ userId: string }>
		}),
		CLIENT_INFO: path('client-info'),
		CLIENT_WORKOUTS: path('client-workouts'),
		CLIENT_DIET: path('client-diet')
	}),
	NOT_FOUND: path('*'),
	ERROR: path('502')
});

export default Routes;
