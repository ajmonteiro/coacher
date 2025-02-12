import { type ReactNode } from 'react';

type SidebarSectionProps = {
	children: ReactNode
};

export default function SidebarSection({ children }: SidebarSectionProps) {
	return (
		<div className="flex flex-col gap-3 w-full">
			{ children }
			<hr className="border-t border-base-300 my-4" />
		</div>
	);
}
