import { useState, useRef, useEffect } from 'react';

import { Bars3Icon } from '@heroicons/react/24/solid';

import { useTranslation } from 'src/shared/translations/Translations';

import Button from '../button/Button';
import FormControl from '../formControl/FormControl';
import Input from '../input/Input';

import { useFreeSearchModel } from './interfaces/FreeSearchModel';

type HeaderProps = {
	isSidebarOpen: boolean
	setSidebarOpen: () => void
};

export default function Header({ setSidebarOpen, isSidebarOpen }: HeaderProps) {
	const { field } = useFreeSearchModel();
	const {
		language, languages, changeLanguage 
	} = useTranslation();
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

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
		<header
			className="flex justify-between items-center gap-4 w-full bg-white py-10 fixed container z-[9999] h-[3rem] transition-all duration-300"
		>
			<div className={`flex justify-between items-center text-base-content ${isSidebarOpen ? 'lg:basis-[330px] basis-1' : 'basis-[95px] w-[95px] justify-center pl-5'} transition-all duration-300`}> 
				{ ' ' }
				{ /* Transition added here */ }
				{
					isSidebarOpen ? (
						<span className="text-md font-bold text-base-content lg:flex hidden">COACHER APP</span>
					) : null 
				}
				<Button
					className="w-12 h-12 btn-circle font-bold btn-primary-soft" // Removed conditional class
					size="sm"
					onClick={setSidebarOpen}
				>
					<Bars3Icon className="w-6 h-6" />
				</Button>
			</div>
			<div className="flex-1 flex items-center justify-between w-full gap-5">
				<FormControl
					className="w-full"
					hasRequiredLabel={false}
				>
					<Input {...field('search')} />
				</FormControl>
				<div className="relative">
					<Button
						className="btn-primary-soft btn-circle text-white"
						size="md"
						onClick={toggleDropdown}
					>
						{ language.toUpperCase() }
					</Button>
					{
						isDropdownOpen ? (
							<div
								ref={dropdownRef}
								className="shadow-lg menu dropdown-content gap-3 bg-white w-fit absolute top-full right-0"
							>
								{
									languages.map((lang) => (
										<Button
											key={lang}
											className="btn-primary-soft btn-circle text-white"
											size="md"
											onClick={() => {
												changeLanguage(lang);
												setIsDropdownOpen(false);
											}}
										>
											{ lang.toUpperCase() }
										</Button>
									)) 
								}
							</div>
						) : null 
					}
				</div>

				<Button
					className="font-bold btn-primary-soft btn-circle text-white lg:flex hidden"
					size="md"
				>
					U
				</Button>
			</div>
		</header>
	);
}
