import { type ReactNode } from 'react';

type GlobalLayoutProps = {
	children: ReactNode
};

export default function GlobalLayout({ children }: GlobalLayoutProps) {
	return (
		<div className="bg-base-100 lg:px-0 px-3 mx-auto">
			{ children }
		</div>
	);
}
