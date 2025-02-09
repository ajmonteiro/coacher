import { type ReactNode } from 'react';

type StatWrapperProps = {
	children: ReactNode
};

export default function StatWrapper({ children }: StatWrapperProps) {
	return (
		<div className="stats stats-vertical col-span-12 w-full shadow-sm xl:stats-horizontal">
			{ children }
		</div>
	);
}
