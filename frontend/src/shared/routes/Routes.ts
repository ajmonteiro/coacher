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
			userId: searchParam<{ userId?: string }>
		}),
		MEAL: path('meal'),
		EXERCISES: path('exercises'),
		WORKOUTS: path('workouts').searchParams({
			userId: searchParam<{ userId?: string }>
		}),
		USER_PROFILE: path('profile').searchParams({
			userId: searchParam<{ userId: string }>
		}),
		CLIENT_PROFILE: path('client-profile')
	}),
	NOT_FOUND: path('*')
});

export default Routes;
