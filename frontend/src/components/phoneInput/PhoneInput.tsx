import { type SelectItem } from 'src/shared/models/SelectItem';
import { PHONE_CODES } from 'src/shared/utils/FormConstantsUtils';

import Input from '../input/Input';
import SearchableInput from '../searchableInput/SearchableInput';

type PhoneInputProps = {
	error?: boolean
	onChange?: ({
		code,
		number
	}: any) => void
	placeholder?: string
	value?: {
		code: SelectItem
		number: string
	}
};

export default function PhoneInput({
	onChange, value, placeholder 
}: PhoneInputProps) {
	return (
		<div className="flex justify-between items-center gap-2">
			<SearchableInput
				className="input-ghost"
				globalClassName="join-item w-[90px]"
				options={PHONE_CODES}
				placeholder="Select code"
				value={value?.code}
				onChange={(code) => onChange?.({
					...value,
					code
				})}
			/>
			<div className="join-item flex-1 grow w-full">
				<Input
					placeholder={placeholder ?? 'Phone number'}
					type="text"
					value={value?.number}
					onChange={(e) => onChange?.({
						...value,
						number: e.target.value
					})}
				/>
			</div>
		</div>
	);
}
