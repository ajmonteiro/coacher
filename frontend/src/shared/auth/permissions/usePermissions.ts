import { usePermissionsContext } from '@resourge/react-authentication';

export type Permissions = {
	canViewClients: boolean
	canViewDashboard: boolean
	canViewDiets: boolean
	canViewExercises: boolean
	canViewFood: boolean
	canViewMeals: boolean
	canViewWorkouts: boolean
};

export const usePermissions = () => {
	return usePermissionsContext<Permissions>();
};
