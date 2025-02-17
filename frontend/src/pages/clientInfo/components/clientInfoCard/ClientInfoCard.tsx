import { type ReactNode } from 'react';

type ClientInfoCardProps = {
	icon: ReactNode
	title: string
	value: string
	className?: string
};

export default function ClientInfoCard({
	icon, title, value, className
}: ClientInfoCardProps) {
	return (
		<div
			className={`rounded-2xl shadow-sm border border-base-300 bg-base-100 p-5 flex flex-col gap-3 text-base-content ${className ?? ''}`}
		>
			<div className="flex items-center gap-3 font-medium">
				{ icon }
				<span>{ title }</span>
			</div>
			<div className="text-md font-thin">{ value }</div>
		</div>
	);
}
