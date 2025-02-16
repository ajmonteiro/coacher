import { type ReactNode } from 'react';

type FormWrapperProps = {
	children: ReactNode
	className?: string
	cols?: number
};

export default function FormWrapper({
	children, cols = 2, className 
}: FormWrapperProps) {
	const gridColsClass = cols === 1 ? 'grid-cols-1' : `grid-cols-${cols}`;
	const baseClasses = 'grid xl:gap-6 gap-3';
	
	const dynamicClasses = className ? `${className} ${gridColsClass}` : gridColsClass;

	return (
		<div className={`${baseClasses} ${dynamicClasses}`}>
			{ children }
		</div>
	);
}
