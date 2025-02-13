import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { useFetch } from '@resourge/react-fetch';
import { useSearchParams } from '@resourge/react-router';

import A from 'src/components/A/A';
import InfoCard from 'src/components/infoCard/InfoCard';
import DashboardLayout from 'src/layouts/dashboardLayout/DashboardLayout';
import { type WorkoutDto } from 'src/shared/models/WorkoutDto';
import Routes from 'src/shared/routes/Routes';
import { useTranslation } from 'src/shared/translations/Translations';

import UserProfilePageApi from './UserProfilePageApi';
import { UserProfileDto } from './interface/UserProfileDto';

export default function UserProfilePage() {
	const { userId } = useSearchParams();
	const { T } = useTranslation();

	const { data: user } = useFetch(async () => {
		const result = await UserProfilePageApi.get(userId);
		return new UserProfileDto(result.data);
	}, {
		deps: [userId],
		initialState: null
	});

	return (
		<DashboardLayout>
			<div className="container mx-auto p-6">
				<div className="bg-base-100 rounded-lg shadow-md p-8 text-sm">
					{
						user ? (
							<>
								<div className="flex justify-between items-center mb-8">
									<h2 className="text-xl font-semibold">
										{ T.pages.userProfile.title }
										{ ' ' }
										-
										{ ' ' }
										<span className="font-light">
											{ user.fullName }
										</span>
									</h2>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
									<div className="border-gold border rounded-lg p-4">
										<p className="mb-2 flex items-center"> 
											<span className="text-xs font-bold mr-2"> 
												{ T.pages.userProfile.username }
												:
											</span>
											<span className="text-xs">{ user.username }</span>
										</p>
										<p className="flex items-center"> 
											<span className="text-xs font-bold mr-2"> 
												{ T.pages.userProfile.role }
												:
											</span>
											<span className="text-xs">{ user.role }</span>
										</p>
									</div>
									<div className="border-gold border rounded-lg p-4">
										<p className="mb-2 flex items-center"> 
											<span className="text-xs font-bold mr-2"> 
												{ T.pages.userProfile.weight }
												:
											</span>
											<span className="text-xs">
												{ user.weight }
												kg
											</span>
										</p>
										<p className="flex items-center"> 
											<span className="text-xs font-bold mr-2"> 
												{ T.pages.userProfile.height }
												:
											</span>
											<span className="text-xs">
												{ user.height }
												{ ' ' }
												cm
											</span>
										</p>
									</div>
								</div>
								<div className="flex flex-col gap-3">
									<InfoCard>
										<h3 className="text-xl font-semibold mb-6">
											{ T.pages.userProfile.workouts }
										</h3>
										{
											user.workouts && user.workouts.length > 0 ? (
												user.workouts.map((workout: WorkoutDto, index: number) => (
													<details
														key={index}
														className="collapse rounded-box border border-base-200 mb-6"
													>
														<summary className="collapse-title font-medium">
															<div className="flex flex-col gap-1">
																<span className="text-sm">{ workout.name }</span>
																<span className="text-xs font-thin text-gray-500">
																	{ workout.description }
																</span>
															</div>
														</summary>
														<div className="collapse-content p-6 rounded-b-lg">
															{
																workout.exercises.map((exercise, exindex) => (
																	<div
																		key={exindex}
																		className="mb-6 p-4 rounded-lg shadow"
																	>
																		<div className="flex gap-2">
																			<span className="font-bold">
																				{ T.pages.workouts.table.exercise }
																				:
																			</span>
																			<span>{ exercise.name }</span>
																		</div>
																		<div className="flex gap-2">
																			<span className="font-bold">
																				{ T.pages.workouts.table.sets }
																				:
																			</span>
																			<span>{ exercise.sets }</span>
																		</div>
																		<div className="flex gap-2">
																			<span className="font-bold">
																				{ T.pages.workouts.table.reps }
																				:
																			</span>
																			<span>{ exercise.reps }</span>
																		</div>
																	</div>
																)) 
															}
														</div>
													</details>
												))
											) : (
												<div className="text-center py-6">
													<p className="text-gray-500 mb-4">
														{ T.pages.userProfile.noWorkouts }
													</p>
												</div>
											) 
										}
										<A
											className="btn btn-outline"
											href={Routes.DASHBOARD.WORKOUTS.get({
												searchParams: {
													userId 
												}
											})}
											size="xs"
										>
											<PlusCircleIcon className="w-4 h-4 mr-2" />
											{ T.pages.userProfile.createWorkout }
										</A>
									</InfoCard>
									<InfoCard>
										<h3 className="text-xl font-semibold mb-6">
											{ T.pages.userProfile.diets }
										</h3>
										{
											user.diets && user.diets.length > 0 ? (
												user.diets.map((diet, index) => (
													<details
														key={index}
														className="collapse rounded-box border border-base-200 mb-6"
													>
														<summary className="collapse-title font-medium">
															<div className="flex flex-col gap-1">
																<span className="text-sm">{ diet.name }</span>
																<span className="text-xs font-thin text-gray-500">
																	{ diet.description }
																</span>
															</div>
														</summary>
														<div className="collapse-content p-6 rounded-b-lg">
															<div className="flex gap-2">
																<span className="font-bold">
																	{ T.pages.diet.table.userFullName }
																	:
																</span>
																<span>{ diet.user.fullName }</span>
															</div>
														</div>
													</details>
												))
											) : (
												<div className="text-center py-6">
													<p className="text-gray-500 mb-4">
														{ T.pages.userProfile.noDiets }
													</p>
												</div>
											) 
										}
										<A
											className="btn btn-outline"
											href={Routes.DASHBOARD.DIET.get({
												searchParams: {
													userId 
												}
											})}
											size="xs"
										>
											<PlusCircleIcon className="w-4 h-4 mr-2" />
											{ T.pages.userProfile.createDiet }
										</A>
									</InfoCard>
								</div>
							</>
						) : null 
					}
				</div>
			</div>
		</DashboardLayout>
	);
}
