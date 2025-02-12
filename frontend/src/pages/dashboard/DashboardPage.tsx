import { CakeIcon, UsersIcon } from '@heroicons/react/24/outline';
import { OrderByEnum, useFetch } from '@resourge/react-fetch';

import DashboardCard from 'src/components/dashboardCard/DashboardCard';
import DataTable from 'src/components/dataTable/DataTable';
import InfoCard from 'src/components/infoCard/InfoCard';
import DashboardLayout from 'src/layouts/dashboardLayout/DashboardLayout';
import { useDataTable } from 'src/shared/hooks/useDataTable';
import { useTranslation } from 'src/shared/translations/Translations';

import UsersPageApi from '../clients/ClientsPageApi';

import DashboardPageApi from './DashboardPageApi';

export default function DashboardPage() {
	const { T } = useTranslation();
	const { data: stats } = useFetch(async () => {
		const result = await DashboardPageApi.getDashboardData();

		return result.data;
	}, {
		initialState: undefined,
		deps: []
	});

	const {
		rows, changePage, paginationData: pagination, deleteEntities
	} = useDataTable({
		entityClass: UsersPageApi,
		orderColumn: 'username',
		orderBy: OrderByEnum.ASC
	});

	return (
		<DashboardLayout>
			<div className="flex flex-col gap-4">
				<h1 className="text-base-content font-semibold text-2xl mb-5">Dashboard</h1>
				{
					stats ? (
						<div className="grid grid-cols-2 gap-5 w-full">
							<DashboardCard
								className="flex-1"
								color="bg-primary"
								icon={<UsersIcon />}
								mainValue={stats.totalUsers.toString()}
								secondaryValue="Users of the system"
							/>
							<DashboardCard
								className="flex-1"
								color="bg-primary"
								icon={<CakeIcon />}
								mainValue={stats.totalFoods.toString()}
								secondaryValue="Foods of the system"
							/>
							<InfoCard>
								{
									rows.data ? (
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
									) : null 
								}
							</InfoCard>
						</div>
					) : null 
				}
			</div>
		</DashboardLayout>
	);
}
