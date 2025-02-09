import {
	CakeIcon,
	HeartIcon,
	HomeIcon,
	UsersIcon
} from '@heroicons/react/24/solid';

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
			className="bg-white z-10 mt-5 transition-all duration-300 overflow-hidden lg:flex hidden"
			style={{
				width: isSidebarOpen ? '440px' : '95px' 
			}}
		>
			<div className={`flex flex-col gap-5 p-5 w-full ${!isSidebarOpen ? 'items-center' : ''}`}> 
				<SidebarSection>
					<SidebarSectionTitle
						collapsed={isSidebarOpen}
						title={T.components.sidebar.dashboard}
					/>
					<SidebarSectionItem
						active
						collapsed={isSidebarOpen}
						href="/dashboard"
						icon={<HomeIcon />}
						text="Home"
					/>
				</SidebarSection>
				<SidebarSection>
					<SidebarSectionTitle
						collapsed={isSidebarOpen}
						description={T.components.sidebar.pagesDescription}
						title={T.components.sidebar.pages}
					/>
					<div className="flex flex-col gap-3">
						<SidebarSectionItem
							collapsed={isSidebarOpen}
							href="/"
							icon={<CakeIcon />}
							text={T.components.sidebar.nutritionPlans}
						/>
						<SidebarSectionItem
							collapsed={isSidebarOpen}
							href="/"
							icon={<HeartIcon />}
							text={T.components.sidebar.fitnessPlans}
						/>
					</div>
				</SidebarSection>
				<SidebarSection>
					<SidebarSectionTitle
						collapsed={isSidebarOpen}
						title={T.components.sidebar.users}
					/>
					<div className="flex flex-col gap-3">
						<SidebarSectionItem
							collapsed={isSidebarOpen}
							href="/"
							icon={<UsersIcon />}
							text={T.components.sidebar.users}
						/>
					</div>
				</SidebarSection>
			</div>
		</div>
	);
}
