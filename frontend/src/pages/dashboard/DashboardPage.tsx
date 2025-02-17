import { Avocado, Bicycle, Users } from '@phosphor-icons/react';
import { OrderByEnum, useFetch } from '@resourge/react-fetch';

import DashboardCard from 'src/components/dashboardCard/DashboardCard';
import DataTable from 'src/components/dataTable/DataTable';
import InfoCard from 'src/components/infoCard/InfoCard';
import PhosphorIcon from 'src/components/phosphorIcon/PhosphorIcon';
import DashboardLayout from 'src/layouts/dashboardLayout/DashboardLayout';
import { useAuthentication } from 'src/shared/auth/useAuthentication';
import { useDataTable } from 'src/shared/hooks/useDataTable';
import Routes from 'src/shared/routes/Routes';
import { useTranslation } from 'src/shared/translations/Translations';

import UsersPageApi from '../clients/ClientsPageApi';

import DashboardPageApi from './DashboardPageApi';

export default function DashboardPage() {
	const { T } = useTranslation();
	const { user } = useAuthentication();

	const { data: stats } = useFetch(async () => {
		const result = await DashboardPageApi.getDashboardData();
		return result.data;
	}, {
		enable: user.hasPermission('ReadDashboard'),
		initialState: undefined,
		deps: []
	});

	const {
		rows, changePage, paginationData: pagination, deleteEntities
	} = useDataTable({
		entityClass: UsersPageApi,
		orderColumn: 'username',
		orderBy: OrderByEnum.ASC,
		isEnabled: user.hasPermission('ReadUser')
	});

	return (
		<DashboardLayout>
			<div className="container mx-auto p-4"> 
				<h1 className="text-3xl font-bold text-gold mb-6">{ T.pages.dashboard.title }</h1> 
				{
					stats ? (
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6"> 
							<DashboardCard
								icon={(
									<PhosphorIcon 
										color="white"
										icon={<Users />}
									/>
								)}
								link={Routes.DASHBOARD.CLIENTS.get()}
								mainValue={stats.totalUsers.toString()}
								secondaryValue={T.pages.dashboard.clients_in_system}
							/>
							<DashboardCard
								icon={(
									<PhosphorIcon 
										color="white"
										icon={<Bicycle />}
									/>
								)}
								link={Routes.DASHBOARD.EXERCISES.get()}
								mainValue={stats.totalExercises.toString()}
								secondaryValue={T.pages.dashboard.exercises_in_system}
							/>
							<DashboardCard
								icon={(
									<PhosphorIcon 
										color="white"
										icon={<Avocado />}
									/>
								)}
								link={Routes.DASHBOARD.FOOD.get()}
								mainValue={stats.totalFoods.toString()}
								secondaryValue={T.pages.dashboard.foods_in_system}
							/>
							{
								rows.data ? (
									<div className="md:col-span-3"> 
										<InfoCard className="bg-white shadow rounded-lg p-6"> 
								
											<DataTable
												changePage={changePage}
												columns={[
													{
														columnName: 'username',
														columnLabel: T.pages.clients.table.username
													},
													{
														columnName: 'fullName',
														columnLabel: T.pages.clients.table.fullName
													},
													{
														columnName: 'phone',
														columnLabel: T.pages.clients.table.phone
													}
												]}
												data={rows.data}
												deleteAllowed={false}
												deleteEntities={deleteEntities}
												fullWidthTable
												paginationData={pagination}
												primaryKey="id"
												tableTitle={T.pages.clients.table.tableTitle}
												undeletableRows={[]}
											/>
								
										</InfoCard>
								
									</div>
								) : null 
							} 
						</div>
					) : null 
				}
			</div>
		</DashboardLayout>
	);
}
