/* eslint-disable @typescript-eslint/no-unused-vars */
import { type ReactNode } from 'react';

import { type SortCriteria } from '@resourge/react-fetch';

import { TranslationInstance, useTranslation } from 'src/shared/translations/Translations';

export type GlobalFilterState = {
	freeSearch?: string
	fromDate?: string
} & unknown;

export type GlobalFilterProps = {
	filter: GlobalFilterState
	onFilterChange: (filter: GlobalFilterState) => void
	onSortTable: (sort: SortCriteria) => void
	data?: any[]
	filters?: ReactNode
	sort?: SortCriteria
};
    
export default function Filters({
	filter, data, onFilterChange, onSortTable, sort, filters
}: GlobalFilterProps) {
	const { T } = useTranslation();

	return (
		<div className="flex md:flex-row flex-col items-center gap-5" />
	);
}
