import React, { type ReactNode } from 'react';

import clsx from 'clsx';

type ButtonProps<T extends React.ButtonHTMLAttributes<HTMLButtonElement>> = T & {
	children?: ReactNode
	className?: string
	icon?: ReactNode
	size?: 'sm' | 'md' | 'lg' | 'xs'
	variant?: 'primary' | 'secondary'
};

export default function Button<T extends React.ButtonHTMLAttributes<HTMLButtonElement>>(props: ButtonProps<T>) {
	const {
		className, children, variant = 'primary', icon, size = 'sm', ...otherProps
	} = props;

	const sizeClass = size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : size === 'md' ? 'btn-md' : 'btn-xs';
	const variantClass = variant === 'primary' ? 'btn-primary' : 'bg-base-100 border border-primary text-primary hover:bg-base-100 hover:border-primary';

	return (
		<button
			className={clsx('btn text-xs', sizeClass, variantClass, className)}
			{...otherProps}
		>
			{ icon ? <span>{ icon }</span> : null }
			{ children }
		</button>
	);
}

Button.displayName = 'Button';
