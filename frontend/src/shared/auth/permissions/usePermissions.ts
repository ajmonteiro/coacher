import { useAuthentication } from 'src/shared/auth/useAuthentication';

export const usePermissions = () => {
	const { user } = useAuthentication();
	return user?.permissions || [];
};
