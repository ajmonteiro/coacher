import React from 'react';

import InfoCard from 'src/components/infoCard/InfoCard';
import { type WorkoutDto } from 'src/shared/models/WorkoutDto';
import { useTranslation } from 'src/shared/translations/Translations';

type WorkoutProps = {
	workouts: WorkoutDto[]
};

export default function WorkoutsTable({ workouts }: WorkoutProps) {
	const { T } = useTranslation();

	return (
		workouts && workouts.length > 0 ? (
			<InfoCard className="w-full flex flex-col gap-6 p-6 rounded-3xl bg-white shadow-xl border border-gray-200">
				<h2 className="text-2xl font-bold text-primary mb-6 uppercase tracking-wide">
					{ T.components.workoutsTable.workouts }
				</h2>
				<div className="flex flex-col gap-6">
					{
						workouts.map((workout, workoutIndex) => (
							<div
								key={workoutIndex}
								className="p-6 bg-gray-50 rounded-2xl shadow-lg border border-gray-300 hover:bg-primary/10 transition-all cursor-pointer"
							>
								<h3 className="text-lg font-semibold text-primary mb-2 flex items-center justify-between">
									<span>{ workout.name }</span>
								</h3>
								<div className="flex flex-col gap-4">
									{
										workout.exercises.map((exercise, exerciseIndex) => (
											<div
												key={exerciseIndex}
												className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm"
											>
												<h4 className="text-md font-medium text-gray-800 mb-2">{ exercise.name }</h4>
												<div className="flex flex-wrap gap-3">
													{
														exercise.sets.map((set, setIndex) => (
															<div
																key={setIndex}
																className="p-3 bg-primary/10 rounded-lg text-primary text-sm font-medium border border-primary/20"
															>
																<p className="font-semibold">
																	Set
																	{ setIndex + 1 }
																</p>
																<p>
																	Reps:
																	{ set.reps }
																</p>
															</div>
														)) 
													}
												</div>
											</div>
										)) 
									}
								</div>
							</div>
						)) 
					}
				</div>
			</InfoCard>
		) : (
			<div className="text-center py-8">
				<p className="text-gray-500 text-lg">
					{ T.pages.userProfile.noWorkouts }
				</p>
			</div>
		)
	);
}
