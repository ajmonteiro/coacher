import { OrderByEnum } from '@resourge/react-fetch';

import DataTable from 'src/components/dataTable/DataTable';
import FormControl from 'src/components/formControl/FormControl';
import FormWrapper from 'src/components/formWrapper/FormWrapper';
import Input from 'src/components/input/Input';
import DashboardLayout from 'src/layouts/dashboardLayout/DashboardLayout';
import { useAuthentication } from 'src/shared/auth/useAuthentication';
import { useDataTable } from 'src/shared/hooks/useDataTable';
import { useTranslation } from 'src/shared/translations/Translations';

import MealPageApi from './MealPageApi';
import { useMealModel } from './interfaces/MealModel';

export default function MealPage() {
	const { T } = useTranslation();
	const { user } = useAuthentication();

	const {
		field, handleSubmit, getErrors, hasError 
	} = useMealModel();
	
	const {
		rows, changePage, paginationData: pagination, deleteEntities, fetchResults
	} = useDataTable({
		entityClass: MealPageApi,
		orderColumn: 'name',
		orderBy: OrderByEnum.ASC
	});

	const hasUndeletableRows = (rows: any[]) => {
		return rows.find((row) => row.id === user.id);
	};

	const submit = handleSubmit(async (data) => {
		await MealPageApi.create(data);
		fetchResults();
	});

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
						form={(
							<FormWrapper>
								<FormControl
									errors={getErrors('name')}
									label={T.pages.diet.table.name}
									required
								>
									<Input
										error={hasError('name')}
										{...field('name')}
										placeholder={T.pages.diet.table.description}
									/>
								</FormControl>
								<FormControl
									errors={getErrors('description')}
									label={T.pages.diet.table.description}
									required
								>
									<Input
										error={hasError('description')}
										{...field('description')}
										placeholder={T.pages.diet.table.description}
									/>
								</FormControl>
							</FormWrapper>
						)}
						formSubmission={submit}
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
