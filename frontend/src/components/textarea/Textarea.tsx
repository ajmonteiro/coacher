type TextareaProps<T extends React.TextareaHTMLAttributes<HTMLTextAreaElement>> = T & {
	error?: boolean
	loading?: boolean
};

export default function Textarea<T extends React.TextareaHTMLAttributes<HTMLTextAreaElement>>(props: TextareaProps<T>) {
	const {
		error, loading, ...rest 
	} = props;
	return (
		<div>
			<textarea
				className={`textarea textarea-bordered textarea-sm w-full max-w-xs min-w-full 
					${error ? 'border-error' : ''}
					${loading ? 'skeleton' : ''}
					`}
				{...rest}
			/>
		</div>
	);
}
