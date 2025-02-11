import { usePermissionsContext } from '@resourge/react-authentication';

import { type Permissions } from './Permissions';

export const usePermissions = () => {
	return usePermissionsContext<Permissions>();
};
