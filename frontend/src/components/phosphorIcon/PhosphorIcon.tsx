import React, { type ReactElement } from 'react';

type PhosphorIconProps = {
	icon: ReactElement 
	color?: string
	weight?: 'regular' | 'bold' | 'duotone' | 'fill' | 'thin' | 'light'
};

export default function PhosphorIcon({
	icon, weight = 'duotone', color = 'var(--gold)' 
}: PhosphorIconProps) {
	return (
		<>
			{ React.cloneElement(icon, {
				size: 24,
				weight,
				color 
			}) }
		</>
	);
}
