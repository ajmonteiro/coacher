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
		return themes[0]; // Default to the first theme
	});

	useEffect(() => {
		localStorage.setItem('theme', JSON.stringify(theme));
		// Apply the theme here.  This will depend on how you're doing theming.
		// Example using data attributes:
		document.documentElement.setAttribute('data-theme', theme.value);

		// Or using CSS variables:
		// document.documentElement.style.setProperty('--primary-color', theme.value);
	}, [theme]);

	const handleThemeChange = (selectedTheme: SelectItem) => {
		setTheme(selectedTheme);
	};

	return (
		<div className="dropdown">
			<div
				className="btn btn-sm btn-ghost"
				role="button"
				tabIndex={0}
			>
				{ theme.label }
				<svg
					className="inline-block h-2 w-2 fill-current opacity-60"
					height="12px"
					viewBox="0 0 2048 2048"
					width="12px"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z" />
				</svg>
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
