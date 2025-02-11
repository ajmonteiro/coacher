import { useAuthenticationContext } from '@resourge/react-authentication';

import { type User } from './User';

export const useAuthentication = () => {
	return useAuthenticationContext<User>();
};
