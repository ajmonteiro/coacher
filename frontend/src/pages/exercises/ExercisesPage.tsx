/* eslint-disable react/jsx-key */

import Button from 'src/components/button/Button';
import DataTable from 'src/components/dataTable/DataTable';
import FormControl from 'src/components/formControl/FormControl';
import FormWrapper from 'src/components/formWrapper/FormWrapper';
import Input from 'src/components/input/Input';
import DashboardLayout from 'src/layouts/dashboardLayout/DashboardLayout';
import { useDataTable } from 'src/shared/hooks/useDataTable';
import { useTranslation } from 'src/shared/translations/Translations';

import ExercisesPageApi from './ExercisesPageApi';
import { useExerciseModel } from './interface/ExerciseModel';

export default function ExercisesPage() {
	const { T } = useTranslation();

	const {
		field, handleSubmit, hasError, getErrors, form
	} = useExerciseModel();

	const {
		rows, changePage, paginationData: pagination, deleteEntities, fetchResults
	} = useDataTable({
		entityClass: ExercisesPageApi,
		orderColumn: 'name'
	});

	const submit = handleSubmit(async (data) => {
		await Promise.all(data.exercises.map(async (exercise) => {
			await ExercisesPageApi.create(exercise);
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
									columnLabel: T.pages.exercises.table.name
								},
								{
									columnName: 'description',
									columnLabel: T.pages.exercises.table.description
								},
								{
									columnName: 'video',
									columnLabel: T.pages.exercises.table.video,
									columnType: 'link'
								}
							]}
							data={rows.data}
							deleteEntities={deleteEntities}
							form={(
								<div className="flex flex-col gap-3">
									{
										form.exercises.map((exercise, index: number) => (
											<div
												className="flex flex-col gap-2 
												relative
												ring-1 ring-base-200 rounded-box p-4"
											>
												<div className="flex flex-col gap-2">
													<span className="text-sm font-semibold">
														{ T.pages.exercises.table.exercise }
														{ ' ' }
														{ index + 1 }
													</span>
													<hr className="h-2" />
												</div>
												<FormWrapper>
													<FormControl
														errors={getErrors(`exercises[${index}].name`)}
														label={T.pages.exercises.table.name}
														required
													>
														<Input
															{...field(`exercises[${index}].name`)}
															error={hasError(`exercises[${index}].name`)}
														/>
													</FormControl>
													<FormControl
														errors={getErrors(`exercises[${index}].description`)}
														label={T.pages.exercises.table.description}
														required
													>
														<Input
															{...field(`exercises[${index}].description`)}
															error={hasError(`exercises[${index}].description`)}
														/>
													</FormControl>
												</FormWrapper>
												<FormWrapper>
													<FormControl
														errors={getErrors(`exercises[${index}].video`)}
														label={T.pages.exercises.table.video}
														required
													>
														<Input
															error={hasError(`exercises[${index}].video`)}
															{...field(`exercises[${index}].video`)}
														/>
													</FormControl>
												</FormWrapper>
												<div className="absolute bottom-5 right-5">
													<Button
														className="btn-square"
														onClick={() => form.removeExercise(index)}
													>
														-
													</Button>
												</div>	
											</div>
										)) 
									}
									<div className="flex justify-end items-center">
										<Button
											onClick={() => form.addNewExercise()}
										>
											+ 
											{ ' ' }
											{ T.pages.exercises.table.addExercise }
										</Button>
									</div>
								</div>
							)}
							formSubmission={submit}
							paginationData={pagination}
							primaryKey="id"
							tableTitle={T.pages.exercises.table.tableTitle}
							undeletableRows={[]}
						/>
					) : null 
				}
			</div>
		</DashboardLayout>
	);
}
