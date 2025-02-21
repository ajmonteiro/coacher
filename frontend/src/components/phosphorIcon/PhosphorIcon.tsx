import React, { type ReactElement } from 'react';

type PhosphorIconProps = {
	icon: ReactElement 
	className?: string
	color?: string
	size?: number
	weight?: 'regular' | 'bold' | 'duotone' | 'fill' | 'thin' | 'light'
};

export default function PhosphorIcon({
	icon, weight = 'duotone', color = 'var(--gold)', size = 24, className
}: PhosphorIconProps) {
	return (
		<>
			{ React.cloneElement(icon, {
				className,
				size,
				weight,
				color 
			}) }
		</>
	);
}
