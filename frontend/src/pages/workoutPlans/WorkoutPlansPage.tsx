import { useEffect } from 'react';

import { Barbell } from '@phosphor-icons/react';
import { OrderByEnum, useFetch } from '@resourge/react-fetch';
import { FormProvider } from '@resourge/react-form';
import { useSearchParams } from '@resourge/react-router';

import Button from 'src/components/button/Button';
import DataTable from 'src/components/dataTable/DataTable';
import Datepicker from 'src/components/datepicker/Datepicker';
import FormControl from 'src/components/formControl/FormControl';
import FormWrapper from 'src/components/formWrapper/FormWrapper';
import Input from 'src/components/input/Input';
import SearchableInput from 'src/components/searchableInput/SearchableInput';
import DashboardLayout from 'src/layouts/dashboardLayout/DashboardLayout';
import { useDataTable } from 'src/shared/hooks/useDataTable';
import { SelectItem } from 'src/shared/models/SelectItem';
import HttpBaseService from 'src/shared/services/HttpBaseService';
import { useTranslation } from 'src/shared/translations/Translations';

import WorkoutPlanPageApi from './WorkoutPlanPageApi';
import WorkoutForm from './components/workoutForm/WorkoutForm';
import { useWorkoutPlanModel } from './interfaces/WorkoutPlanModel';

export default function WorkoutsPage() {
	const { T } = useTranslation();
	const { userId } = useSearchParams();
	
	const {
		field, hasError, getErrors, handleSubmit, reset, form, context
	} = useWorkoutPlanModel();

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
		entityClass: WorkoutPlanPageApi,
		orderColumn: 'name',
		orderBy: OrderByEnum.ASC
	});

	const submit = handleSubmit(async (data) => {
		await WorkoutPlanPageApi.create(data);
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
									columnLabel: T.pages.workoutPlans.table.name
								},
								{
									columnName: 'workouts.name',
									columnLabel: T.pages.workoutPlans.table.workouts
								}
							]}
							data={rows.data}
							deleteEntities={deleteEntities}
							form={(
								<FormProvider context={context}>
									{
										!userId ? (
											<FormWrapper cols={1}>
												<FormControl 
													errors={getErrors('userId')}
													label={T.pages.workoutPlans.table.user}
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
											label={T.pages.workoutPlans.table.name}
											required
										>
											<Input
												{...field('name')}
												error={hasError('name')}
											/>
										</FormControl>
										<FormControl
											errors={getErrors('dates')}
											label={T.pages.workoutPlans.table.dates}
											required
										>
											<Datepicker {...field('dates')} />
										</FormControl>
									</FormWrapper>
									{
										form.workouts.map((workout, index) => (
											<WorkoutForm
												key={index}
												exercises={exercises}
												workoutIndex={index}
											/>
										)) 
									}
									<Button onClick={() => form.addNewWorkout()}>
										{ T.pages.workoutPlans.table.addWorkout }
									</Button>
								</FormProvider>
							)}
							formSubmission={submit}
							modalTitle={T.pages.workoutPlans.table.addWorkout}
							paginationData={pagination}
							primaryKey="id"
							tableIcon={{
								icon: <Barbell />
							}}
							tableTitle={T.pages.workoutPlans.table.tableTitle}
							triggerModal={!!userId}
							undeletableRows={[]}
						/>
					) : null 
				}
			</div>
		</DashboardLayout>
	);
}
