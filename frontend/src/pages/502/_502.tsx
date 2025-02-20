/* eslint-disable resourge-custom-react/folder-file-convention */
import { ArrowLeft } from '@phosphor-icons/react';

import { serverError } from 'src/assets/svg/Svg';
import A from 'src/components/A/A';
import InfoCard from 'src/components/infoCard/InfoCard';
import PhosphorIcon from 'src/components/phosphorIcon/PhosphorIcon';
import Svg from 'src/components/svg/Svg';
import ThemeController from 'src/components/themeController/ThemeController';
import Routes from 'src/shared/routes/Routes';

export default function _502() {
	return (
		<div className="flex justify-center items-center h-screen w-screen lg:p-0 p-5">
			<InfoCard className="h-max flex flex-col justify-center items-center gap-5 lg:min-w-[600px] w-fit">
				<div className="flex justify-between w-full ">
					<h1 className="text-2xl font-semibold text-base-content">Oops! 502</h1>
					<ThemeController />
				</div>
				<div className="animate-[subtle-bounce_1s_ease-in-out_infinite] lg:w—[350px] w-[300px]">
					<Svg
						element={serverError}
						width="100%"
					/>
				</div>
				<hr className="border-t border-gold w-full h-2" />
				<A
					className="btn-square lg:w-[300px] w-full"
					href={Routes.DASHBOARD.INITIAL.get()}
				>
					<PhosphorIcon
						color="white"
						icon={<ArrowLeft />}
					/>
				</A>
			</InfoCard>
		</div>
	);
}
