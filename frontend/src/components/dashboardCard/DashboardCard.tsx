import { type ReactNode } from 'react';

import A from '../A/A';

type DashboardCardProps = {
	icon: ReactNode
	mainValue: string
	secondaryValue: string
	className?: string
	link?: string
};

export default function DashboardCard({
	icon, mainValue, secondaryValue, className, link
}: DashboardCardProps) {
	const content = (
		<div
			className={`rounded-lg shadow-md ${!link ? className : className ?? ''} text-white flex 
		flex-col justify-between items-start text-left w-full h-full p-6`}
		>
			<div>
				{ icon }
			</div>
			<div className="mt-5">
				<span className="text-3xl font-semibold block">{ mainValue }</span>
				<span className="text-sm">{ secondaryValue }</span>
			</div>
		</div>
	);

	return link ? (
		<A
			className={`w-full h-full ${className} p-0 ring-0 border-0`}
			href={link}
			variant="primary"
		>  
			{ content }
		</A>
	) : (
		content
	);
}
