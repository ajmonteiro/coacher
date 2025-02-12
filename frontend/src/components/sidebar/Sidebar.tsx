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
			className="bg-base-100 z-10 mt-5 transition-all 
			duration-300 overflow-hidden lg:flex hidden w-full relative"
			style={{
				width: isSidebarOpen ? '250px' : '90px' 
			}}
		>
			<div className={`flex flex-col  gap-5 p-5 w-full ${!isSidebarOpen ? 'items-center' : 'pl-0'}`}> 
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
