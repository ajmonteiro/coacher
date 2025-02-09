import { lazy } from 'react';

import { Navigate, Route, Switch } from '@resourge/react-router';

import Routes from './shared/routes/Routes';

const DashboardPage = lazy(() => import('./pages/dashboard/DashboardPage'));
const NotFoundPage = lazy(() => import('./pages/notFound/NotFoundPage'));
const LoginPage = lazy(() => import('./pages/auth/login/LoginPage'));

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

const Router: React.FC = () => {
	return (
		<Switch>
			<Route path={Routes.AUTH.path}>
				<AuthRouter />
			</Route>
			<Route path={Routes.DASHBOARD.path}>
				<DashboardPage />
			</Route>
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
