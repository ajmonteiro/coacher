import { useEffect, useRef } from 'react';

import { useTranslation } from 'src/shared/translations/Translations';

import Button from '../button/Button';

type LanguagePickerProps = {
	isDropdownOpen: boolean
	setIsDropdownOpen: (value: boolean) => void
};

export default function LanguagePicker({ isDropdownOpen, setIsDropdownOpen }: LanguagePickerProps) {
	const dropdownRef = useRef<HTMLDivElement>(null);

	const {
		language, languages, changeLanguage, T
	} = useTranslation();

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsDropdownOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	return (
		<div className="relative">
			<Button
				className="btn-primary-soft text-white"
				size="sm"
				onClick={toggleDropdown}
			>
				{ /* @ts-expect-error language is a string */ }
				{ T.components.languagePicker.languages[language] }
			</Button>
			{
				isDropdownOpen ? (
					<div
						ref={dropdownRef}
						className="shadow-md menu dropdown-content gap-3 bg-base-100 w-fit absolute top-full right-0"
					>
						{
							languages.map((lang) => (
								<Button
									key={lang}
									className="btn-primary-soft text-white w-full"
									onClick={() => {
										changeLanguage(lang);
										setIsDropdownOpen(false);
									}}
								>
									<span className="text-right">
										{ /* @ts-expect-error language is a string */ }
										{ T.components.languagePicker.languages[lang] }
									</span>
							
								</Button>
							)) 
						}
					</div>
				) : null 
			}
		</div>
	);
}
