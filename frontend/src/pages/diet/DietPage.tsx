import { useEffect } from 'react';

import { OrderByEnum, useFetch } from '@resourge/react-fetch';
import { useSearchParams } from '@resourge/react-router';

import DataTable from 'src/components/dataTable/DataTable';
import FormControl from 'src/components/formControl/FormControl';
import FormWrapper from 'src/components/formWrapper/FormWrapper';
import Input from 'src/components/input/Input';
import SearchableInput from 'src/components/searchableInput/SearchableInput';
import DashboardLayout from 'src/layouts/dashboardLayout/DashboardLayout';
import { useDataTable } from 'src/shared/hooks/useDataTable';
import HttpBaseService from 'src/shared/services/HttpBaseService';
import { useTranslation } from 'src/shared/translations/Translations';

import DietPageApi from './DietPageApi';
import { useDietModel } from './interfaces/DietModel';

export default function DietPage() {
	const { T } = useTranslation();
	const { userId } = useSearchParams();

	const {
		field, handleSubmit, getErrors, hasError, reset
	} = useDietModel();

	const { data: users } = useFetch<any, any>(async () => {
		const result = await HttpBaseService.get('/User/options');

		return result.data;
	}, {
		deps: [],
		initialState: [],
		enable: !userId
	});
	
	const {
		rows, changePage, paginationData: pagination, deleteEntities, fetchResults
	} = useDataTable({
		entityClass: DietPageApi,
		orderColumn: 'name',
		orderBy: OrderByEnum.ASC
	});

	const submit = handleSubmit(async (data) => {
		await DietPageApi.create(data);
		fetchResults();
	});

	useEffect(() => {
		if (userId) {
			reset({
				userId
			});
		}
	}, []);

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
							},
							{
								columnName: 'user.fullName',
								columnLabel: T.pages.diet.table.userFullName
							}
						]}
						data={rows.data}
						deleteEntities={deleteEntities}
						form={(
							<>
								{
									!userId ? (
										<FormWrapper className="w-full">
											<FormControl 
												errors={getErrors('userId')}
												label={T.pages.workouts.table.user}
												required
											>
												<SearchableInput
													{...field('userId')}
													error={hasError('userId')}
													options={users}
												/>
											</FormControl>
										</FormWrapper>
									) : null 
								}
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
							</>
						)}
						formSubmission={submit}
						paginationData={pagination}
						primaryKey="id"
						tableTitle={T.pages.diet.table.tableTitle}
						triggerModal={!!userId}
					/>
				) : null 
			}
		</DashboardLayout>
	);
}
