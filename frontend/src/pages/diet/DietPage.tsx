import { useEffect } from 'react';

import { MinusCircle, PlusCircle } from '@phosphor-icons/react';
import { OrderByEnum } from '@resourge/react-fetch';
import { useSearchParams } from '@resourge/react-router';

import Button from 'src/components/button/Button';
import DataTable from 'src/components/dataTable/DataTable';
import FormControl from 'src/components/formControl/FormControl';
import FormWrapper from 'src/components/formWrapper/FormWrapper';
import InfoCard from 'src/components/infoCard/InfoCard';
import Input from 'src/components/input/Input';
import PhosphorIcon from 'src/components/phosphorIcon/PhosphorIcon';
import SearchableInput from 'src/components/searchableInput/SearchableInput';
import DashboardLayout from 'src/layouts/dashboardLayout/DashboardLayout';
import { useDataTable } from 'src/shared/hooks/useDataTable';
import { useTranslation } from 'src/shared/translations/Translations';
import { FOOD_UNIT_OPTIONS } from 'src/shared/utils/FormConstantsUtils';

import DietPageApi from './DietPageApi';
import { useDietRelations } from './hooks/useDietRelations';
import { useDietModel } from './interfaces/DietModel';

export default function DietPage() {
	const { T } = useTranslation();
	const { userId } = useSearchParams();

	const {
		field, handleSubmit, form, getErrors, hasError, reset
	} = useDietModel();

	const { users, foods } = useDietRelations({
		userId 
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
								{
									form.meals.map((meal, index) => (
										<InfoCard
											key={index}
											className="w-full"
										>
											<div className="text-sm mb-3">
												{ T.pages.diet.table.meal } 
												{ ' ' }
												{ index + 1 }
											</div>
											<hr />
											<FormControl
												errors={getErrors(`meals[${index}].name`)}
												label={T.pages.diet.table.mealName}
											>
												<Input
													{...field(`meals[${index}].name`)}
													error={hasError(`meals[${index}].name`)}
												/>
											</FormControl>
											<FormControl
												errors={getErrors(`meals[${index}].description`)}
												label={T.pages.diet.table.mealDescription}
											>
												<Input
													{...field(`meals[${index}].description`)}
													error={hasError(`meals[${index}].description`)}
												/>
											</FormControl>
											{
												form.meals[index].mealFoods.map((mealFood, foodIndex) => (
													<InfoCard key={foodIndex}>
														<FormControl
															errors={getErrors(`meals[${index}].mealFoods[${foodIndex}].food`)}
															label={T.pages.diet.table.food}
														>
															<SearchableInput
																{...field(`meals[${index}].mealFoods[${foodIndex}].food`)}
																error={hasError(`meals[${index}].mealFoods[${foodIndex}].food`)}
																options={foods}
															/>
														</FormControl>
														<FormControl
															errors={getErrors(`meals[${index}].mealFoods[${foodIndex}].quantity`)}
															label={T.pages.diet.table.quantity}
														>
															<Input
																{...field(`meals[${index}].mealFoods[${foodIndex}].quantity`)}
																error={hasError(`meals[${index}].mealFoods[${foodIndex}].quantity`)}
																type="number"
															/>
														</FormControl>
														<FormControl
															errors={getErrors(`meals[${index}].mealFoods[${foodIndex}].unit`)}
															label={T.pages.diet.table.unit}
														>
															<SearchableInput
																{...field(`meals[${index}].mealFoods[${foodIndex}].unit`)}
																error={hasError(`meals[${index}].mealFoods[${foodIndex}].unit`)}
																options={FOOD_UNIT_OPTIONS}
															/>
														</FormControl>
													</InfoCard>
												)) 
											}
											<div className="flex justify-end mt-2">
												<Button
													className="mt-2 btn-square"
													onClick={() => form.removeMeal(index)}
												>
													<PhosphorIcon
														color="white"
														icon={(
															<PhosphorIcon
																icon={<MinusCircle />}
															/>
														)}
													/>
												</Button>
											</div>
										</InfoCard>
									)) 
								}
								<Button
									className="mt-2 w-fit"
									onClick={() => form.addMeal()}
								>
									<PhosphorIcon
										color="white"
										icon={(
											<PhosphorIcon
												icon={<PlusCircle />}
											/>
										)}
									/>
									{ T.pages.diet.table.addMeal }
								</Button>
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
