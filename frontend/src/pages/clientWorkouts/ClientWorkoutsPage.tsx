import DashboardLayout from 'src/layouts/dashboardLayout/DashboardLayout';
import { useAuthentication } from 'src/shared/auth/useAuthentication';
import WorkoutsTable from 'src/shared/components/workoutsTable/WorkoutsTable';

export default function ClientWorkoutsPage() {
	const { user } = useAuthentication();
	return (
		<DashboardLayout>
			{
				user.workouts ? (
					<WorkoutsTable workouts={user.workouts} />
				) : null 
			}
		</DashboardLayout>
	);
}
