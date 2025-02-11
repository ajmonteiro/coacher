import { CakeIcon, UsersIcon } from '@heroicons/react/24/outline';
import { useFetch } from '@resourge/react-fetch';

import DashboardCard from 'src/components/dashboardCard/DashboardCard';
import DashboardLayout from 'src/layouts/dashboardLayout/DashboardLayout';

import DashboardPageApi from './DashboardPageApi';

export default function DashboardPage() {
	const { data: stats } = useFetch(async () => {
		const result = await DashboardPageApi.getDashboardData();

		return result.data;
	}, {
		initialState: undefined,
		deps: []
	});
	return (
		<DashboardLayout>
			<div className="flex flex-col gap-4">
				<h1 className="text-base-content font-semibold text-3xl">Dashboard</h1>
				{
					stats ? (
						<div className="flex gap-5 flex-wrap w-full">
							<DashboardCard
								className="flex-1"
								color="bg-gold"
								icon={<UsersIcon />}
								mainValue={stats.totalUsers.toString()}
								secondaryValue="Users of the system"
							/>
							<DashboardCard
								className="flex-1"
								color="bg-gold"
								icon={<CakeIcon />}
								mainValue={stats.totalFoods.toString()}
								secondaryValue="Foods of the system"
							/>
						</div>
					) : null 
				}
			</div>
		</DashboardLayout>
	);
}
