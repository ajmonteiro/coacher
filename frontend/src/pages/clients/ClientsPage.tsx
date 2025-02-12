import { OrderByEnum } from '@resourge/react-fetch';
import { useNavigate } from '@resourge/react-router';

import DataTable from 'src/components/dataTable/DataTable';
import DashboardLayout from 'src/layouts/dashboardLayout/DashboardLayout';
import { useAuthentication } from 'src/shared/auth/useAuthentication';
import { useDataTable } from 'src/shared/hooks/useDataTable';
import Routes from 'src/shared/routes/Routes';
import { useTranslation } from 'src/shared/translations/Translations';

import ClientsPageApi from './ClientsPageApi';

export default function ClientsPage() {
	const { T } = useTranslation();
	const { user } = useAuthentication();
	const navigate = useNavigate();
	
	const {
		rows, changePage, paginationData: pagination, deleteEntities
	} = useDataTable({
		entityClass: ClientsPageApi,
		orderColumn: 'username',
		orderBy: OrderByEnum.ASC
	});

	const hasUndeletableRows = (rows: any[]) => {
		return rows.find((row) => row.id === user.id);
	};

	return (
		<DashboardLayout>
			<div className="w-full h-full rounded-box">
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
								},
								{
									columnName: 'role',
									columnLabel: T.pages.clients.table.role
								}
							]}
							data={rows.data}
							deleteEntities={deleteEntities}
							goToEntity={(id: string) => navigate(Routes.DASHBOARD.USER_PROFILE.get({
								searchParams: {
									userId: id
								}
							}))}
							paginationData={pagination}
							primaryKey="id"
							tableTitle={T.pages.clients.table.tableTitle}
							undeletableRows={hasUndeletableRows(rows.data) ? [user.id] : []}
						/>
					) : null 
				}
			</div>
		</DashboardLayout>
	);
}
