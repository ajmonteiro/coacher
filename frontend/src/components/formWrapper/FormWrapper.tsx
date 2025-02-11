import { type ReactNode } from 'react';

type FormWrapperProps = {
	children: ReactNode
	className?: string
};
export default function FormWrapper({ children, className }: FormWrapperProps) {
	return (
		<div className={`${!className ? 'grid xl:grid-cols-2 grid-cols-1 xl:gap-6 gap-0' : className + ' grid-cols-1 xl:gap-6 gap-0'}`}>
			{ children }
		</div>
	);
}
