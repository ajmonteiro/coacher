import { OrderByEnum } from '@resourge/react-fetch';

import DataTable from 'src/components/dataTable/DataTable';
import DashboardLayout from 'src/layouts/dashboardLayout/DashboardLayout';
import { useAuthentication } from 'src/shared/auth/useAuthentication';
import { useDataTable } from 'src/shared/hooks/useDataTable';
import { useTranslation } from 'src/shared/translations/Translations';

import UsersPageApi from './UsersPageApi';

export default function UsersPage() {
	const { T } = useTranslation();
	const { user } = useAuthentication();
	const {
		rows, changePage, paginationData: pagination, deleteEntities
	} = useDataTable({
		entityClass: UsersPageApi,
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
									columnName: 'id',
									columnLabel: 'Id'
								}, 
								{
									columnName: 'username',
									columnLabel: T.pages.users.table.username
								},
								{
									columnName: 'fullName',
									columnLabel: T.pages.users.table.fullName
								},
								{
									columnName: 'phone',
									columnLabel: T.pages.users.table.phone
								},
								{
									columnName: 'role',
									columnLabel: T.pages.users.table.role
								}
							]}
							data={rows.data}
							deleteEntities={deleteEntities}
							form={undefined}
							formSubmission={function (): void {
								throw new Error('Function not implemented.');
							}}
							paginationData={pagination}
							primaryKey="id"
							tableTitle={T.pages.users.table.tableTitle}
							undeletableRows={hasUndeletableRows(rows.data) ? [user.id] : []}
						/>
					) : null 
				}
			</div>
		</DashboardLayout>
	);
}
