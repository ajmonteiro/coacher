/* eslint-disable eqeqeq */
import { type SelectItem } from 'src/shared/models/SelectItem';
import { useTranslation } from 'src/shared/translations/Translations';

type SelectProps = {
	options: SelectItem[]
	className?: string
	disabled?: boolean
	error?: boolean
	onChange?: (value: SelectItem) => void
	value?: SelectItem
};

export default function Select({
	onChange, options, value, className, disabled = false, error
}: SelectProps) {
	const { T } = useTranslation();
	
	return (
		<select
			className={`select select-bordered select-md w-full ${className} ${error ? 'border-error' : ''}`}
			disabled={disabled || options.length === 0}
			value={value?.value}
			onChange={(e) => {
				if (onChange) {
					const selectedOption = options.find((option) => option.value == e.target.value);
					onChange(selectedOption ?? options[0]);
				}
			}}
		>
			{
				options.length === 0 ? (
					<option
						value=""
					>
						{ T.components.select.noOptions }
					</option>
				)
					: null 
			}
			{
				options.map((option, key: number) => (
					<option
						key={key}
						value={option.value}
					>
						{ option.label }
					</option>
				))
			}
		</select>
	);
}
