/* eslint-disable @typescript-eslint/dot-notation */
import { useEffect } from 'react';

import { OrderByEnum, useFetch } from '@resourge/react-fetch';
import { useSearchParams } from '@resourge/react-router';

import Button from 'src/components/button/Button';
import DataTable from 'src/components/dataTable/DataTable';
import FormControl from 'src/components/formControl/FormControl';
import FormWrapper from 'src/components/formWrapper/FormWrapper';
import Input from 'src/components/input/Input';
import SearchableInput from 'src/components/searchableInput/SearchableInput';
import DashboardLayout from 'src/layouts/dashboardLayout/DashboardLayout';
import { useDataTable } from 'src/shared/hooks/useDataTable';
import { SelectItem } from 'src/shared/models/SelectItem';
import HttpBaseService from 'src/shared/services/HttpBaseService';
import { useTranslation } from 'src/shared/translations/Translations';

import WorkoutsPageApi from './WorkoutsPageApi';
import { useWorkoutModel } from './interfaces/WorkoutModel';

export default function WorkoutsPage() {
	const { T } = useTranslation();
	const { userId } = useSearchParams();
	
	const {
		field, hasError, getErrors, handleSubmit, reset, form, context
	} = useWorkoutModel();

	const { data: exercises } = useFetch(async () => {
		const result = await HttpBaseService.get('/Exercise/options');

		return result.data.map((exercise: SelectItem) => new SelectItem(exercise));
	}, {
		deps: [],
		initialState: []
	});

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
		entityClass: WorkoutsPageApi,
		orderColumn: 'name',
		orderBy: OrderByEnum.ASC
	});

	const submit = handleSubmit(async (data) => {
		await WorkoutsPageApi.create(data);
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
			<div className="w-full h-full rounded-box">
				{
					rows.data ? (
						<DataTable
							changePage={changePage}
							columns={[
								{
									columnName: 'name',
									columnLabel: T.pages.workouts.table.name
								},
								{
									columnName: 'description',
									columnLabel: T.pages.workouts.table.description
								},
								{
									columnName: 'user.fullName',
									columnLabel: T.pages.workouts.table.user
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
											label={T.pages.workouts.table.name}
											required
										>
											<Input
												{...field('name')}
												error={hasError('name')}
											/>
										</FormControl>
										<FormControl 
											errors={getErrors('description')}
											label={T.pages.workouts.table.description}
											required
										>
											<Input
												{...field('description')}
												error={hasError('description')}
											/>
										</FormControl>
									</FormWrapper>
									<div className="flex flex-col gap-2">
										{
											form.exercises.map((exercise, index) => (
												<details
													key={index}
													className={`collapse rounded-box border w-full border-base-200
														${context.errors[`exercises[${index}]`] ? 'border-error' : ''}
														`}
												> 
													<summary className="collapse-title font-medium"> 
														<div className="flex items-center text-sm"> 
															<span>{ T.pages.workouts.table.exercise + ' ' + (index + 1) }</span>
														</div>
													</summary>
													<div className="collapse-content p-0">
														<div className="p-3"> 
															<FormControl
																errors={getErrors(`exercises[${index}].exercise`)}
																label={T.pages.workouts.table.exercise}
																required
															>
																<SearchableInput
																	{...field(`exercises[${index}].exercise`)}
																	error={hasError(`exercises[${index}].exercise`)}
																	options={exercises}
																/>
															</FormControl>
															<div className="grid grid-cols-2 gap-4">
																<FormControl
																	errors={getErrors(`exercises[${index}].reps`)}
																	label={T.pages.workouts.table.reps}
																	required
																>
																	<Input
																		{...field(`exercises[${index}].reps`)}
																		error={hasError(`exercises[${index}].reps`)}
																		type="number"
																	/>
																</FormControl>
																<FormControl
																	errors={getErrors(`exercises[${index}].sets`)}
																	label={T.pages.workouts.table.sets}
																	required
																>
																	<Input
																		{...field(`exercises[${index}].sets`)}
																		error={hasError(`exercises[${index}].sets`)}
																		type="number"
																	/>
																</FormControl>
															</div>
															<div className="flex justify-end mt-6">
																<Button
																	className="btn-sm"
																	onClick={() => form.removeExercise(index)}
																>
																	{ T.pages.workouts.table.removeExercise }
																</Button>
															</div>
														</div>
													</div>
												</details>
											))
										}
									</div>
									<div className="flex justify-start mt-5">
										<Button 
											onClick={() => form.addNewExercise()}
										>
											+ 
											{ ' ' }
											{ T.pages.workouts.table.addExercise }	
										</Button>
									</div>
								</>
							)}
							formSubmission={submit}
							paginationData={pagination}
							primaryKey="id"
							tableTitle={T.pages.workouts.table.tableTitle}
							triggerModal={!!userId}
							undeletableRows={[]}
						/>
					) : null 
				}
			</div>
		</DashboardLayout>
	);
}
