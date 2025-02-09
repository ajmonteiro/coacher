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
		<div className={`rounded-box p-5 ${className ?? ''} ${color}`}>
			<div className="flex flex-col gap-5">
				<div className="w-5 h-5 text-white">
					{ icon }
				</div>
				<div className="flex flex-col gap-2">
					<span className="text-3xl font-semibold text-white">{ mainValue }</span>
					<span className="text-white">{ secondaryValue }</span>
				</div>
			</div>
		</div>
	);
}
