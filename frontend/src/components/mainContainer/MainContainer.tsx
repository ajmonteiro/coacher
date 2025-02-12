import { type ReactNode } from 'react';

type MainContainerProps = {
	children: ReactNode
};

export default function MainContainer({ children }: MainContainerProps) {
	return (
		<div className="grow py-10">
			<div className="bg-primary-soft text-base-content rounded-box h-full w-full p-4">
				{ children }
			</div>
		</div>
	);
}
