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
import DietTable from 'src/shared/components/dietTable/DietTable';
import WorkoutsTable from 'src/shared/components/workoutsTable/WorkoutsTable';
import { DietDto } from 'src/shared/models/DietDto';
import { WorkoutDto } from 'src/shared/models/WorkoutDto';
import { useTranslation } from 'src/shared/translations/Translations';

import ClientInfoCard from './components/clientInfoCard/ClientInfoCard';

export default function ClientInfoPage() {
	const { user } = useAuthentication();
	const { T } = useTranslation();

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
				{
					user.workouts ? (
						<WorkoutsTable workouts={user.workouts} />
					) : null 
				}
				{
					user.diets ? (
						<DietTable diets={user.diets.map((diet) => new DietDto(diet))} />
					) : null 
				}
			</InfoCard>
		</DashboardLayout>
	);
}
