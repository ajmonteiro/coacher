import React from 'react';

import { Navigate, Route, type RouteProps } from '@resourge/react-router';

import { useAuthentication } from 'src/shared/auth/useAuthentication';
import Routes from 'src/shared/routes/Routes';

type Props = RouteProps & {
	redirect?: string
};

const NotAuthorizedRoute: React.FC<Props> = ({
	redirect = Routes.DASHBOARD.MAIN.get(), children, ...props
}) => {
	const { user } = useAuthentication();

	return (
		<Route {...props}>
			{
				children 
					? !user.isAuthenticated 
						? children 
						: <Navigate to={redirect} /> 
					: null 
			}
		</Route>
	);
};

export default NotAuthorizedRoute;
