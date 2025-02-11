import { lazy } from 'react';

import { Navigate, Route, Switch } from '@resourge/react-router';

import AuthorizedRoute from './components/routes/authorizedRoute/AuthorizedRoute';
import Routes from './shared/routes/Routes';

const DashboardPage = lazy(() => import('./pages/dashboard/DashboardPage'));
const NotFoundPage = lazy(() => import('./pages/notFound/NotFoundPage'));
const LoginPage = lazy(() => import('./pages/auth/login/LoginPage'));
const RegisterPage = lazy(() => import('./pages/auth/register/RegisterPage'));
const UsersPage = lazy(() => import('./pages/users/UsersPage'));
const FoodPage = lazy(() => import('./pages/food/FoodPage'));
const UserProfilePage = lazy(() => import('./pages/userProfile/UserProfilePage'));

const AuthRouter = () => (
	<Switch>
		<Route
			path={Routes.AUTH.LOGIN.path}
		>
			<LoginPage />
		</Route>
		<Route
			path={Routes.AUTH.REGISTER.path}
		>
			<RegisterPage />
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
		<AuthorizedRoute path={Routes.DASHBOARD.USERS.path}>
			<UsersPage />
		</AuthorizedRoute>
		<AuthorizedRoute path={Routes.DASHBOARD.FOOD.path}>
			<FoodPage />
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
