import React from 'react';

import InfoCard from 'src/components/infoCard/InfoCard';
import { type WorkoutPlanDto } from 'src/shared/models/interfaces/WorkoutPlanDto';
import { useTranslation } from 'src/shared/translations/Translations';

type WorkoutPlansProps = {
	workoutPlans: WorkoutPlanDto[]
};

export default function WorkoutPlansTable({ workoutPlans }: WorkoutPlansProps) {
	const { T } = useTranslation();

	return workoutPlans && workoutPlans.length > 0 ? (
		<div className="container mx-auto px-4 py-8">
			<h2 className="text-xl font-semibold text-center mb-8 capitalize">
				{ T.components.workoutPlansTable.workouts }
			</h2>

			<div className="space-y-6">
				{
					workoutPlans.map((workoutPlan, planIndex) => (
						<div
							key={planIndex}
						>
							{
								workoutPlan.workouts.map((workout, workoutIndex) => (
									<InfoCard 
										key={workoutIndex} 
									>
										<div className="p-6">
											<h3 className="text-lg font-medium mb-4">
												{ workout.name }
											</h3>
                  
											<table className="table table-bordered">
												<thead className="bg-base-300 text-base-content">
													<th className="p-3 text-left text-sm font-semibold">Exercise</th>
													<th className="p-3 text-left text-sm font-semibold">Sets & Reps</th>
												</thead>
												<tbody>
													{
														workout.exercises.map((exercise, exerciseIndex) => (
															<tr key={exerciseIndex}>
																<td className="p-3 border-t">{ exercise.name }</td>
																<td className="p-3 border-t">
																	{ exercise.sets }
																	{ ' ' }
																	x
																	{ ' ' }
																	{ exercise.reps }
																</td>
															</tr>
														)) 
													}
												</tbody>
											</table>
										</div>
									</InfoCard>
								)) 
							}
						</div>
					)) 
				}
			</div>
		</div>
	) : (
		<div className="text-center py-8 text-muted-foreground">
			{ T.pages.userProfile.noWorkouts }
		</div>
	);
}
