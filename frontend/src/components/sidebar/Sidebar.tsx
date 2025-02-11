import {
	CakeIcon,
	HeartIcon,
	HomeIcon,
	UsersIcon
} from '@heroicons/react/24/solid';

import { useAuthentication } from 'src/shared/auth/useAuthentication';
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
	const { user } = useAuthentication();
	return (
		<div
			className="bg-base-100 z-10 mt-5 transition-all duration-300 overflow-hidden lg:flex hidden"
			style={{
				width: isSidebarOpen ? '250px' : '90px' 
			}}
		>
			<div className={`flex flex-col gap-5 p-5 w-full ${!isSidebarOpen ? 'items-center' : 'pl-0'}`}> 
				<SidebarSection>
					<SidebarSectionTitle
						collapsed={isSidebarOpen}
						title={T.components.sidebar.dashboard}
					/>
					<div className={`text-xs ${isSidebarOpen ? 'flex gap-1' : 'hidden'}`}>
						<span>
							Welcome,
						</span>
						<span className="font-bold">
							{ user.username }
						</span>
					</div>
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
						description={T.components.sidebar.pagesDescription}
						title={T.components.sidebar.pages}
					/>
					<div className="flex flex-col gap-3">
						<SidebarSectionItem
							collapsed={isSidebarOpen}
							href={Routes.DASHBOARD.FOOD.get()}
							icon={<CakeIcon />}
							text={T.components.sidebar.food}
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
							href={Routes.DASHBOARD.USERS.get()}
							icon={<UsersIcon />}
							text={T.components.sidebar.users}
						/>
					</div>
				</SidebarSection>
			</div>
		</div>
	);
}
