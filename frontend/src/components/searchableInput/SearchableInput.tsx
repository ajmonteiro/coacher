import React, {
	useRef,
	useEffect,
	useState,
	useMemo
} from 'react';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import { useTranslation } from 'src/shared/translations/Translations';

type SelectProps = {
	options: Array<{ label: string
		value: string }>
	className?: string
	disabled?: boolean
	error?: boolean
	globalClassName?: string
	loadingOptions?: boolean
	onChange?: (value: { label: string
		value: string } | null) => void
	placeholder?: string
	value?: { label: string
		value: string } | null
};

export default function SearchableInput({
	options,
	onChange,
	value,
	error,
	className,
	placeholder,
	disabled = false,
	loadingOptions = false,
	globalClassName
}: SelectProps) {
	const [showOptions, setShowOptions] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const divRef = useRef<HTMLDivElement>(null);
	const mobileInputRef = useRef<HTMLInputElement>(null);
	const { T } = useTranslation();
	const [inputState, setInputState] = useState<string>('');	

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputState(event.target.value);
		
		setShowOptions(true);
	};
	
	const handleClick = (selectedOption: { label: string
		value: string }) => {
		setInputState(selectedOption.label);
		onChange?.(selectedOption);
		setShowOptions(false);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				inputRef.current
				&& !inputRef.current.contains(event.target as Node)
				&& divRef.current
				&& !divRef.current.contains(event.target as Node)
				&& mobileInputRef.current
				&& !mobileInputRef.current.contains(event.target as Node)
			) {
				setShowOptions(false);
			}
		};

		if (showOptions && mobileInputRef.current) {
			mobileInputRef.current.focus();
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [showOptions]);

	useEffect(() => {
		setInputState(value?.label ?? '');
	}, [value]);

	const filteredOptions = useMemo(() => {
		if (inputState === '') return options;
		return options?.filter((option) => inputState === ''
			|| option.label.toLowerCase().includes(inputState.toLowerCase())
		);
	}, [inputState, options, value]);

	return (
		<div className={`relative ${globalClassName ?? ''}`}>
			<label
				className="relative flex items-center"
				htmlFor="search"
			>
				<input
					ref={inputRef}
					className={`input input-bordered input-md w-full max-w-xs min-w-full ${
						error ? 'border-error' : ''
					} ${className}`}
					disabled={disabled}
					id="search"
					placeholder={`${
						filteredOptions?.length === 0
							? T.components.searchableInput.noOptions
							: placeholder ?? T.components.searchableInput.placeholder
					}`}
					type="text"
					value={inputState}
					onChange={(e) => {
						setInputState(e.target.value);
						handleInputChange(e);
					}}
					onFocus={() => setShowOptions(true)}
				/>
				{
					loadingOptions ? (
						<div className="w-4 h-4 border border-secondary border-t-transparent rounded-full animate-spin mx-auto absolute right-10" />
					) : null 
				}
				<MagnifyingGlassIcon className="w-4 h-4 absolute right-4" />
			</label>
			{
				showOptions ? (
					<div className="md:hidden flex fixed bg-black opacity-60 h-screen w-screen top-0 left-0" />
				) : null 
			}
			{
				showOptions ? (
					<div
						ref={divRef}
						className={`md:absolute fixed md:bottom-auto bottom-0
                            md:left-auto left-0 w-full
                            md:h-auto h-[80%] p-2
                            bg-base-100 flex flex-col 
                            space-y-1 md:rounded-md rounded-box shadow-lg z-20`}
					>
						<div className="relative md:hidden flex w-full items-center pt-6">
							<MagnifyingGlassIcon className="w-4 h-4 absolute left-4" />
							<input
								ref={mobileInputRef}
								className="input border-0 outline-none ring-0 focus:outline-none focus:ring-0 w-full pl-12 pr-24"
								placeholder={T.components.searchableInput.placeholder}
								type="text"
								value={inputState}
								onChange={(e) => {
									setInputState(e.target.value);
									handleInputChange(e);
								}}
							/>
							<button
								className="absolute right-4"
								onClick={() => setShowOptions(!showOptions)}
							>
								<span>{ T.components.searchableInput.cancel }</span>
							</button>
						</div>
						<hr className="md:hidden flex h-2" />
						<div className="overflow-y-scroll md:max-h-[200px] max-h-auto">
							{
								filteredOptions?.map((option) => (
									<div
										key={option.value}
										className={`w-full ${
											option.value === value?.value ? 'selected' : ''
										}`}
									>
										<button
											className={`md:text-sm text-base text-base-content text-left py-2 px-4 w-full 
                                            hover:bg-gray-200 rounded-md cursor-pointer`}
											onClick={() => handleClick(option)}
										>
											{ option.label }
										</button>
									</div>
								)) 
							}
						</div>
					</div>
				) : null 
			}
		</div>
	);
}
