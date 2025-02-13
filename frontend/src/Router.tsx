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
const UserProfilePage = lazy(() => import('./pages/userProfile/UserProfilePage'));
const WorkoutsPage = lazy(() => import('./pages/workouts/WorkoutsPage'));
const DietPage = lazy(() => import('./pages/diet/DietPage'));
const MealPage = lazy(() => import('./pages/meal/MealPage'));

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

const DashboardRouter = () => (
	<Switch>
		<AuthorizedRoute
			path={Routes.DASHBOARD.MAIN.path}
		>
			<DashboardPage />
		</AuthorizedRoute>
		<AuthorizedRoute path={Routes.DASHBOARD.CLIENTS.path}>
			<ClientsPage />
		</AuthorizedRoute>
		<AuthorizedRoute path={Routes.DASHBOARD.FOOD.path}>
			<FoodPage />
		</AuthorizedRoute>
		<AuthorizedRoute path={Routes.DASHBOARD.DIET.path}>
			<DietPage />
		</AuthorizedRoute>
		<AuthorizedRoute path={Routes.DASHBOARD.MEAL.path}>
			<MealPage />
		</AuthorizedRoute>
		<AuthorizedRoute path={Routes.DASHBOARD.EXERCISES.path}>
			<ExercisesPage />
		</AuthorizedRoute>
		<AuthorizedRoute path={Routes.DASHBOARD.WORKOUTS.path}>
			<WorkoutsPage />
		</AuthorizedRoute>
		<AuthorizedRoute path={Routes.DASHBOARD.USER_PROFILE.path}>
			<UserProfilePage />
		</AuthorizedRoute>
		<Navigate to={Routes.DASHBOARD.MAIN.get()} />
	</Switch>
);
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
				path="*"
			>
				<NotFoundPage /> 
			</Route>
		</Switch>
	);
};

export default Router;
