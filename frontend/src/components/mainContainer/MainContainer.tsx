import { type ReactNode } from 'react';

type MainContainerProps = {
	children: ReactNode
};

export default function MainContainer({ children }: MainContainerProps) {
	return (
		<div className="grow mt-10">
			<div className="bg-base-100 text-base-content rounded-box h-full w-full p-4">
				{ children }
			</div>
		</div>
	);
}
