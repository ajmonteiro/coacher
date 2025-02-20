import DashboardLayout from 'src/layouts/dashboardLayout/DashboardLayout';
import { useAuthentication } from 'src/shared/auth/useAuthentication';
import DietTable from 'src/shared/components/dietTable/DietTable';

export default function ClientDietsPage() {
	const { user } = useAuthentication();
	return (
		<DashboardLayout>
			{
				user.diets ? (
					<DietTable diets={user.diets} />
				) : null 
			}
		</DashboardLayout>
	);
}
