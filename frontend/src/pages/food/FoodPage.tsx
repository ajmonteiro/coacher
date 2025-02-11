import DataTable from 'src/components/dataTable/DataTable';
import FormControl from 'src/components/formControl/FormControl';
import FormWrapper from 'src/components/formWrapper/FormWrapper';
import Input from 'src/components/input/Input';
import DashboardLayout from 'src/layouts/dashboardLayout/DashboardLayout';
import { useDataTable } from 'src/shared/hooks/useDataTable';
import { useTranslation } from 'src/shared/translations/Translations';

import FoodPageApi from './FoodPageApi';
import { useFoodModel } from './interfaces/FoodModel';

export default function FoodPage() {
	const { T } = useTranslation();

	const {
		field, handleSubmit, hasError, getErrors 
	} = useFoodModel();

	const {
		rows, changePage, paginationData: pagination, deleteEntities, fetchResults
	} = useDataTable({
		entityClass: FoodPageApi,
		orderColumn: 'name'
	});

	const submit = handleSubmit(async (data) => {
		await FoodPageApi.create(data);
		fetchResults();
	});

	return (
		<DashboardLayout>
			<div className="w-full h-full rounded-box">
				{
					rows.data ? (
						<DataTable
							changePage={changePage}
							columns={[
								{
									columnName: 'name',
									columnLabel: T.pages.foods.table.name
								},
								{
									columnName: 'calories',
									columnLabel: T.pages.foods.table.calories
								},
								{
									columnName: 'carbs',
									columnLabel: T.pages.foods.table.carbs
								},
								{
									columnName: 'fat',
									columnLabel: T.pages.foods.table.fat
								},
								
								{
									columnName: 'protein',
									columnLabel: T.pages.foods.table.protein
								}
							]}
							data={rows.data}
							deleteEntities={deleteEntities}
							form={(
								<>
									<div className="flex flex-col gap-2">
										<FormWrapper>
											<FormControl
												errors={getErrors('name')}
												label={T.pages.foods.table.name}
												required
											>
												<Input
													{...field('name')}
													error={hasError('name')}
												/>
											</FormControl>
											<FormControl
												errors={getErrors('calories')}
												label={T.pages.foods.table.calories}
												required
											>
												<Input
													{...field('calories')}
													error={hasError('calories')}
													type="number"
												/>
											</FormControl>
										</FormWrapper>
										<FormWrapper>
											<FormControl
												errors={getErrors('carbs')}
												label={T.pages.foods.table.carbs}
												required
											>
												<Input
													error={hasError('carbs')}
													{...field('carbs')} 
													type="number"
												/>
											</FormControl>
											<FormControl
												errors={getErrors('fat')}
												label={T.pages.foods.table.fat}
												required
											>
												<Input
													error={hasError('fat')}
													{...field('fat')}
													type="number"
												/>
											</FormControl>
											<FormControl
												errors={getErrors('protein')}
												label={T.pages.foods.table.protein}
												required
											>
												<Input
													error={hasError('protein')}
													{...field('protein')}
													type="number"
												/>
											</FormControl>
										</FormWrapper>
									</div>
								</>
							)}
							formSubmission={submit}
							paginationData={pagination}
							primaryKey="id"
							tableTitle={T.pages.foods.table.tableTitle}
							undeletableRows={[]}
						/>
					) : null 
				}
			</div>
		</DashboardLayout>
	);
}
