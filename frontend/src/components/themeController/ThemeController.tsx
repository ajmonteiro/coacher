/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { useEffect, useState } from 'react';

import { type SelectItem } from 'src/shared/models/SelectItem';

import Button from '../button/Button';

const themes: SelectItem[] = [
	{
		label: 'Coacher Blue',
		value: 'myluxuryblue'
	},
	{
		label: 'Coacher Fitness',
		value: 'myluxuryfitness'
	},
	{
		label: 'Coacher Red',
		value: 'myluxuryred'
	},
	{
		label: 'Coacher Green',
		value: 'myluxurygreen'
	},
	{
		label: 'Coacher Purple',
		value: 'myluxurypurple'
	}
];

export default function ThemeController() {
	const [theme, setTheme] = useState<SelectItem>(() => {
		const storedTheme = localStorage.getItem('theme');
		if (storedTheme) {
			return JSON.parse(storedTheme);
		}
		return themes[0];
	});

	useEffect(() => {
		localStorage.setItem('theme', JSON.stringify(theme));
		document.documentElement.setAttribute('data-theme', theme.value);
	}, [theme]);

	const handleThemeChange = (selectedTheme: SelectItem) => {
		setTheme(selectedTheme);
	};

	return (
		<div className="dropdown w-max text-xs">
			<div
				className="btn btn-sm text-sm btn-ghost flex"
				role="button"
				tabIndex={0}
			>
				<span className="text-xs">
					{ theme.label }
				</span>
				<ul
					className="dropdown-content top-10 right-0 bg-base-100 rounded-box z-[1] w-52 p-2 shadow-2xl"
					tabIndex={0}
				>
					{
						themes.map((t) => (
							<li key={t.value}> 
								<Button
									className={`theme-controller btn btn-sm btn-block btn-ghost justify-start ${theme.value === t.value ? 'active' : ''}`}
									onClick={() => handleThemeChange(t)}
								>
									{ t.label }
								</Button>
							</li>
						)) 
					}
				</ul>
			</div>
		</div>
	);
}
