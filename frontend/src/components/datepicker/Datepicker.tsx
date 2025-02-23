import { useState, useEffect, useRef } from 'react';

import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { CalendarBlank } from '@phosphor-icons/react';
import { DayPicker, type OnSelectHandler } from 'react-day-picker';

import 'react-day-picker/style.css';
import { useTranslation } from 'src/shared/translations/Translations';

import PhosphorIcon from '../phosphorIcon/PhosphorIcon';

interface DateRange {
	from: Date | undefined
	to?: Date | undefined
}

type DatePickerProps = {
	dropTitle?: string
	error?: boolean
	maxValue?: Date
	minValue?: Date
	mobileTitle?: string
	onChange?: (date: DateRange) => void
	placeholder?: string
	value?: DateRange
};

export default function DateRangePicker({
	value,
	onChange,
	mobileTitle,
	dropTitle
}: DatePickerProps) {
	const [from, setFrom] = useState<Date | undefined>(value?.from);
	const [to, setTo] = useState<Date | undefined>(value?.to);
	const [open, setOpen] = useState<boolean>(false);
	const { T } = useTranslation();
	const ref = useRef<HTMLDivElement>(null);

	if (!mobileTitle) {
		mobileTitle = T.components.datepicker.selectDay;
	}

	useEffect(() => {
		setFrom(value?.from);
		setTo(value?.to);
	}, [value]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setOpen(false);
			}
		};

		if (open) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [open]);

	const handleSelect: OnSelectHandler<DateRange | undefined> = (newValue: DateRange | undefined) => {
		if (newValue) {
			setFrom(newValue.from);
			setTo(newValue.to);

			onChange?.({
				from: newValue.from,
				to: newValue.to
			});
		}
	};

	const formatDate = (date: Date) => {
		return new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric' 
		}).format(date);
	};

	const formattedDateRange = from && to
		? `${formatDate(from)} - ${formatDate(to)}`
		: from
			? formatDate(from)
			: to
				? formatDate(to)
				: '';

	return (
		<div className="relative w-full">
			<button
				aria-controls="datepicker-dropdown"
				aria-expanded={open}
				aria-haspopup="true"
				className="flex items-center justify-between w-full p-3 text-sm font-medium bg-base-100 border border-base-300 rounded-lg shadow-sm hover:bg-base-200 focus:ring-2 focus:ring-primary focus:outline-none"
				type="button"
				onClick={() => setOpen(!open)}
			>
				<span className="flex items-center gap-2">
					<PhosphorIcon 
						icon={<CalendarBlank />}
					/>
					{ dropTitle ?? 'Select Date' }
				</span>
				{ formattedDateRange ? <span className="ml-2 text-sm text-gray-500">{ formattedDateRange }</span> : null }
				{ open ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" /> }
			</button>

			{
				open ? (
					<div
						ref={ref}
						className="absolute left-0 mt-2 w-full bg-base-100 border border-base-300 rounded-lg shadow-lg z-50"
						id="datepicker-dropdown"
					>
						<div className="p-4">
							{ mobileTitle ? <div className="text-lg font-semibold text-center mb-3">{ mobileTitle }</div> : null }
							<DayPicker
								className="mx-auto w-full"
								classNames={{
									months: 'w-full',
									range_start: 'bg-gold text-white rounded-l-full',
									range_middle: 'bg-gold text-white',
									range_end: 'bg-gold text-white rounded-r-full',
									button_next: 'text-gold',
									button_previous: 'text-gold',
									month_grid: 'w-full',
									day_button: 'mx-auto text-sm',
									today: `bg-gold text-white rounded-full`
								}}
								mode="range"
								selected={{
									from,
									to 
								}}
								onSelect={handleSelect}
							/>
						</div>
					</div>
				) : null 
			}
		</div>
	);
}
