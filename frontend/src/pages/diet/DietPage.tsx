import { useEffect, useState } from 'react';

import { MinusCircle, PlusCircle } from '@phosphor-icons/react';
import { OrderByEnum } from '@resourge/react-fetch';
import { useNavigate, useSearchParams } from '@resourge/react-router';

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
import Routes from 'src/shared/routes/Routes';
import { useTranslation } from 'src/shared/translations/Translations';
import { FOOD_UNIT_OPTIONS } from 'src/shared/utils/FormConstantsUtils';

import DietPageApi from './DietPageApi';
import { useDietRelations } from './hooks/useDietRelations';
import { useDietModel } from './interfaces/DietModel';

export default function DietPage() {
	const { T } = useTranslation();
	const navigate = useNavigate();
	const { userId, dietId } = useSearchParams();
	
	const [triggerModal, setTriggerModal] = useState<boolean>(false);
	const {
		field, handleSubmit, form, getErrors, hasError, context
	} = useDietModel();

	const {
		users, foods, diet 
	} = useDietRelations({
		dietId
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
		if (dietId && diet) {
			form.userId = users.find((user: any) => user.value === diet.userId);
			form.name = diet.name;
			form.description = diet.description;
			form.meals = diet.meals
				? diet.meals.map((meal: any) => ({
					name: meal.name,
					description: meal.description,
					mealFoods: meal.mealFoods
						? meal.mealFoods.map((mealFood: any) => ({
							food: foods.find((food: any) => food.value === mealFood.foodId),
							quantity: mealFood.quantity,
							unit: FOOD_UNIT_OPTIONS.find((option) => option.value === mealFood.unit)
						}))
						: []
				}))
				: [];
			setTriggerModal(true);
		}
	}, [diet, dietId]);

	useEffect(() => {
		if (userId) {
			form.userId = users.find((user: any) => user.value === userId);
			setTriggerModal(true);
		}
	}, [userId, users]);

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
								<FormWrapper cols={1}>
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
										<details
											key={index}

											className={`collapse rounded-box border w-full border-base-200 shadow-lg
												${context.errors[`meals[${index}]`] ? 'border-error' : ''}
												`}
										> 
											<summary className="collapse-title font-medium"> 
												<div className="flex items-center text-sm"> 
													<span>{ T.pages.diet.table.meal + ' ' + (index + 1) }</span>
												</div>
											</summary>
											<div className="p-5">
												<FormWrapper>
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
												</FormWrapper>
												<InfoCard className="flex flex-col mt-4 gap-3 border border-gold">
													<div
														className="flex flex-wrap items-center justify-between 
													gap-2 border-b pb-3 border-gold"
													>
														<span className="text-sm font-semibold">
															{ T.pages.diet.table.mealFoods }
														</span>
														<Button
															onClick={() => form.meals[index].addMealFood()}
														>
															<PhosphorIcon
																color="white"
																icon={(
																	<PhosphorIcon
																		icon={<PlusCircle />}
																	/>
																)}
															/>
															{ T.pages.diet.table.addFood }
														</Button>
													</div>
													{
														form.meals[index].mealFoods.map((mealFood, foodIndex) => (
															<details
																key={index}
																className={`collapse rounded-box border w-full shadow-lg
																	${context.errors[`meals[${index}].mealFoods[${foodIndex}]`] ? 'border-error' : ''}
																	`}
															> 
																<summary className="collapse-title font-medium"> 
																	<div className="flex items-center text-sm"> 
																		<span>{ T.pages.diet.table.food + ' ' + (foodIndex + 1) }</span>
																	</div>
																</summary>
																<div className="p-5 pt-0">
																	<FormWrapper cols={1}>
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
																	</FormWrapper>
																	<FormWrapper>
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
																	</FormWrapper>
																	<div>
																		<Button
																			className="mt-4"
																			onClick={() => form.meals[index].removeMealFood(foodIndex)}
																		>
																			<PhosphorIcon
																				color="white"
																				icon={(
																					<PhosphorIcon
																						icon={<MinusCircle />}
																					/>
																				)}
																			/>
																			{ T.pages.diet.table.removeFood }
																		</Button>
																	</div>
																</div>
															</details>
														)) 
													}
												</InfoCard>
												<div className="flex justify-end mt-2">
													<Button
														className="mt-2"
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
														{ T.pages.diet.table.removeMeal }
													</Button>
												</div>
											</div>
										</details>
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
						goToEntity={(id) => navigate(Routes.DASHBOARD.DIET.get({
							searchParams: {
								dietId: id
							}
						}))}
						paginationData={pagination}
						primaryKey="id"
						tableTitle={T.pages.diet.table.tableTitle}
						triggerModal={!!userId || !!dietId || triggerModal}
					/>
				) : null 
			}
		</DashboardLayout>
	);
}
