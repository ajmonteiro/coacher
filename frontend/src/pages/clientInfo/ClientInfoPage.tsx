/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo } from 'react';

import {
	User,
	Phone,
	Ruler,
	Activity
} from '@phosphor-icons/react';

import InfoCard from 'src/components/infoCard/InfoCard';
import PhosphorIcon from 'src/components/phosphorIcon/PhosphorIcon';
import DashboardLayout from 'src/layouts/dashboardLayout/DashboardLayout';
import { useAuthentication } from 'src/shared/auth/useAuthentication';
import { DietDto } from 'src/shared/models/DietDto';
import { WorkoutDto } from 'src/shared/models/WorkoutDto';
import { useTranslation } from 'src/shared/translations/Translations';

import ClientInfoCard from './components/clientInfoCard/ClientInfoCard';

export default function ClientInfoPage() {
	const { user } = useAuthentication();
	const { T } = useTranslation();

	const diets: DietDto[] = useMemo(() => {
		return user.diets.map((diet, index) => ({
			...new DietDto(diet),
			key: diet.id ?? index
		}));
	}, [user.diets]);

	const workouts: WorkoutDto[] = useMemo(() => {
		return user.workouts.map((workout, index) => ({
			...new WorkoutDto(workout),
			key: workout.id ?? index
		}));
	}, [user.workouts]);

	return (
		<DashboardLayout>
			<InfoCard className="h-full flex flex-col gap-5">
				<h1 className="text-2xl font-semibold text-base-content">{ T.pages.clientInfo.pageTitle }</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<ClientInfoCard
						icon={<PhosphorIcon icon={<User />} />}
						title={T.pages.clientInfo.fullName}
						value={user.fullName}
					/>
					<ClientInfoCard
						icon={<PhosphorIcon icon={<Phone />} />}
						title={T.pages.clientInfo.phone}
						value={user.phone}
					/>
					<ClientInfoCard
						icon={<PhosphorIcon icon={<Ruler />} />}
						title={T.pages.clientInfo.height}
						value={user.height}
					/>
					<ClientInfoCard
						icon={<PhosphorIcon icon={<Activity />} />}
						title={T.pages.clientInfo.weight}
						value={user.weight}
					/>
				</div>

				<InfoCard className="w-full">
					<h2 className="text-lg font-semibold text-base-content mb-2">{ T.pages.clientInfo.workouts }</h2>
					<div className="overflow-x-auto">
						<table className="table table-bordered w-full rounded-box border border-gold">
							<thead>
								<tr>
									<th>{ T.pages.clientInfo.exercise }</th>
									<th>{ T.pages.clientInfo.reps }</th>
									<th>{ T.pages.clientInfo.sets }</th>
								</tr>
							</thead>
							<tbody>
								{
									workouts.map((workout, workoutIndex) => (
										<>
											<tr
												key={workoutIndex}
												className="bg-gold text-white"
											>
												<td
													className="font-semibold text-lg"
													colSpan={3}
												>
													{ workout.name }
												</td>
											</tr>
											{ workout.exercises.map((exercise, index) => (
												<tr key={`exercise-${index + Math.random()}`}>
													<td>{ exercise.name }</td>
													<td>{ exercise.reps }</td>
													<td>{ exercise.set }</td>
												</tr>
											)) }
										</>
									))
								}
							</tbody>
						</table>
					</div>
				</InfoCard>

				<InfoCard className="w-full">
					<h2 className="text-lg font-semibold text-base-content mb-2">{ T.pages.clientInfo.diets }</h2>
					<div className="overflow-x-auto">
						<table className="table table-bordered w-full rounded-box border border-gold">
							<thead>
								<tr>
									<th>{ T.pages.clientInfo.meal }</th>
									<th>{ T.pages.clientInfo.food }</th>
									<th>{ T.pages.clientInfo.quantity }</th>
									<th>{ T.pages.clientInfo.calories }</th>
									<th>{ T.pages.clientInfo.protein }</th>
									<th>{ T.pages.clientInfo.fat }</th>
									<th>{ T.pages.clientInfo.carbs }</th>
								</tr>
							</thead>
							<tbody>
								{
									diets.map((diet) => (
										<>
											{ diet.meals.map((meal) => (
												<>
													<tr className="bg-gold text-white">
														<td
															className="font-semibold text-lg"
															colSpan={7}
														>
															{ meal.name }
														</td>
													</tr>
													{ meal.mealFoods.map((food, index) => (
														<tr key={`food-${index + Math.random()}`}>
															<td>{ meal.name }</td>
															<td>{ food.foodName }</td>
															<td>
																{ food.quantity } 
																{ ' ' }
																{ food.unit }
															</td>
															<td>{ food.calories }</td>
															<td>{ food.protein }</td>
															<td>{ food.fat }</td>
															<td>{ food.carbs }</td>
														</tr>
													)) }
												</>
											)) }
										</>
									)) 
								}
							</tbody>
						</table>
					</div>
				</InfoCard>
			</InfoCard>
		</DashboardLayout>
	);
}
