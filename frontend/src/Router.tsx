import { lazy } from 'react';

import { Navigate, Route, Switch } from '@resourge/react-router';

import Routes from './shared/routes/Routes';

const DashboardPage = lazy(() => import('./pages/dashboard/DashboardPage'));
const NotFoundPage = lazy(() => import('./pages/notFound/NotFoundPage'));
const LoginPage = lazy(() => import('./pages/auth/login/LoginPage'));
const RegisterPage = lazy(() => import('./pages/auth/register/RegisterPage'));
const UsersPage = lazy(() => import('./pages/users/UsersPage'));

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
		<Route
			path={Routes.DASHBOARD.MAIN.path}
		>
			<DashboardPage />
		</Route>
		<Route path={Routes.DASHBOARD.USERS.path}>
			<UsersPage />
		</Route>
		<Navigate to={Routes.DASHBOARD.MAIN.get()} />
	</Switch>
);
const Router: React.FC = () => {
	return (
		<Switch>
			<Route path={Routes.AUTH.path}>
				<AuthRouter />
			</Route>
			<Route path={Routes.DASHBOARD.path}>
				<DashboardRouter />
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
