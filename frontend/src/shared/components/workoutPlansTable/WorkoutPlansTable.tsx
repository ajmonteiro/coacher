import React from 'react';

import { Barbell } from '@phosphor-icons/react';

import InfoCard from 'src/components/infoCard/InfoCard';
import PhosphorIcon from 'src/components/phosphorIcon/PhosphorIcon';
import Table from 'src/components/table/Table';
import { type WorkoutPlanDto } from 'src/shared/models/interfaces/WorkoutPlanDto';
import { useTranslation } from 'src/shared/translations/Translations';

type WorkoutPlansProps = {
	workoutPlans: WorkoutPlanDto[]
};

export default function WorkoutPlansTable({ workoutPlans }: WorkoutPlansProps) {
	const { T } = useTranslation();

	return workoutPlans && workoutPlans.length > 0 ? (
		<InfoCard className="flex flex-col gap-10">
			<h2 className="xl:text-3xl text-2xl font-thin text-center capitalize ">
				{ T.components.workoutPlansTable.workouts }
			</h2>
			<div className="flex flex-col gap-2">
				{
					workoutPlans.map((workoutPlan, planIndex) => (
						<div key={planIndex}>
							<div className="collapse collapse-plus rounded-box shadow-lg border overflow-x-auto">
								<input 
									id={`plan-${planIndex}`} 
									name="accordion-workoutplans"
									type="radio"
								/>
              
								<div className="collapse-title text-xl font-medium">
									<h3 className="text-xl font-semibold">{ workoutPlan.name }</h3>								
								</div>

								<div className="collapse-content">
									<InfoCard>
										{
											workoutPlan.workouts.map((workout, workoutIndex) => (
												<div key={workoutIndex}>
													<h4 className="text-lg font-medium mb-4">{ workout.name }</h4>
													<Table
														headerColumns={[
															T.components.workoutPlansTable.exercise,
															T.components.workoutPlansTable.setsReps
														]}
														tableClassName="table-zebra"
													>
														{
															workout.exercises.map((exercise, exerciseIndex) => (
																<tr key={exerciseIndex}>
																	<td className="p-3 border-b">{ exercise.name }</td>
																	<td className="p-3 border-b">
																		{ exercise.sets }
																		x
																		{ exercise.reps }
																	</td>
																</tr>
															)) 
														}
													</Table>
												</div>
											)) 
										}
									</InfoCard>
								</div>
							</div>
						</div>
					)) 
				}
			</div>
			
		</InfoCard>
	) : (
		<InfoCard className="flex flex-col gap-10 items-center justify-center h-full w-full relative">
			<div className="text-2xl font-thin z-10">
				Oops!
				{ ' ' }
				{ T.pages.userProfile.noWorkouts }
			</div>
			<PhosphorIcon
				className="absolute -z-1 opacity-25"
				icon={<Barbell />}
				size={600}
			/>
		</InfoCard>
	);
}
