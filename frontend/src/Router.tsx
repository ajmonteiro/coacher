import { lazy } from 'react';

import { Navigate, Route, Switch } from '@resourge/react-router';

import AuthorizedRoute from './components/routes/authorizedRoute/AuthorizedRoute';
import ExercisesPage from './pages/exercises/ExercisesPage';
import Routes from './shared/routes/Routes';

const DashboardPage = lazy(() => import('./pages/dashboard/DashboardPage'));
const NotFoundPage = lazy(() => import('./pages/notFound/NotFoundPage'));
const LoginPage = lazy(() => import('./pages/auth/login/LoginPage'));
const ClientsPage = lazy(() => import('./pages/clients/ClientsPage'));
const FoodPage = lazy(() => import('./pages/food/FoodPage'));
const UserProfilePage = lazy(() => import('./pages/user/userProfile/UserProfilePage'));
const WorkoutPlansPage = lazy(() => import('./pages/workoutPlans/WorkoutPlansPage'));
const DietPage = lazy(() => import('./pages/diet/DietPage'));
const MealPage = lazy(() => import('./pages/meal/MealPage'));
const ClientInfoPage = lazy(() => import('./pages/clientInfo/ClientInfoPage'));
const ClientDietsPage = lazy(() => import('./pages/clientDiets/ClientDietsPage'));
const ClientWorkoutsPage = lazy(() => import('./pages/clientWorkouts/ClientWorkoutsPage'));
const WorkoutPlanDetailPage = lazy(() => import('./pages/workoutPlanDetail/WorkoutPlanDetailPage'));

const AuthRouter = () => (
	<Switch>
		<Route
			path={Routes.AUTH.LOGIN.path}
		>
			<LoginPage />
		</Route>
		<Navigate to={Routes.AUTH.LOGIN.get()} />
	</Switch>
);

const DashboardRouter = () => {
	return (
		<Switch>
			<AuthorizedRoute
				path={Routes.DASHBOARD.MAIN.path}
			>
				<DashboardPage />
			</AuthorizedRoute>
			<AuthorizedRoute
				can={['ReadUser']}
				path={Routes.DASHBOARD.CLIENTS.path}
			>
				<ClientsPage />
			</AuthorizedRoute>
			<AuthorizedRoute
				can={['ReadFood']}
				path={Routes.DASHBOARD.FOOD.path}
			>
				<FoodPage />
			</AuthorizedRoute>
			<AuthorizedRoute
				can={['ReadDiet']}
				path={Routes.DASHBOARD.DIET.path}
			>
				<DietPage />
			</AuthorizedRoute>
			<AuthorizedRoute 
				can={['ReadMeal']}
				path={Routes.DASHBOARD.MEAL.path}
			>
				<MealPage />
			</AuthorizedRoute>
			<AuthorizedRoute
				can={['ReadExercise']}
				path={Routes.DASHBOARD.EXERCISES.path}
			>
				<ExercisesPage />
			</AuthorizedRoute>
			<AuthorizedRoute 
				can={['ReadWorkout']}
				path={Routes.DASHBOARD.WORKOUTS_PLANS.PLAN_DETAIL.path}
			>
				<WorkoutPlanDetailPage />
			</AuthorizedRoute>
			<AuthorizedRoute 
				can={['ReadWorkout']}
				path={Routes.DASHBOARD.WORKOUTS_PLANS.path}
			>
				<WorkoutPlansPage />
			</AuthorizedRoute>
			<AuthorizedRoute 
				can={['ReadUser']}
				path={Routes.DASHBOARD.USER_PROFILE.path}
			>
				<UserProfilePage />
			</AuthorizedRoute>
			<AuthorizedRoute 
				can={['ReadClientInfo']}
				path={Routes.DASHBOARD.CLIENT_DIET.path}
			>
				<ClientDietsPage />
			</AuthorizedRoute>
			<AuthorizedRoute 
				can={['ReadClientInfo']}
				path={Routes.DASHBOARD.CLIENT_WORKOUTS.path}
			>
				<ClientWorkoutsPage />
			</AuthorizedRoute>
			<AuthorizedRoute path={Routes.DASHBOARD.CLIENT_INFO.path}>
				<ClientInfoPage />
			</AuthorizedRoute>
			<Navigate to={Routes.DASHBOARD.MAIN.get()} />
		</Switch>
	);
};
const Router: React.FC = () => {
	return (
		<Switch>
			<Route path={Routes.AUTH.path}>
				<AuthRouter />
			</Route>
			<AuthorizedRoute path={Routes.DASHBOARD.path}>
				<DashboardRouter />
			</AuthorizedRoute>
			<Route
				path="/"
			>
				<Navigate
					replace={true}
					to={Routes.DASHBOARD.get()}
				/>
			</Route>
			<Route 
				path="*"
			>
				<NotFoundPage /> 
			</Route>
		</Switch>
	);
};

export default Router;
