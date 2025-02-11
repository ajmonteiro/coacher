import { useState, useRef, useEffect } from 'react';

import { ArrowRightEndOnRectangleIcon, UserIcon } from '@heroicons/react/24/outline';
import { Bars3Icon } from '@heroicons/react/24/solid';
import { useNavigate } from '@resourge/react-router';

import { useAuthentication } from 'src/shared/auth/useAuthentication';
import Routes from 'src/shared/routes/Routes';
import { useTranslation } from 'src/shared/translations/Translations';

import Button from '../button/Button';

type HeaderProps = {
	isSidebarOpen: boolean
	setSidebarOpen: () => void
};

export default function Header({ setSidebarOpen, isSidebarOpen }: HeaderProps) {
	const { logout, user } = useAuthentication();
	const navigate = useNavigate();
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
		<div
			className="flex justify-between items-center gap-4 bg-base-100 py-10 sticky z-[9999] h-[3rem] transition-all duration-300"
		>
			<div
				className={`flex justify-between items-center text-base-content 
				transition-all duration-300`}
				style={{
					width: isSidebarOpen ? '250px' : '90px', 
					paddingLeft: isSidebarOpen ? '0px' : '1.25rem'
				}}
			> 
				{
					isSidebarOpen ? (
						<span className="text-md font-bold text-base-content lg:flex hidden">coacher.</span>
					) : null 
				}
				<Button
					className="w-12 h-12 btn-circle font-bold btn-primary-soft"
					size="sm"
					onClick={setSidebarOpen}
				>
					<Bars3Icon className="w-6 h-6" />
				</Button>
			</div>
			<div className="flex-1 flex items-center justify-end w-full gap-5">
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
								className="shadow-lg menu dropdown-content gap-3 bg-base-100 w-fit absolute top-full right-0"
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
				<details className="dropdown">
					<summary className="btn btn-sm m-1">
						<UserIcon className="w-4 h-4" />
					</summary>
					<div className="menu dropdown-content bg-base-100 shadow-lg rounded-box right-0 flex flex-col gap-2">
						<div className="flex items-center gap-3 p-3">
							<UserIcon className="w-4 h-4" />
							<span className="font-semibold text-md">{ user.username }</span>
						</div>
						<Button
							className="flex items-center"
							onClick={() => {
								logout();
								navigate(Routes.AUTH.LOGIN.get());
							}}
						>
							<ArrowRightEndOnRectangleIcon className="w-4 h-4" />
							<span>Logout</span>
						</Button>
					</div>
				</details>
			</div>
		</div>
	);
}
