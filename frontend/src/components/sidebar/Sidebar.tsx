import {
	Avocado,
	Barbell,
	Bicycle,
	Cookie,
	HouseLine,
	User,
	Users
} from '@phosphor-icons/react';

import { useAuthentication } from 'src/shared/auth/useAuthentication';
import Routes from 'src/shared/routes/Routes';
import { useTranslation } from 'src/shared/translations/Translations';

import PhosphorIcon from '../phosphorIcon/PhosphorIcon';
import SidebarSection from '../sidebarSection/sidebarSection/SidebarSection';
import SidebarSectionItem from '../sidebarSection/sidebarSectionItem/SidebarSectionItem';
import SidebarSectionTitle from '../sidebarSection/sidebarSectionTitle/SidebarSectionTitle';

type SidebarProps = {
	isSidebarOpen: boolean
};

export default function Sidebar({ isSidebarOpen = false }: SidebarProps) {
	const { T } = useTranslation();
	const { user } = useAuthentication();

	return (
		<div
			className={`sidebar bg-base-100 lg:z-10 lg:mt-5 transition-all
			duration-500 ease-in-out overflow-hidden 
			lg:relative 
			${isSidebarOpen ? 'lg:w-[250px] w-screen' : 'lg:w-[45px] w-0 sm:w-0'} 
			${isSidebarOpen ? 'lg:h-auto h-[calc(100vh-5.5rem)]' : 'h-[calc(100vh-5.5rem)]'}
			fixed bottom-0 left-0 z-[9998] lg:px-0 px-3
			${isSidebarOpen ? 'opacity-100 visible' : 'lg:opacity-100 lg:visible opacity-0 invisible'} 
			`}
		>
			<div
				className={`flex flex-col items-center gap-5 
				w-full
				md:container sm:container-0 mx-auto
				${isSidebarOpen ? 'items-center' : ''}
				`}
			> 
				<SidebarSection hasPermissions={user.permissions?.includes('ReadDashboard')}>
					<SidebarSectionTitle
						collapsed={isSidebarOpen}
						title={T.components.sidebar.dashboard}
					/>
					
					<SidebarSectionItem
						active
						collapsed={isSidebarOpen}
						href={Routes.DASHBOARD.MAIN.get()}
						icon={(
							<PhosphorIcon
								icon={<HouseLine />}
							/>
						)}
						text={T.components.sidebar.dashboard}
					/>
				</SidebarSection>
				<SidebarSection hasPermissions={user.hasPermission('ReadDiet')}>
					<SidebarSectionTitle
						collapsed={isSidebarOpen}
						title={T.components.sidebar.diet_related}
					/>
					<div className="flex flex-col gap-5">
						<SidebarSectionItem
							collapsed={isSidebarOpen}
							href={Routes.DASHBOARD.FOOD.get()}
							icon={(
								<PhosphorIcon
									icon={<Cookie />}
								/>
							)}
							text={T.components.sidebar.food}
						/>
						<SidebarSectionItem
							collapsed={isSidebarOpen}
							href={Routes.DASHBOARD.DIET.get()}
							icon={(
								<PhosphorIcon
									icon={<Avocado />}
								/>
							)}
							text={T.components.sidebar.diets}
						/>
						{ /* <SidebarSectionItem
							collapsed={isSidebarOpen}
							href={Routes.DASHBOARD.MEAL.get()}
							icon={(
								<PhosphorIcon
									icon={<BowlFood />}
								/>
							)}
							text={T.components.sidebar.meals}
						/> */ }
					</div>
				</SidebarSection>
				<SidebarSection hasPermissions={user.hasPermission('ReadWorkout')}>
					<SidebarSectionTitle
						collapsed={isSidebarOpen}
						title={T.components.sidebar.fitness_related}
					/>
					<div className="flex flex-col gap-5">
						<SidebarSectionItem
							collapsed={isSidebarOpen}
							href={Routes.DASHBOARD.WORKOUTS_PLANS.get()}
							icon={(
								<PhosphorIcon
									icon={<Barbell />}
								/>
							)}
							text={T.components.sidebar.workoutsPlans}
						/>
						<SidebarSectionItem
							collapsed={isSidebarOpen}
							href={Routes.DASHBOARD.EXERCISES.get()}
							icon={(
								<PhosphorIcon
									icon={<Bicycle />}
								/>
							)}
							text={T.components.sidebar.exercises}
						/>
					</div>
				</SidebarSection>
				<SidebarSection hasPermissions={user.hasPermission('ReadUser')}>
					<SidebarSectionTitle
						collapsed={isSidebarOpen}
						title={T.components.sidebar.clients}
					/>
					<div className="flex flex-col gap-5">
						<SidebarSectionItem
							collapsed={isSidebarOpen}
							href={Routes.DASHBOARD.CLIENTS.get()}
							icon={(
								<PhosphorIcon
									icon={<Users />}
								/>
							)}
							text={T.components.sidebar.clients}
						/>
					</div>
				</SidebarSection>
				<SidebarSection hasPermissions={user.hasPermission('ReadClientInfo') && user.role.name === 'User'}>
					<SidebarSectionTitle
						collapsed={isSidebarOpen}
						title={T.components.sidebar.aboutMe}
					/>
					<div className="flex flex-col gap-5">
						<SidebarSectionItem
							collapsed={isSidebarOpen}
							href={Routes.DASHBOARD.CLIENT_WORKOUTS.get()}
							icon={(
								<PhosphorIcon
									icon={<Barbell />}
								/>
							)}
							text={T.components.sidebar.myWorkouts}
						/>
						<SidebarSectionItem
							collapsed={isSidebarOpen}
							href={Routes.DASHBOARD.CLIENT_DIET.get()}
							icon={(
								<PhosphorIcon
									icon={<Avocado />}
								/>
							)}
							text={T.components.sidebar.myDiets}
						/>
						<SidebarSectionItem
							collapsed={isSidebarOpen}
							href={Routes.DASHBOARD.CLIENT_INFO.get()}
							icon={(
								<PhosphorIcon
									icon={<User />}
								/>
							)}
							text={T.components.sidebar.aboutMe}
						/>
					</div>
				</SidebarSection>
			</div>
		</div>
	);
}
