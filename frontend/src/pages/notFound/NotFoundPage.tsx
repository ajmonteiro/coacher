import DashboardLayout from 'src/layouts/dashboardLayout/DashboardLayout';

export default function NotFoundPage() {
	return (
		<DashboardLayout>
			<div className="flex justify-center items-center h-full">
				<span className="text-7xl font-bold text-primary animate-bounce"> 
					404
				</span>
			</div>
		</DashboardLayout>
	);
}
