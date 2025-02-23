import { useState, useRef, useEffect } from 'react';

import { ArrowRightEndOnRectangleIcon, UserIcon } from '@heroicons/react/24/outline';
import { Bars3Icon } from '@heroicons/react/24/solid';
import { Barbell } from '@phosphor-icons/react';
import { useNavigate } from '@resourge/react-router';

import { useAuthentication } from 'src/shared/auth/useAuthentication';
import Routes from 'src/shared/routes/Routes';
import { useTranslation } from 'src/shared/translations/Translations';

import Button from '../button/Button';
import LanguagePicker from '../languagePicker/LanguagePicker';
import PhosphorIcon from '../phosphorIcon/PhosphorIcon';
import ThemeController from '../themeController/ThemeController';

type HeaderProps = {
	isSidebarOpen: boolean
	setSidebarOpen: () => void
};

export default function Header({ setSidebarOpen, isSidebarOpen }: HeaderProps) {
	const { logout, user } = useAuthentication();
	const navigate = useNavigate();
	const { T } = useTranslation();
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

	return (
		<div
			className="flex justify-between items-center gap-4 bg-base-100 
			py-10 relative z-100 h-[3rem] transition-all duration-300"
		>
			<div
				className={`flex justify-between items-center text-base-content 
				transition-all duration-300 ${isSidebarOpen ? 'lg:w-[250px] w-[45px]' : 'md:w-[90px] w-[45px]'}`}
			> 
				{
					isSidebarOpen ? (
						<div className="items-center gap-2 lg:flex hidden">
							<PhosphorIcon
								icon={<Barbell />}
								size={42}
							/>
							<span className="text-md font-black text-base-content">COACHER.</span>
						</div>
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
			<div
				className="
			flex-1 flex items-center justify-between gap-5"
			>
				<div className="text-md lg:flex hidden gap-1 grow justify-start w-full">
					<span>
						{ T.components.header.welcome }
						,
					</span>
					<span className="font-bold">
						{ user.username }
					</span>
				</div>
				<div className="flex gap-2 items-center flex-1 justify-end">
					<ThemeController />
					<LanguagePicker
						isDropdownOpen={isDropdownOpen} 
						setIsDropdownOpen={setIsDropdownOpen} 
					/>
					<div className="dropdown">
						<Button className="btn-primary-soft btn-circle text-white">
							<UserIcon className="w-4 h-4" />
						</Button>
						<div className="menu dropdown-content bg-base-100 shadow-md rounded-box right-0 flex flex-col gap-2">
							<div className="flex items-center gap-3 p-3">
								<UserIcon className="w-4 h-4" />
								<span className="font-semibold text-md">{ user.username }</span>
							</div>
							<Button
								className="flex items-center w-full"
								onClick={() => {
									logout();
									navigate(Routes.AUTH.LOGIN.get());
								}}
							>
								<ArrowRightEndOnRectangleIcon className="w-4 h-4" />
								<span>Logout</span>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
