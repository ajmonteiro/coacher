import {
	CubeTransparentIcon,
	CakeIcon,
	HomeIcon,
	UsersIcon,
	BeakerIcon
} from '@heroicons/react/24/outline';

import Routes from 'src/shared/routes/Routes';
import { useTranslation } from 'src/shared/translations/Translations';

import SidebarSection from '../sidebarSection/sidebarSection/SidebarSection';
import SidebarSectionItem from '../sidebarSection/sidebarSectionItem/SidebarSectionItem';
import SidebarSectionTitle from '../sidebarSection/sidebarSectionTitle/SidebarSectionTitle';

type SidebarProps = {
	isSidebarOpen: boolean
};

export default function Sidebar({ isSidebarOpen }: SidebarProps) {
	const { T } = useTranslation();
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
				<SidebarSection>
					<SidebarSectionTitle
						collapsed={isSidebarOpen}
						title={T.components.sidebar.dashboard}
					/>
				
					<SidebarSectionItem
						active
						collapsed={isSidebarOpen}
						href={Routes.DASHBOARD.MAIN.get()}
						icon={<HomeIcon />}
						text={T.components.sidebar.dashboard}
					/>
				</SidebarSection>
				<SidebarSection>
					<SidebarSectionTitle
						collapsed={isSidebarOpen}
						title={T.components.sidebar.entities}
					/>
					<div className="flex flex-col gap-5">
						<SidebarSectionItem
							collapsed={isSidebarOpen}
							href={Routes.DASHBOARD.FOOD.get()}
							icon={<CakeIcon />}
							text={T.components.sidebar.food}
						/>
						<SidebarSectionItem
							collapsed={isSidebarOpen}
							href={Routes.DASHBOARD.EXERCISES.get()}
							icon={<BeakerIcon />}
							text={T.components.sidebar.exercises}
						/>
						<SidebarSectionItem
							collapsed={isSidebarOpen}
							href={Routes.DASHBOARD.WORKOUTS.get()}
							icon={<CubeTransparentIcon />}
							text={T.components.sidebar.workouts}
						/>
					</div>
				</SidebarSection>
				<SidebarSection>
					<SidebarSectionTitle
						collapsed={isSidebarOpen}
						title={T.components.sidebar.clients}
					/>
					<div className="flex flex-col gap-5">
						<SidebarSectionItem
							collapsed={isSidebarOpen}
							href={Routes.DASHBOARD.CLIENTS.get()}
							icon={<UsersIcon />}
							text={T.components.sidebar.clients}
						/>
					</div>
				</SidebarSection>
			</div>
		</div>
	);
}
