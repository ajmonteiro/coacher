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
			className={`w-full flex items-center justify-start px-4 btn text-center
				border-0
                ${active ? 'font-bold bg-primary-soft text-primary' : 'font-semibold text-black'}
				${!collapsed ? 'justify-center mx-auto' : ''}
				`}
			href={href}
			variant="simple"
		>
			<div
				className={`
					flex items-center ${collapsed ? 'gap-3' : 'gap-0'}`}
			>
				<span className="w-6 h-6 text-semibold text-base-content">
					{ icon }
				</span>
				<span className="text-xs font-semibold text-base-content text-left">
					{
						collapsed 
							? text
							: null 
					}
				</span>
			</div>
		</A>

	);
}
