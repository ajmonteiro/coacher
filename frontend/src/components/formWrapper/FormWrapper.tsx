import { type ReactNode } from 'react';

type FormWrapperProps = {
	children: ReactNode
	cols?: number
};

export default function FormWrapper({
	children, 
	cols = 2
}: FormWrapperProps) {
	const containerStyle: React.CSSProperties = {
		display: 'grid',
		gridTemplateColumns: `repeat(${cols}, 1fr)`,
		gap: '0.75rem',
		['--gap-xl' as string]: '1.5rem'
	};

	const rootStyle: React.CSSProperties = {
		gap: 'var(--gap-xl)'
	};

	return (
		<div
			style={{
				...containerStyle,
				...rootStyle
			}}
		>
			{ children }
		</div>
	);
}
