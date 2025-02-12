/* eslint-disable react/jsx-key */

import Button from 'src/components/button/Button';
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
		field, handleSubmit, hasError, getErrors, form
	} = useFoodModel();

	const {
		rows, changePage, paginationData: pagination, deleteEntities, fetchResults
	} = useDataTable({
		entityClass: FoodPageApi,
		orderColumn: 'name'
	});

	const submit = handleSubmit(async (data) => {
		await Promise.all(data.foods.map(async (food) => {
			await FoodPageApi.create(food);
		}));
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
								<div className="flex flex-col gap-3">
									{
										form.foods.map((food, index: number) => (
											<div
												key={index}
												className="flex flex-col gap-2 
												relative
												ring-1 ring-base-200 rounded-box p-4"
											>
												<div className="flex flex-col gap-2">
													<span className="text-sm font-semibold">
														{ T.pages.foods.table.food }
														{ ' ' }
														{ index + 1 }
													</span>
													<hr className="h-2" />
												</div>
												<FormWrapper>
													<FormControl
														errors={getErrors(`foods[${index}].name`)}
														label={T.pages.foods.table.name}
														required
													>
														<Input
															{...field(`foods[${index}].name`)}
															error={hasError(`foods[${index}].name`)}
														/>
													</FormControl>
													<FormControl
														errors={getErrors(`foods[${index}].calories`)}
														label={T.pages.foods.table.calories}
														required
													>
														<Input
															{...field(`foods[${index}].calories`)}
															error={hasError(`foods[${index}].calories`)}
															type="number"
														/>
													</FormControl>
												</FormWrapper>
												<FormWrapper>
													<FormControl
														errors={getErrors(`foods[${index}].carbs`)}
														label={T.pages.foods.table.carbs}
														required
													>
														<Input
															error={hasError(`foods[${index}].carbs`)}
															{...field(`foods[${index}].carbs`)} 
															type="number"
														/>
													</FormControl>
													<FormControl
														errors={getErrors(`foods[${index}].fat`)}
														label={T.pages.foods.table.fat}
														required
													>
														<Input
															error={hasError(`foods[${index}].fat`)}
															{...field(`foods[${index}].fat`)}
															type="number"
														/>
													</FormControl>
													<FormControl
														errors={getErrors(`foods[${index}].protein`)}
														label={T.pages.foods.table.protein}
														required
													>
														<Input
															error={hasError(`foods[${index}].protein`)}
															{...field(`foods[${index}].protein`)}
															type="number"
														/>
													</FormControl>
												</FormWrapper>
												<div className="absolute bottom-5 right-5">
													<Button
														className="btn-square"
														onClick={() => form.removeFood(index)}
													>
														-
													</Button>
												</div>	
											</div>
										)) 
									}
									<div className="flex justify-end items-center">
										<Button
											onClick={() => form.addNewFood()}
										>
											+ 
											{ ' ' }
											{ T.pages.foods.table.addFood }
										</Button>
									</div>
								</div>
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
