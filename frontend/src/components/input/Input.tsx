type InputProps<T extends React.InputHTMLAttributes<HTMLInputElement>> = T & {
	error?: boolean
	icon?: React.ReactNode
	loading?: boolean
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
	value?: string
};
export default function Input<T extends React.InputHTMLAttributes<HTMLInputElement>>(props: InputProps<T>) {
	const {
		className, error, onChange, value, icon, loading, ...rest 
	} = props;

	return (
		<div className="relative flex items-center">
			<input
				className={`input input-bordered input-md text-md text-gray-500 w-full max-w-xs min-w-full ${error ? 'border-error' : ''} 
					${icon ? 'pr-10' : 'pr-0'}
					${loading ? 'skeleton' : ''}
					` + className}
				value={value ?? ''}
				onChange={onChange}
				{...rest}
			/>
			{ icon ? <span className="absolute right-3 w-5 h-5">{ icon }</span> : null }
		</div>
	);
}

Input.displayName = 'Input';
