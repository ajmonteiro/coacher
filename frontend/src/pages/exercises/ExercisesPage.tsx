import { MinusCircle, PlusCircle } from '@phosphor-icons/react';

import Button from 'src/components/button/Button';
import DataTable from 'src/components/dataTable/DataTable';
import FormControl from 'src/components/formControl/FormControl';
import FormWrapper from 'src/components/formWrapper/FormWrapper';
import InfoCard from 'src/components/infoCard/InfoCard';
import Input from 'src/components/input/Input';
import PhosphorIcon from 'src/components/phosphorIcon/PhosphorIcon';
import Textarea from 'src/components/textarea/Textarea';
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
										form.exercises.map((_, index: number) => (
											<details
												key={index}
												className="collapse rounded-box border w-full"
											> 
												<summary className="collapse-title font-medium"> 
													<div className="flex items-center text-sm"> 
														<span>{ T.pages.exercises.table.exercise + ' ' + (index + 1) }</span>
													</div>
												</summary>
												<div className="p-5 pt-0">
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
													<FormWrapper cols={1}>
														<FormControl
															errors={getErrors(`exercises[${index}].description`)}
															label={T.pages.exercises.table.description}
															required
														>
															<Textarea
																{...field(`exercises[${index}].description`)}
																error={hasError(`exercises[${index}].description`)}
															/>
														</FormControl>
													</FormWrapper>
													<div className="flex justify-end mt-5">
														<Button
															className="btn-square"
															onClick={() => form.removeExercise(index)}
														>
															<PhosphorIcon
																color="white"
																icon={<MinusCircle />}
															/>
														</Button>
													</div>	
												</div>
											</details>
										)) 
									}
									<InfoCard className="flex justify-end">
										<Button
											onClick={() => form.addNewExercise()}
										>
											<PhosphorIcon
												color="white"
												icon={<PlusCircle />}
											/>
											{ T.pages.exercises.table.addExercise }
										</Button>
									</InfoCard>
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
