import DashboardLayout from 'src/layouts/dashboardLayout/DashboardLayout';
import { useAuthentication } from 'src/shared/auth/useAuthentication';
import WorkoutPlansTable from 'src/shared/components/workoutPlansTable/WorkoutPlansTable';

export default function ClientWorkoutsPage() {
	const { user } = useAuthentication();

	console.log(user);
	return (
		<DashboardLayout>
			{
				user.workoutPlans ? (
					<WorkoutPlansTable workoutPlans={user.workoutPlans} />
				) : null 
			}
		</DashboardLayout>
	);
}
