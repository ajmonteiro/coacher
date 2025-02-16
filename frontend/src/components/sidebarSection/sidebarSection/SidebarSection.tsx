import { type ReactNode } from 'react';

type SidebarSectionProps = {
	children: ReactNode
	hasPermissions?: boolean
};

export default function SidebarSection({ children, hasPermissions = false }: SidebarSectionProps) {
	return (
		hasPermissions ? (
			<div className="flex flex-col gap-3 w-full">
				{ children }
				<hr className="border-t border-base-300 my-4" />
			</div>
		) : null
	);
}
