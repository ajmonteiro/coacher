import { useFetch } from '@resourge/react-fetch';
import { useSearchParams } from '@resourge/react-router';

import A from 'src/components/A/A';
import InfoCard from 'src/components/infoCard/InfoCard';
import DashboardLayout from 'src/layouts/dashboardLayout/DashboardLayout';
import Routes from 'src/shared/routes/Routes';
import { useTranslation } from 'src/shared/translations/Translations';

import WorkoutPlanDetailPageApi from './WorkoutPlanDetailPageApi';
import { WorkoutPlanDetailDto } from './interfaces/WorkoutPlanDetailDto';

export default function WorkoutPlanDetailPage() {
	const { workoutPlanId } = useSearchParams();
	const { T } = useTranslation(); 

	const { data: workoutPlan } = useFetch(async () => {
		const result = await WorkoutPlanDetailPageApi.get(workoutPlanId);
		return new WorkoutPlanDetailDto(result.data);
	}, {
		deps: [workoutPlanId],
		initialState: undefined
	});

	return (
		<DashboardLayout>
			<InfoCard>
				{
					workoutPlan ? (
						<>
							<div className="flex flex-col gap-5">
								<div>
									<h1 className="text-2xl font-black text-primary mb-4">
										{ workoutPlan?.name }
									</h1>
									<div className="flex flex-col text-lg text-base-content mb-4 border border-gold w-fit p-5 rounded-box shadow-sm">
										<span>
											{ T.pages.workoutPlanDetail.startDate } 
											{ ' ' }
											{ workoutPlan?.formattedStartDate }
										</span>
										<span>
											{ T.pages.workoutPlanDetail.endDate } 
											{ ' ' }
											{ workoutPlan?.formattedEndDate }
										</span>
									</div>
									<hr />
								</div>
								<div className="badge badge-info text-white font-thin px-4 py-2 text-lg">
									{ workoutPlan?.workouts.length }
									{ ' ' }
									Treinos
								</div>
								<hr />
							</div>
							<div className="mt-6 flex flex-wrap gap-4">
								{ workoutPlan?.workouts.map((workout) => (
									<A
										key={workout.id}
										className="w-full h-fit p-0"
										href={Routes.DASHBOARD.WORKOUT_DETAIL.get({
											searchParams: {
												workoutId: workout.id
											}
										})}
										variant="simple"
									>
										<InfoCard
											className="shadow-md rounded-lg bg-base-100 
												text-base-content border border-gold grow
												cursor-pointer
												h-full w-full
												hover:translate-y-1 transition-transform duration-300 ease-in-out"
										>
										
											<div className="flex justify-between gap-5">
												<div>
													<h2 className="text-2xl font-semibold text-base-content">{ workout.name }</h2>
													<p className="text-base text-base-content text-opacity-75">{ workout.description }</p>
												</div>
												<div className="badge badge-info font-bold text-white px-3 py-1 text-sm">{ workout.weekDay }</div>
											</div>
										</InfoCard>
									</A>
								)) }
							</div>
						</>
					) : null 
				}
			</InfoCard>
		</DashboardLayout>
	);
}
