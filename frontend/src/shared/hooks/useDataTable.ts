import { OrderByEnum, useFetch, usePagination } from '@resourge/react-fetch';

import { type GlobalFilterState } from 'src/components/dataTable/components/filters/Filters';

interface HasAllMethod {
	all: (pagination: { page: number
		perPage: number }) => Promise<any>
	delete: (id: string) => Promise<any>
}

type DataTableProps<T extends HasAllMethod> = {
	entityClass: T
	orderColumn: string
	isEnabled?: boolean
	orderBy?: OrderByEnum
};
export const useDataTable = <T extends HasAllMethod>({
	entityClass, orderColumn, orderBy, isEnabled = true
}: DataTableProps<T>) => {
	const { fetch: deleteEntities } = useFetch(async (items: string[]) => {
		if (items) {
			await Promise.all(items.map((id) => entityClass.delete(id)));
		}
		fetchResults();
	});
	
	const {
		data: rows, 
		pagination: paginationData, 
		filter, 
		sortTable, 
		sort,
		setFilter,
		changePage,
		fetch: fetchResults
	} = usePagination<any, GlobalFilterState>(async ({ pagination }) => {
		const result = await entityClass.all(pagination);

		return {
			data: result.data,
			totalItems: result.data.totalItems
		};
	}, {
		enable: isEnabled,
		deps: [],
		initialPage: 1,
		initialPerPage: 5,
		sort: [
			{
				orderColumn,
				orderBy: orderBy ?? OrderByEnum.ASC
			}
		],
		initialState: []
	});

	return {
		rows,
		paginationData,
		filter,
		sortTable,
		deleteEntities,
		sort,
		setFilter,
		changePage,
		fetchResults
	};
};
