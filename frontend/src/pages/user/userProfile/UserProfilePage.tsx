import { PlusCircle } from '@phosphor-icons/react';
import { useFetch } from '@resourge/react-fetch';
import { useSearchParams } from '@resourge/react-router';

import A from 'src/components/A/A';
import PhosphorIcon from 'src/components/phosphorIcon/PhosphorIcon';
import DashboardLayout from 'src/layouts/dashboardLayout/DashboardLayout';
import DietTable from 'src/shared/components/dietTable/DietTable';
import WorkoutsTable from 'src/shared/components/workoutsTable/WorkoutsTable';
import Routes from 'src/shared/routes/Routes';
import { useTranslation } from 'src/shared/translations/Translations';

import { UserProfileDto } from '../interfaces/UserProfileDto';

import UserProfilePageApi from './UserProfilePageApi';

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

	console.log(user);

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
									<WorkoutsTable workouts={user.workouts} />
									<A
										className="btn btn-ghost border border-primary w-fit ml-auto"
										href={Routes.DASHBOARD.WORKOUTS_PLANS.get({
											searchParams: {
												userId 
											}
										})}
										size="xs"
									>
										<PhosphorIcon 
											icon={<PlusCircle />}
											size={16}
										/>
										{ T.pages.userProfile.createWorkout }
									</A>
									<DietTable diets={user.diets} />
									<A
										className="btn btn-ghost border border-primary w-fit ml-auto"
										href={Routes.DASHBOARD.DIET.get({
											searchParams: {
												userId 
											}
										})}
										size="xs"
									>
										<PhosphorIcon 
											icon={<PlusCircle />}
											size={16}
										/>
										{ T.pages.userProfile.createDiet }
									</A>
								</div>
							</>
						) : null 
					}
				</div>
			</div>
		</DashboardLayout>
	);
}
