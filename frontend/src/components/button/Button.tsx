import React, { type ReactNode } from 'react';

import clsx from 'clsx';

type ButtonProps<T extends React.ButtonHTMLAttributes<HTMLButtonElement>> = T & {
	children?: ReactNode
	className?: string
	icon?: ReactNode
	size?: 'sm' | 'md' | 'lg'
	variant?: 'primary' | 'secondary'
};

export default function Button<T extends React.ButtonHTMLAttributes<HTMLButtonElement>>(props: ButtonProps<T>) {
	const {
		className, children, variant = 'primary', icon, ...otherProps
	} = props;

	const sizeClass = props.size === 'sm' ? 'btn-sm' : props.size === 'lg' ? 'btn-lg' : 'btn-md';
	const variantClass = variant === 'primary' ? 'btn-primary' : 'bg-white border border-primary text-primary hover:bg-base-100 hover:border-primary';

	return (
		<button
			className={clsx('btn', sizeClass, variantClass, className)}
			{...otherProps}
		>
			{ icon ? <span className="w-4 h-4">{ icon }</span> : null }
			{ children }
		</button>
	);
}

Button.displayName = 'Button';
