import { OrderByEnum } from '@resourge/react-fetch';

import DataTable from 'src/components/dataTable/DataTable';
import DashboardLayout from 'src/layouts/dashboardLayout/DashboardLayout';
import { useAuthentication } from 'src/shared/auth/useAuthentication';
import { useDataTable } from 'src/shared/hooks/useDataTable';
import { useTranslation } from 'src/shared/translations/Translations';

import MealPageApi from './MealPageApi';

export default function MealPage() {
	const { T } = useTranslation();
	const { user } = useAuthentication();

	const {
		rows, changePage, paginationData: pagination, deleteEntities
	} = useDataTable({
		entityClass: MealPageApi,
		orderColumn: 'name',
		orderBy: OrderByEnum.ASC
	});

	const hasUndeletableRows = (rows: any[]) => {
		return rows.find((row) => row.id === user.id);
	};

	return (
		<DashboardLayout>
			{
				rows.data ? (
					<DataTable
						changePage={changePage}
						columns={[
							{
								columnName: 'name',
								columnLabel: T.pages.diet.table.name
							},
							{
								columnName: 'description',
								columnLabel: T.pages.diet.table.description
							}
						]}
						data={rows.data}
						deleteEntities={deleteEntities}
						paginationData={pagination}
						primaryKey="id"
						tableTitle={T.pages.diet.table.tableTitle}
						undeletableRows={hasUndeletableRows(rows.data) ? [user.id] : []}
					/>
				) : null 
			}
		</DashboardLayout>
	);
}
