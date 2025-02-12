import { type ReactNode } from 'react';

type DashboardCardProps = {
	color: string
	icon: ReactNode
	mainValue: string
	secondaryValue: string
	className?: string
};
export default function DashboardCard({
	color, mainValue, secondaryValue, icon, className 
}: DashboardCardProps) {
	return (
		<div className={`rounded-box shadow-md p-5 ${className ?? ''} ${color}`}>
			<div className="flex flex-col gap-5">
				<div className="w-5 h-5 text-base-100">
					{ icon }
				</div>
				<div className="flex flex-col gap-2">
					<span className="text-3xl font-semibold text-base-100">{ mainValue }</span>
					<span className="text-base-100">{ secondaryValue }</span>
				</div>
			</div>
		</div>
	);
}
