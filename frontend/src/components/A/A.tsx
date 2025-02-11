import React, { type ReactNode } from 'react';

/**
 * A component
 * 
 * @template T
 * @param {AProps} props
 * @param [variant] {string} - Anchor variant (primary, secondary, simple) - Simple refers to no styling A
 * @returns {React.ReactElement}
 */
type AProps<T extends React.AnchorHTMLAttributes<HTMLAnchorElement>> = T & {
	children?: ReactNode
	className?: string
	icon?: ReactNode
	size?: 'sm' | 'md' | 'lg' | 'xs'
	variant?: 'primary' | 'secondary' | 'simple' | 'navlink'
};

export default function A<T extends React.AnchorHTMLAttributes<HTMLAnchorElement>>(props: AProps<T>) {
	const {
		className, variant = 'primary', children, icon, ...otherProps
	} = props;
	let size = 'md';
	switch (props.size) {
		case 'sm':
			size = ' btn-sm';
			break;
		case 'lg':
			size = ' btn-lg';
			break;
		case 'xs':
			size = ' btn-xs';
			break;
		default:
			size = ' btn-sm';
			break;
	}

	const classNames = [size];

	if (variant === 'primary') {
		classNames.push('btn btn-primary');
	}
	else if (variant === 'secondary') {
		classNames.push('btn btn-secondary');
	}
	else if (variant === 'navlink') {
		classNames.push('btn btn-xs btn-ghost');
	}
	if (className) {
		classNames.push(className);
	}
	
	return (
		<a
			className={classNames.join(' ')}
			{...otherProps}
		>
			{ icon ? <span className="w-4 h-4">{ icon }</span> : null }
			{ children }
		</a>
	);
}

A.displayName = 'A';
