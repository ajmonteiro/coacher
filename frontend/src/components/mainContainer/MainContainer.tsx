import { type ReactNode } from 'react';

import InfoCard from '../infoCard/InfoCard';

type MainContainerProps = {
	children: ReactNode
};

export default function MainContainer({ children }: MainContainerProps) {
	return (
		<div className="w-full py-10">
			<InfoCard className="shadow-2xl h-full w-full border border-gold">
				{ children }
			</InfoCard>
		</div>
	);
}
