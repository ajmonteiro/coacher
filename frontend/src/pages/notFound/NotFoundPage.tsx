import { NotFound } from 'src/assets/svg/Svg';
import Svg from 'src/components/svg/Svg';
import DashboardLayout from 'src/layouts/dashboardLayout/DashboardLayout';

export default function NotFoundPage() {
	return (
		<DashboardLayout>
			<div className="flex justify-center items-center h-full">
				<Svg
					element={NotFound}
					width="400px"
				/>
			</div>
		</DashboardLayout>
	);
}
