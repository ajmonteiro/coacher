import { useFetch } from '@resourge/react-fetch';
import { useSearchParams } from '@resourge/react-router';

import Button from 'src/components/button/Button';
import InfoCard from 'src/components/infoCard/InfoCard';
import Input from 'src/components/input/Input';
import DashboardLayout from 'src/layouts/dashboardLayout/DashboardLayout';
import { useAuthentication } from 'src/shared/auth/useAuthentication';
import { WorkoutDto } from 'src/shared/models/WorkoutDto';
import { useTranslation } from 'src/shared/translations/Translations';

import WorkoutDetailPageApi from './WorkoutDetailPageApi';

export default function WorkoutDetailPage() {
	const { T } = useTranslation();
	const { workoutId } = useSearchParams();
	const { user } = useAuthentication();

	const { data: workout } = useFetch(async () => {
		const result = await WorkoutDetailPageApi.get(workoutId);
		return new WorkoutDto(result.data);
	}, {
		deps: [workoutId],
		initialState: undefined
	});
	console.log(workout);
	return (
		<DashboardLayout>
			<InfoCard>
				<div className="flex flex-wrap gap-2 text-xl text-base-content">
					<span className="font-thin">
						{ T.pages.workout.pageTitle }
						:
					</span>
					<span>
						{ workout?.name }
					</span>
				</div>
			</InfoCard>
			<div className="grid lg:grid-cols-3 grid-cols-1 gap-2 mt-5">
				{
					workout ? workout.exercisesWorkout.map((exercise, exerciseIndex) => (
						<InfoCard
							key={exerciseIndex}
							className="mb-6 border border-gold"
						>
							<div className="flex flex-col p-5 rounded-box">
								<h2 className="text-base-content font-semibold text-sm mb-3">{ exercise.name }</h2>
								<div className="flex gap-1">
									<div className="badge badge-outline flex flex-col gap-2 text-xs">
										<div className="flex gap-1 font-extralight text-base-content">
											<span>
												{ T.pages.workout.sets }
											</span>
											<span>
												{ exercise.sets }
											</span>
										</div>
									</div>
									<div className="badge badge-outline flex flex-col gap-2 text-xs">
										<div className="flex gap-1 font-extralight text-base-content">
											<span>
												{ T.pages.workout.reps }
											</span>
											<span>
												{ exercise.reps }
											</span>
										</div>
									</div>
								</div>
							</div>
							<table className="table table-bordered w-full mt-5">
								<thead>
									<tr>
										<th className="text-center">{ T.pages.workout.set }</th>
										<th className="text-center">{ T.pages.workout.weight }</th>
										<th className="text-center">{ T.pages.workout.reps }</th>
									</tr>
								</thead>
								<tbody>
									{
										exercise[exerciseIndex] && exercise[exerciseIndex].exercise ? exercise[exerciseIndex].exercise.sets.map(
											(_: any, index: number) => (
												<tr key={index}>
													<td className="text-center">{ index + 1 }</td>
													<td>
														<Input
															className="w-16 px-2 py-1 border rounded-md text-base-content"
															disabled={user.role.name !== 'User'}
														/>
													</td>
													<td>
														<Input
															className="w-16 px-2 py-1 border rounded-md text-base-content"
															disabled={user.role.name !== 'User'}
														/>
													</td>
												</tr>
											)) : null 
									}
								</tbody>
							</table>
							<div>
								<Button
									className="mt-5 w-full"
									disabled={user.role.name !== 'User'}
								>
									{ T.pages.workout.registerSet }
								</Button>
							</div>
						</InfoCard>
					)) : null 
                
				}
			</div>
		</DashboardLayout>
	);
}
