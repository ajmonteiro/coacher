import { type ReactNode } from 'react';

import A from 'src/components/A/A';

type SidebarSectionItemProps = {
	href: string
	icon: ReactNode
	text: string
	active?: boolean
	collapsed?: boolean
};

export default function SidebarSectionItem({
	text, icon, href, active, collapsed
}: SidebarSectionItemProps) {
	return (
		<A
			className={`w-full flex items-center justify-start px-4 btn btn-circle text-center
                ${active ? 'font-bold bg-primary-soft text-primary' : 'font-semibold text-black'}
				${!collapsed ? 'mx-auto pl-[0.75rem]' : ''}
				`}
			href={href}
			variant="simple"
		>
			<div
				className="flex items-center gap-3"
			>
				<span className="w-6 h-6">
					{ icon }
				</span>
				{
					collapsed 
						? text
						: null 
				}
			</div>
		</A>

	);
}
