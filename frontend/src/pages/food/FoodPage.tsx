import { MinusCircle, PlusCircle } from '@phosphor-icons/react';

import Button from 'src/components/button/Button';
import DataTable from 'src/components/dataTable/DataTable';
import FormControl from 'src/components/formControl/FormControl';
import FormWrapper from 'src/components/formWrapper/FormWrapper';
import InfoCard from 'src/components/infoCard/InfoCard';
import Input from 'src/components/input/Input';
import PhosphorIcon from 'src/components/phosphorIcon/PhosphorIcon';
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
								<InfoCard>
									{
										form.foods.map((_, index: number) => (
											<FormWrapper
												key={index}
											>
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
												<div className="flex justify-end mt-4">
													<Button
														className="btn-square"
														onClick={() => form.removeFood(index)}
													>
														<PhosphorIcon 
															color="white"
															icon={<MinusCircle />}
														/>
													</Button>
												</div>	
											</FormWrapper>
												
										)) 
									}
									<div className="flex">
										<Button
											icon={(
												<PhosphorIcon 
													color="white"
													icon={<PlusCircle />}
												/>
											)}
											onClick={() => form.addNewFood()}
										>
											{ T.pages.foods.table.addFood }
										</Button>
									</div>
								</InfoCard>
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
